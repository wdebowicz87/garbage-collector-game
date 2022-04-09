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
                    height: 60px;
                    padding: 4px;
                    width: 900px;
                    border: 1px solid green;
                    display: grid;
                    grid-template-columns: 100px 100px 100px 100px 100px 100px 100px 100px 100px;
                    grid-template-rows: 20px 20px 20px;
                    grid-auto-flow: column;
                    background-color: lightgreen;
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