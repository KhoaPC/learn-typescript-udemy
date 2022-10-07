const c = console.log;

enum ProjectStatus { Active, Finished }

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);

        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
} // ProjectState

const projectState = ProjectState.getInstance();

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

function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescripttor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescripttor;
} // autoBind

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElm: HTMLTemplateElement;
    hostElm: T;
    element: U;

    constructor(templateId: string, hostElmId: string, insertAtStart: boolean, newElmId?: string) {
        this.templateElm = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElm = document.getElementById(hostElmId)! as T;

        const importedNode = document.importNode(this.templateElm.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElmId)
            this.element.id = newElmId;

        this.attach(insertAtStart);
    }


    private attach(insertAtBeginning: boolean) {
        this.hostElm.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void
    abstract renderContent(): void


} // Component

class ProjectItem extends Component<HTMLUListElement, HTMLElement> {
    private project: Project;

    get persons() {
        if(this.project.people === 1) {
            return '1 Person'
        } else {
            return `${this.project.people} Persons`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    configure() { }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement>{

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    } // constructor

    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProject = projects.filter(item => {
                if (this.type === 'active') {
                    return item.status === ProjectStatus.Active;
                }
                return item.status === ProjectStatus.Finished;

            });

            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS';
    } // renderContent

    private renderProjects() {
        const listElm = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElm.innerHTML = '';

        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    } // renderProjects
} // ProjectList

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    inputValid: boolean = true;
    titleInputElm: HTMLInputElement;
    descriptionInputElm: HTMLInputElement;
    peopleInputElm: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElm = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElm = this.element.querySelector('#description')! as HTMLInputElement;
        this.peopleInputElm = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    } // constructor


    configure() {
        this.element.onsubmit = this.submitHandler;
    } // configure

    renderContent(): void {

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
            !validate(peopleValidatable)
        ) { }
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input, please try again!');
            this.inputValid = false;
            return;
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
        }

        if (this.inputValid)
            this.clearValueInput();
        this.inputValid = true;
    } // submitHandler
} // class ProjectInput

const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
