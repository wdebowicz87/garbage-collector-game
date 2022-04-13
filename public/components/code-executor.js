class CodeExecutor extends HTMLElement {

    getElement = () => this.querySelector(".code-executor")

    objectCounter = 0;

    createObject = ()=> {
        this.objectCounter++;
        window.dispatchEvent(new CustomEvent("object:new", { detail: { id: this.objectCounter} }));
    }

    runCode = () => {
        this.getElement().disabled = true;
        this.getElement().querySelector(".start").classList.add("hide");
        this.getElement().querySelector(".paused").classList.add("hide");
        this.getElement().querySelector(".running").classList.remove("hide");
        this.interval = setInterval(() => {
            this.createObject();
        }, 1000);
    }

    pauseCode = () => {
        this.getElement().querySelector(".running").classList.add("hide");
        this.getElement().querySelector(".paused").classList.remove("hide");
        clearInterval(this.interval)
    }

    connectedCallback() {
        const startGame = () => {
            this.runCode();
            window.dispatchEvent(new CustomEvent('game:start'));
        }

        const disable = () => {
            this.getElement().disabled = true;
        }

        const enable = () => {
            this.getElement().disabled = false;
        }


        this.innerHTML = `
        <style>
            .code-executor {
                width: 72px;
                height: 57px;
            }
            .hide {
                display: none;
            }
            
        </style>
        <b>Execution</b>
        <div>
            <button class="code-executor">
                <b class="start">Start</b>
                <b class="running hide">Running</b>
                <b class="paused hide">Paused</b>
            </button>
        </div>
        `;

        this.getElement().addEventListener('click', startGame);

        window.addEventListener("minor-gc:start", e => {
            this.pauseCode();
        })
        window.addEventListener("major-gc:start", e => {
            this.pauseCode();
        })
        window.addEventListener("memory:error", e => {
            this.pauseCode();
            setTimeout(() => window.alert(`
            BOOM!
            Your memory exploded: java.lang.OutOfMemoryError
            
            Try to trigger GC before your heap runs out of space.
            No objects to collect? your app might have a memory leak.
            `), 200);
        })

        window.addEventListener("minor-gc:stop", e => {
            this.runCode();
        })
        window.addEventListener("major-gc:stop", e => {
            this.runCode();
        })
    }
}

window.customElements.define('code-executor', CodeExecutor);