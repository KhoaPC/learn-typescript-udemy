const c = console.log;

// Auto bind decorator
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
}

// ProjectInput class
class ProjectInput {
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

    @autoBind
    private submitHandler(e: Event) {
        e.preventDefault();
        c(this.titleInputElm.value)
    }

    private configure() {
        this.element.onsubmit = this.submitHandler;
    }

    private attach() {
        this.hostElm.insertAdjacentElement('afterbegin', this.element);
    }
}


const projectInput = new ProjectInput();