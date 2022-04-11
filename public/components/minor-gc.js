class MinorGC extends HTMLElement {

    getElement = () => this.querySelector(".minor-gc")

    isRunning = false;

    connectedCallback() {
        const onClick = () => {
            this.isRunning = !this.isRunning;
            const event = this.isRunning ? "minor-gc:start" : "minor-gc:stop"
            window.dispatchEvent(new CustomEvent(event));
            render();
        }

        const disable = () => {
            this.getElement().disabled = true;
        }

        const enable = () => {
            this.getElement().disabled = false;
        }

        const alert = () => {
            this.getElement().classList.add("gc-alert")
            resetAnimation();
        }

        const resetAnimation = () => {
            const el = this.getElement();
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = null;
        }

        const render = () => {
            this.innerHTML = `
            <style>
                .minor-gc {
                    width: 72px;
                    height: 70px;
                }
                .gc-alert {
                    animation: 1s alert;
                }
                @keyframes alert {
                    0% { color: red }
                    100% { color: black }
                }
                
            </style>
            <b>Minor GC</b>
            <div>
                <button class="minor-gc">
                    <b>${this.isRunning ? "Finish" : "Start"}</b>
                </button>
            </div>
        `;
        }

        render();

        this.addEventListener('click', onClick);
        window.addEventListener('major-gc:start', disable);
        window.addEventListener('major-gc:stop', enable);
        window.addEventListener('minor-gc:alert', alert);
    }
}

window.customElements.define('minor-gc', MinorGC);