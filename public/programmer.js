class Programmer extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .programmer {
                    border: 5px solid red;
                    display: inline-block;
                }
            </style>
            <div class="programmer">
                <h2>Programmer</h2>
                <img src="images/mos.gif"/> 
            </div>
        `;
    }
}

window.customElements.define('my-programmer', Programmer)