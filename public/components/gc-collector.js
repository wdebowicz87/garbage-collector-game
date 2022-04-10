class GcCollector extends HTMLElement {

    connectedCallback() {
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .objects-collector {
                    /*border: 1px solid blue;*/
                    margin-top: 10px;
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
                    transform: rotate(360deg) scale(1);
                }
                .bin-disappear {
                    transition: transform 0.5s;
                    transform: rotate(0deg) scale(0);
                }
                .bin-top {
                      transform-origin: bottom left;
                      transform-style: preserve-3D;
                      animation: top-rotate 1s infinite alternate;
                }
                @keyframes top-rotate {
                    0% {transform: rotate(0deg); }
                    100% {transform: rotate(-100deg) }
                }
            </style>
            <div class="objects-collector">
                <div class="bin">
                    <img class="bin-top" src="../images/bin_top.svg"></img>
                    <img class="bin-bottom" src="../images/bin.svg"></img>          
                </div>
            </div>
        `;

        const startGC = () => {
            this.shadowRoot.querySelector('.bin').classList.add('bin-appear');
            this.shadowRoot.querySelector('.bin').classList.remove('bin-disappear');
            document.addEventListener('mousemove', updatePosition);
        }

        const stopGC = () => {
            this.shadowRoot.querySelector('.bin').classList.remove('bin-appear');
            this.shadowRoot.querySelector('.bin').classList.add('bin-disappear');
            document.removeEventListener('mousemove', updatePosition);
        }

        window.addEventListener("minor-gc:start", e => {
            startGC();
        })
        window.addEventListener("minor-gc:stop", e => {
            stopGC()
        })
        window.addEventListener("major-gc:start", e => {
            startGC();
        })
        window.addEventListener("major-gc:stop", e => {
            stopGC();
        })

        const updatePosition = (e) =>{
            const collector = this.shadowRoot.querySelector('.bin');
            collector.style.left = e.pageX - 50 + 'px';
            collector.style.top = e.pageY + 80 + 'px';
        }
    }
}

window.customElements.define("gc-collector", GcCollector);