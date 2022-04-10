
class MajorGC extends HTMLElement {

    getElement = () => this.querySelector(".major-gc")

    isRunning = false;

    connectedCallback() {
        const onClick = () => {
            this.isRunning = !this.isRunning;
            const event = this.isRunning ? "major-gc:start" : "major-gc:stop"
            window.dispatchEvent(new CustomEvent(event));
            render();
        }

        const disable = () => {
            this.getElement().disabled = true;
        }

        const enable = () => {
            this.getElement().disabled = false;
        }

        const render = () => {
            this.innerHTML = `
            <style>
                .major-gc {
                    width: 72px;
                    height: 70px;
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

        this.addEventListener('click', onClick);
        window.addEventListener('minor-gc:start', disable);
        window.addEventListener('minor-gc:stop', enable);
    }
}

window.customElements.define('major-gc', MajorGC);