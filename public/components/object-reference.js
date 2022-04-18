class ObjectReference extends HTMLElement {

    numericId =() => this.dataset.id;
    getElement = () => this.querySelector(".object-reference");
    executionCycles = 0;

    calculateLifespan() {
        const randomizer = Math.random();
        if (this.numericId() < 3 || randomizer < 0.5) {
            return Math.random() * 2;
        } else if (randomizer < 0.7) {
            return 2 + Math.random() * 10;
        } else if (randomizer < 0.90) {
            return 10 + Math.random() * 10;
        } else {
            return 40;
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
        this.lifespan = this.calculateLifespan();
        this.innerHTML = `
            <style>
                .object-reference
                 {
                    height: 20px;
                    width: 92px;
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


        window.addEventListener("object:new", e => {
            this.checkLifespan();
        })
    }
}

window.customElements.define('object-reference', ObjectReference);