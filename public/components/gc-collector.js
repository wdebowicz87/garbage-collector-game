class GcCollector extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .objects-collector {
                    /*border: 1px solid blue;*/
                    margin-top: 5px;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
                .bin {
                    height: 200px;
                    width: 100px;
                    position: absolute;
                }
                .bin-appear {
                    transition: transform 0.5s;
                    transform: scale(1) rotate(360deg) translateY(80px);
                }
                .bin-disappear {
                    transition: transform 0.5s;
                    transform: scale(.2) rotate(0deg)  translateY(-80px);
                }
                .bin-top {
                      transform-origin: bottom left;
                      transform-style: preserve-3D;
                      margin-bottom: -3px;
                }
                .bin-top-rotate {
                      animation: top-rotate 1s infinite alternate;
                }
                @keyframes top-rotate {
                    0% {transform: rotate(0deg); }
                    100% {transform: rotate(-100deg) }
                }
            </style>
            <div class="objects-collector">
                <div class="bin">
                    <img class="bin-top" src="images/bin_top.svg"></img>
                    <img class="bin-bottom" src="images/bin.svg"></img>          
                </div>
            </div>
        `;

        const trackMouse = (e) => updatePosition(e.x, e.y);

        const startGC = (position) => {
            this.shadowRoot.querySelector('.bin').classList.add('bin-appear');
            this.shadowRoot.querySelector('.bin-top').classList.add('bin-top-rotate');
            this.shadowRoot.querySelector('.bin').classList.remove('bin-disappear');

            updatePosition(position.x, position.y);

            document.addEventListener('mousemove', trackMouse);
        }

        const stopGC = (position) => {
            this.shadowRoot.querySelector('.bin').classList.remove('bin-appear');
            this.shadowRoot.querySelector('.bin-top').classList.remove('bin-top-rotate');
            this.shadowRoot.querySelector('.bin').classList.add('bin-disappear');
            document.removeEventListener('mousemove', trackMouse);
        }

        window.addEventListener("minor-gc:start", e => {
            startGC(e.detail);
        })
        window.addEventListener("minor-gc:stop", e => {
            stopGC(e.detail)
        })
        window.addEventListener("major-gc:start", e => {
            startGC(e.detail);
        })
        window.addEventListener("major-gc:stop", e => {
            stopGC(e.detail);
        })

        const updatePosition = (x, y) =>{
            const collector = this.shadowRoot.querySelector('.bin');
            collector.style.left = x - 50 + window.scrollX + 'px';
            collector.style.top = y + window.scrollY + 'px';
        }
    }
}

window.customElements.define("gc-collector", GcCollector);