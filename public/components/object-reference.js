class ObjectReference extends HTMLElement {

    numericId =() => this.dataset.id;
    getElement = () => this.querySelector(".object-reference");

    mark() {
        this.getElement().classList.add("object-reference-mark");
    }

    unmark() {
        this.getElement().classList.remove("object-reference-mark");
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .object-reference
                 {
                    height: 20px;
                    width: 88px;
                    /*border: 3px solid black;*/
                    /*background-color: yellow;*/
                    text-align: left;
                    border: 1px solid black;
                    background-color: lightyellow;
                }
                .object-reference-mark
                {
                    background-color: yellow;
                }
            </style>
            <div class="object-reference">
                *obj-${this.numericId()}(ref)
            </div>
        `;
    }
}

window.customElements.define('object-reference', ObjectReference);