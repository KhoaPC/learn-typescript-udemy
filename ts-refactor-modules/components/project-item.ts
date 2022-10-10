import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import { Component } from './base-component.js';
import { autoBind } from '../decorators/autobind.js';

export class ProjectItem extends Component<HTMLUListElement, HTMLElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 Person';
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
    @autoBind
    dragStartHandler(e: DragEvent) {
        e.dataTransfer!.setData('text/plain', this.project.id);
        e.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(e: DragEvent) {
        console.log('End');
    }

    configure() {
        this.element.ondragstart = this.dragStartHandler
        this.element.ondragend = this.dragEndHandler
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}