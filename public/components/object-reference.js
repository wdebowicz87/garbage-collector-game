class ObjectReference extends HTMLElement {

    numericId =() => this.dataset.id;
    getElement = () => this.querySelector(".object-reference");
    executionCycles = 0;

    calculateLifespan() {
        const randomizer = Math.random();
        if (this.numericId() < 3 || randomizer < 0.5) {
            return Math.random() * 2;
        } else if (randomizer < 0.65) {
            return Math.random() * 10;
        } else if (randomizer < 0.8) {
                return Math.random() * 100;
        } else if (randomizer < 0.9) {
            return 1000;
        }
    }

    mark() {
        this.getElement().classList.add("object-reference-mark");
    }

    unmark() {
        this.getElement().classList.remove("object-reference-mark");
    }

    alert() {
        this.getElement().classList.add("object-reference-alert");
        setTimeout(() => this.getElement().classList.remove("object-reference-alert"), 400);
    }

    checkLifespan() {
        if (this.executionCycles > this.lifespan) {
            this.remove();
        }
        this.executionCycles++;
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .object-reference
                 {
                    height: 20px;
                    width: 88px;
                    /*border: 3px solid black;*/
                    /*background-color: yellow;*/
                    text-align: left;
                    border: 1px solid black;
                    background-color: lightyellow;
                }
                .object-reference-mark
                {
                    background-color: yellow;
                }
                .object-reference-alert
                {
                    animation: 0.4s reference-alert 1;
                }
                @keyframes reference-alert
                {
                    0%      {background:yellow;}
                    5%     {background:orange;}
                    95%     {background:orange;}
                    100%    {background:yellow;}
                }
            </style>
            <div class="object-reference">
                *obj-${this.numericId()}(ref)
            </div>
        `;

        this.lifespan = this.calculateLifespan();
        window.addEventListener("object:new", e => {
            this.checkLifespan();
        })
    }
}

window.customElements.define('object-reference', ObjectReference);