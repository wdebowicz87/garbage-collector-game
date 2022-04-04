const eden = Symbol("eden");
const oldGen = Symbol("oldGen");
const garbage = Symbol("garbage");

class GCObject extends HTMLElement {

    state = eden;
    id =() => this.dataset.id
    getElement = () => this.querySelector(".gs-object")
    destroy = () => {
        this.getElement().classList.add("anim-destroy");
        this.state = garbage;
        setTimeout(
            () => this.remove(),
            500
        )
    }

    connectedCallback() {
        this.innerHTML = `
            <style>
                .gs-object {
                    height: 50px;
                    width: 50px;
                    border: 5px solid black;
                    background-color: yellow;
                    position: relative;
                    cursor: pointer;
                }
                .gs-object:hover {
                    background-color: orange;
                }
                .anim-create {
                    animation: move-from-top 2s;
                    animation-fill-mode: forwards;
                }
                @keyframes move-from-top {
                    0% { top: -300px; }
                    100% { top: 0px;}
                }
                .anim-destroy {
                    animation: move-down 0.5s;
                    animation-fill-mode: forwards;
                    transition: transform 0.5s;
                    transform: rotate(180deg) scale(0.5);
                }
                @keyframes move-down {
                    0% { top: 0px; background-color: orange }
                    100% { top: 110px; background-color: red}
                }
                .anim-promote {
                    animation: move-right 1s;
                    animation-fill-mode: forwards;
                }
                @keyframes  move-right {
                    0% { left: 0px; }
                    100% { left: 300px;}
                }
            </style>
            <div class="gs-object">
                ${this.id()}
            </div>
        `;

        this.addEventListener('click', this.destroy);

        window.addEventListener("cycle:finished", e => {
            switch (this.state) {
                case garbage:
                    console.log("garbage: " + this.id());
                    break;
                case eden:
                    console.log("promote to oldGen" + this.id());
                    this.getElement().classList.add('anim-promote');
                    setTimeout(() => document.querySelector('.old-generation').append(this), 1000);
                    this.state = oldGen;
                    break;

            }
        })
    }
}

window.customElements.define('gc-object', GCObject);