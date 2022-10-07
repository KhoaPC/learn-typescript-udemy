const c = console.log;

function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMedhod = descriptor.value;
    const adjDescripttor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMedhod.bind(this);
            return boundFn;
        }
    }
    return adjDescripttor;
} // autoBind

class ProjecState {
    private listeners: any[] = [];
    private projects: any[] = [];
    static instance: ProjecState;
    
    private constructor() { }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjecState();
        return this.instance;
    }


    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople
        }
        this.projects.push(newProject);
    }
}

const projectState = ProjecState.getInstance();

interface Validatable {
    value: string | number;
    required?: boolean | undefined;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
} // Validatable

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
        validatableInput.minLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
        validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string'
    ) {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
        validatableInput.min != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
        validatableInput.max != null &&
        typeof validatableInput.value === 'number'
    ) {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}// validate

class ProjectList {
    templateElm: HTMLTemplateElement;
    hostElm: HTMLDivElement;
    element: HTMLElement;


    constructor(private type: 'active' | 'finished') {
        this.templateElm = document.getElementById('project-list')! as HTMLTemplateElement;
        this.hostElm = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElm.content, true);
        this.element = importedNode.firstElementChild as HTMLElement;
        this.element.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }

    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';

    }

    private attach() {
        this.hostElm.insertAdjacentElement('beforeend', this.element);

    }
} // ProjectList

// ProjectInput class
class ProjectInput {
    inputValid: boolean = true;
    templateElm: HTMLTemplateElement;
    hostElm: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElm: HTMLInputElement;
    descriptionInputElm: HTMLInputElement;
    peopleInputElm: HTMLInputElement;

    constructor() {
        this.templateElm = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElm = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElm.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElm = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElm = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElm = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
        this.attach();
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElm.value;
        const enteredDescription = this.descriptionInputElm.value;
        const enteredPeople = this.peopleInputElm.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 4
        }

        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 10
        }


        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(titleValidatable)
        ) {
        }
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input, please try again!');
            this.inputValid = false;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    } // gatherUserInput

    private clearValueInput() {
        this.titleInputElm.value = '';
        this.descriptionInputElm.value = '';
        this.peopleInputElm.value = '';
    } // clearValueInput

    @autoBind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            c(title, desc, people);
        }

        if (this.inputValid)
            this.clearValueInput();
        this.inputValid = true;
    } // submitHandler

    private configure() {
        this.element.onsubmit = this.submitHandler;
    } // configure

    private attach() {
        this.hostElm.insertAdjacentElement('afterbegin', this.element);
    } // attach
} // class ProjectInput

const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
