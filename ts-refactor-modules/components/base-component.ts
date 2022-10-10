

    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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