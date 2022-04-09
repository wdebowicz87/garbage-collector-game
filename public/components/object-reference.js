class ObjectReference extends HTMLElement {

    id =() => this.dataset.id
    getElement = () => this.querySelector(".object-reference")

    connectedCallback() {
        this.innerHTML = `
            <style>
                .object-reference
                 {
                    height: 20px;
                    width: 100px;
                    /*border: 3px solid black;*/
                    /*background-color: yellow;*/
                    text-align: left;
                }
            </style>
            <div class="object-reference">
                *obj-${this.id()}(ref)
            </div>
        `;
    }
}

window.customElements.define('object-reference', ObjectReference);