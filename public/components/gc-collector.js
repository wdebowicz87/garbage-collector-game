class GcCollector extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .objects-collector {
                    border: 1px solid blue;
                    margin-top: 50px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
                .bin {
                    height: 200px;
                    width: 100px;
                    position: relative;
                    left: -150px;
                    animation: move 20s 1s infinite;
                    animation-fill-mode: forwards;
                    rotate: -10deg;
                }
                .bin-top {
                      transform-origin: bottom left;
                      transform-style: preserve-3D;
                      animation: rotate 1s infinite alternate;
                }
                @keyframes rotate {
                    0% {transform: rotate(0deg); }
                    100% {transform: rotate(-100deg) }
                }
                
                @keyframes move {
                    0% {left: -150px; }
                    100% {left: 800px; }
                }
            </style>
            <div class="objects-collector">
                <div class="bin">
                    <img class="bin-top" src="../images/bin_top.svg"></img>
                    <img class="bin-bottom" src="../images/bin.svg"></img>          
                </div>
            </div>
        `;
    }
}

window.customElements.define("gc-collector", GcCollector);