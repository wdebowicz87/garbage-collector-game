class MinorGC extends HTMLElement {

    getElement = () => this.querySelector(".minor-gc")

    isRunning = false;

    connectedCallback() {
        const onClick = (e) => {
            this.isRunning = !this.isRunning;
            const event = this.isRunning ? "minor-gc:start" : "minor-gc:stop"
            window.dispatchEvent(new CustomEvent(event, { detail: { x: e.pageX, y: e.pageY } }));
            render();
            removeAlert();
        }

        const disable = () => {
            this.getElement().disabled = true;
        }

        const enable = () => {
            this.getElement().disabled = false;
        }

        const alert = () => {
            this.getElement().classList.add("minor-gc-alert");
        }

        const removeAlert = () => {
            this.getElement().classList.remove("minor-gc-alert");
        }

        const render = () => {
            this.innerHTML = `
            <style>
                .minor-gc {
                    width: 72px;
                    height: 70px;
                }
                .minor-gc-alert {
                    color: red;
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
        disable();

        this.addEventListener('click', onClick);
        window.addEventListener('major-gc:start', disable);
        window.addEventListener('major-gc:stop', enable);
        window.addEventListener('minor-gc:alert', alert);
        window.addEventListener('game:start', enable);
    }
}

window.customElements.define('minor-gc', MinorGC);