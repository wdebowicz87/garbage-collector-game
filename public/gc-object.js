class GCObject extends HTMLElement {

    destroy = () => {
        this.shadowRoot.querySelector(".gs-object").classList.add("anim-destroy");
        setTimeout(
            () => this.remove(),
            500
        )

    }

    connectedCallback() {
        this.attachShadow({mode: "open"})
        this.shadowRoot.innerHTML = `
            <style>
                .gs-object {
                    height: 80px;
                    width: 80px;
                    border: 5px solid black;
                    background-color: yellow;
                    position: relative;
                    cursor: pointer;
                }
                .anim-create {
                    animation: move-from-top 2s;
                    animation-fill-mode: forwards;
                }
                @keyframes move-from-top {
                    0% { top: -300px; }
                    100% { top: 0px;}
                }
                .anim-destroy {
                    animation: move-down 0.5s;
                    animation-fill-mode: forwards;
                }
                @keyframes move-down {
                    0% { top: 0px; background-color: yellow }
                    /*10% { top: 20px; background-color: red }*/
                    100% { top: 110px; background-color: red}
                }
            </style>
            <div class="gs-object anim-create">
                ${Math.floor(Math.random() * 100)}
            </div>
        `;

        this.addEventListener('click', this.destroy);
    }
}

window.customElements.define('gc-object', GCObject);