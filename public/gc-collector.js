class GcCollector extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .objects-collector {
                    border: 1px solid blue;
                    height: 100px;
                }
                img {
                    max-height: 100%;
                    width: auto;
                    position: relative;
                    left: -100px;
                }
                .anim {
                    animation: move 20s 2s infinite;
                    animation-fill-mode: forwards;
                }
                @keyframes move {
                    0% {left: -100px; }
                    100% {left: 800px; }
                }
            </style>
            <div class="objects-collector">
                <img class="anim" src="images/collector.jpg"></img>
            </div>
        `;
    }
}

window.customElements.define("gc-collector", GcCollector);