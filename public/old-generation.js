class OldGeneration extends HTMLElement {

    className = 'old-generation';
    objectsContainer = () => this.shadowRoot.querySelector(`.${this.className}`);
    maxObjects = 6;

    amountOfObjects = () => this.objectsContainer().childElementCount;

    createObject = () => {
        if (this.amountOfObjects() >= this.maxObjects) {
            return;
        }
        const gcObject = document.createElement("gc-object")
        this.objectsContainer().appendChild(gcObject);
    }

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .old-generation {
                    height: 60px;
                    padding: 2px;
                    width: 400px;
                    border: 5px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                }
            </style>
            <b>Old Generation</b>
            <div class=${this.className}>
            </div>
        `;

        window.addEventListener("object:promoteNewGen", e => {
            this.createObject(e.id)
        })
    }
}

window.customElements.define('old-generation', OldGeneration)