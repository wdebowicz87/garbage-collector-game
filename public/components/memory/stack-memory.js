class StackMemory extends HTMLElement {

    className = 'stack-memory';
    objectsContainer = () => this.querySelector(`.${this.className}`);

    createObject = (id) => {
        const objectReference = document.createElement("object-reference")
        objectReference.setAttribute("data-id", id);
        this.objectsContainer().appendChild(objectReference);
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .stack-memory {
                    height: 600px;
                    padding: 4px;
                    width: 90px;
                    border: 1px solid green;
                    display: grid;
                    grid-auto-flow: row;
                    align-items: flex-start;
                    grid-template-rows: repeat(30, 20px);
                    background-color: lightyellow;
                }
            </style>
            <b>Stack Memory</b>
            <div class="stack-memory">
               
            </div>
        `;

        window.addEventListener("object:new", e => {
            this.createObject(e.detail.id)
        })
    }
}

window.customElements.define('stack-memory', StackMemory);