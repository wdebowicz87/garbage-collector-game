class NewGeneration extends HTMLElement {

    className = 'new-generation';
    objectsContainer = () => this.querySelector(`.${this.className}`);
    maxObjects = 6;

    amountOfObjects = () => this.objectsContainer().childElementCount;

    createObject = (id) => {
        if (this.amountOfObjects() >= this.maxObjects) {
            return;
        }
        const gcObject = document.createElement("gc-object")
        gcObject.setAttribute("data-id", id);
        this.objectsContainer().appendChild(gcObject);
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .new-generation {
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
            <b>Eden Space</b>
            <div class=${this.className}>
            </div>
        `;

        window.addEventListener("object:new", e => {
            this.createObject(e.detail.id)
        })
    }

}

window.customElements.define('new-generation', NewGeneration)