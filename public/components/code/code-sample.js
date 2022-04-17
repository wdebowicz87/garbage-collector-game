class CodeSample extends HTMLElement {

    id =() => this.dataset.id
    getElement = () => this.querySelector(".code-sample")

    connectedCallback() {
        this.innerHTML = `
            <style>
                .code-sample
                 {
                    width: 300px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0px;
                    text-align: left;
                    font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New;
                    background: url("images/dot.png");
                    background-repeat: no-repeat;
                    background-size: 300px 20px;
                    
                }
                .code-execute {
                    animation: 1s execute step-end forwards;
                }
                @keyframes execute {
                    0% { background-position: center}                
                    33% { background-position: bottom}                
                    66% { background-position: top}                
                }
            </style>
            <b>Code</b>
            <div class="code-sample">
                <span>1 </span>
                <span>2 Object obj = new Object();</span>
                <span>3 </span>
            </div>
        `;

        window.addEventListener("object:new", e => {
            this.execute();
        })
    }

    execute = () => {
        this.querySelector('.code-sample').classList.add('code-execute');
        this.resetAnimation();
    }

    resetAnimation = () => {
        const el = this.getElement();
        el.style.animation = 'none';
        el.offsetHeight; /* trigger reflow */
        el.style.animation = null;
    }
}

window.customElements.define('code-sample', CodeSample);