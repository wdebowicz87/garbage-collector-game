class TenuredSpace extends HTMLElement {

    className = 'tenured-space';
    objectsContainer = () => this.querySelector(`.${this.className}`);

    maxObjects = 13;
    amountOfObjects = () => this.objectsContainer().childElementCount;

    addObject(objectId) {
        if (this.amountOfObjects() >= this.maxObjects) {
            window.dispatchEvent(new CustomEvent('memory:error'))
        }
        if (this.amountOfObjects() >= this.maxObjects - 3) {
            window.dispatchEvent(new CustomEvent('major-gc:alert'));
        }
        this.objectsContainer().append(document.getElementById(objectId));
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .tenured-space {
                    height: 60px;
                    padding: 2px 4px;
                    width: 778px;
                    border: 3px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                    background-color: lightblue;
                }
            </style>
            <b>Tenured Space</b>
            <div class=${this.className}>
            </div>
        `;

        const addObject = (objectId) => {
            this.objectsContainer().append(document.getElementById(objectId));
        }

        window.addEventListener("tenured-space:add", (e) => this.addObject(e.detail.id));
    }
}

window.customElements.define('tenured-space', TenuredSpace)