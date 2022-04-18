class ProgressBar extends HTMLElement {

    progressPercentage = 0;

    getElement = () => this.querySelector(".progress-bar")

    render() {
        this.innerHTML = `
        <style>
            .progress-bar {
                width: 400px;
                height: 57px;
            }
            .progress {
                width: 100%;
                background-color: lightgoldenrodyellow;
                border: 1px solid green;
            }
            .progress-bar-indicator {
                width: ${this.progressPercentage}%;
                height: 30px;
                background-color: lightblue;
                text-align: center;
                color: green;
                font-size: x-large;
            }
        </style>
        <b>Progress</b>
        <div class="progress-bar">
            <div class = "progress">
                <div class = "progress-bar-indicator">
                    <b>${this.progressPercentage}%</b>
                </div>
            </div>
        </div>
        </divprogress-bar>
        `;
    }

    connectedCallback() {
        this.render();

        window.addEventListener("object:new", e => {
            this.progressPercentage += 2;
            if (this.progressPercentage <= 100) {
                this.render();
            }
            if (this.progressPercentage == 100) {
                setTimeout(() => window.dispatchEvent(new CustomEvent('game:won')), 250);
            }
        });
    }
}

window.customElements.define('progress-bar', ProgressBar);