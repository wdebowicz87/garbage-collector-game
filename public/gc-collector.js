class GcCollector extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .objects-collector {
                    border: 1px solid blue;
                }
                img {
                    max-height: 100%;
                    width: auto;
                    position: absolute;
                }
                .bin-close {
                    opacity: 1;
                    animation: fadeClose 0.7s alternate infinite;
                }
                .bin-45 {
                    opacity: 0;
                    animation: fade45 0.7s alternate infinite;
                }
                .bin-open {
                    opacity: 0;
                    animation: fadeOpen 0.7s alternate infinite;
                }
                @keyframes fadeClose {
                    0% { opacity: 1}
                    33% { opacity: 1}
                    35% { opacity: 0}
                    100% { opacity: 0}
                }
                @keyframes fade45 {
                    0% { opacity: 0}
                    31% { opacity: 0}
                    33% { opacity: 1}
                    66% { opacity: 1}
                    70% { opacity: 0}
                    100% { opacity: 0}
                }
                @keyframes fadeOpen {
                    0% { opacity: 0}
                    64% { opacity: 0}
                    66% { opacity: 1}
                    100% { opacity: 1}
                }
                
                .bin {
                    height: 200px;
                    width: 100px;
                    position: relative;
                    left: -100px;
                    animation: move 20s 2s infinite;
                    animation-fill-mode: forwards;
                    rotate: -10deg;
                }
                @keyframes move {
                    0% {left: -100px; }
                    100% {left: 800px; }
                }
            </style>
            <div class="objects-collector">
                <div class="bin">
                    <img class="bin-close" src="images/bin_close.svg"></img>
                    <img class="bin-45" src="images/bin_45.svg"></img>          
                    <img class="bin-open" src="images/bin_open.svg"></img>          
                </div>
            </div>
        `;
    }
}

window.customElements.define("gc-collector", GcCollector);