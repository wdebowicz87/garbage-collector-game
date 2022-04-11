class EdenSpace extends HTMLElement {

    className = 'eden-space';
    objectsContainer = () => this.querySelector(`.${this.className}`);
    maxObjects = 6;

    amountOfObjects = () => this.objectsContainer().childElementCount;

    createObject = (id) => {
        if (this.amountOfObjects() >= this.maxObjects) {
            //window.alert("Exception in thread main java.lang.OutOfMemoryError: Java heap space");
        }
        if (this.amountOfObjects() >= this.maxObjects - 2) {
            window.dispatchEvent(new CustomEvent('minor-gc:alert'));
        }
        const gcObject = document.createElement("gc-object")
        gcObject.setAttribute("data-id", id);
        this.objectsContainer().appendChild(gcObject);
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .eden-space {
                    height: 60px;
                    padding: 2px;
                    width: 400px;
                    border: 3px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                    background-color: lightblue;
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

window.customElements.define('eden-space', EdenSpace)