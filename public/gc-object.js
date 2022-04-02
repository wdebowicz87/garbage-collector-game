class GCObject extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .gs-object {
                    height: 80px;
                    width: 80px;
                    border: 5px solid black;
                    background-color: yellow;
                }
            </style>
            <div class="gs-object">
                X
            </div>
        `;
    }
}

window.customElements.define('gc-object', GCObject);