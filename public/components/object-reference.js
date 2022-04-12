class ObjectReference extends HTMLElement {

    numericId =() => this.dataset.id;
    getElement = () => this.querySelector(".object-reference");

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
    }
}

window.customElements.define('object-reference', ObjectReference);