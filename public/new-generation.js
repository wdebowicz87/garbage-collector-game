class NewGeneration extends HTMLElement {

    className = 'new-generation';
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
                .new-generation {
                    height: 100px;
                    padding: 2px;
                    width: 600px;
                    border: 5px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                }
            </style>
            <div class=${this.className}>
                <gc-object></gc-object>
                <gc-object></gc-object>
            </div>
        `;
        setInterval(this.createObject, 1000);
    }
}

window.customElements.define('new-generation', NewGeneration)