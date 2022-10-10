import { Component } from './base-component';
import { Validatable, validate } from '../ultil/validation';
import { autoBind } from '../decorators/autobind';
import { projectState  } from '../state/project-state';

    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
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