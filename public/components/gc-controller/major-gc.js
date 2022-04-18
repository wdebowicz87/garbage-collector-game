
class MajorGC extends HTMLElement {

    getElement = () => this.querySelector(".major-gc")

    isRunning = false;

    connectedCallback() {
        const onClick = (e) => {
            if (this.getElement().disabled) {
                return;
            }
            this.isRunning = !this.isRunning;
            const event = this.isRunning ? "major-gc:start" : "major-gc:stop"
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
            this.getElement().classList.add("major-gc-alert");
        }

        const removeAlert = () => {
            this.getElement().classList.remove("major-gc-alert");
        }


            const render = () => {
            this.innerHTML = `
            <style>
                .major-gc {
                    width: 72px;
                    height: 70px;
                }
                .major-gc-alert {
                    color: red;
                }
                
            </style>
            <b>Major GC</b>
            <div>
                <button class="major-gc">
                    <b>${this.isRunning ? "Finish" : "Start"}</b>
                </button>
            </div>
        `;
        }

        render();
        disable();

        this.addEventListener('click', onClick);
        window.addEventListener('minor-gc:start', disable);
        window.addEventListener('minor-gc:stop', enable);
        window.addEventListener('major-gc:alert', alert);
        window.addEventListener('game:start', enable);
    }
}

window.customElements.define('major-gc', MajorGC);