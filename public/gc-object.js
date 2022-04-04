const eden = Symbol("eden");
const survivor = Symbol("survivor");
const tenured = Symbol("tenured");
const garbage = Symbol("garbage");

const stateToParentSelector = {
    [eden]: ".eden-space",
    [survivor]: ".survivor-space",
    [tenured]: ".tenured-space"
}

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

        const promoteTo = (newState) => {
            const newParent = stateToParentSelector[newState];
            console.log(`promote to ${newParent} ${this.id()}`);
            this.getElement().classList.add('anim-promote');
            this.state = newState;
            setTimeout(() => document.querySelector(newParent).append(this), 1000);
        }

        window.addEventListener("cycle:finished", e => {
            const state = this.state;
            switch (state) {
                case garbage:
                    break;
                case eden:
                    promoteTo(survivor);
                    break;
                case survivor:
                    promoteTo(tenured);
                    break;

            }
        })
    }
}

window.customElements.define('gc-object', GCObject);