import { DragTarget } from '../models/drag-drop.js';
import { Project, ProjectStatus } from '../models/project.js';
import { Component } from './base-component.js';
import { autoBind } from '../decorators/autobind.js';
import { projectState } from '../state/project-state.js';
import { ProjectItem } from './project-item.js';


export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    } // constructor
    @autoBind
    dragOverHandler(e: DragEvent) {
        if (e.dataTransfer && e.dataTransfer.types[0] === 'text/plain') {
            e.preventDefault();

            const listElm = this.element.querySelector('ul')!;
            listElm.classList.add('droppable');
        }
    }

    @autoBind
    dropHandler(e: DragEvent) {
        const prjId = e.dataTransfer!.getData('text/plain');

        projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @autoBind
    dragLeaveHandler(e: DragEvent) {
        const listElm = this.element.querySelector('ul')!;
        listElm.classList.remove('droppable');

    }

    configure() {
        this.element.ondragover = this.dragOverHandler;
        this.element.ondragleave = this.dragLeaveHandler;
        this.element.ondrop = this.dropHandler;

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