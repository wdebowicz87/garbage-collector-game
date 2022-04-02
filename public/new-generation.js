class NewGeneration extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .new-generation {
                    height: 100px;
                    width: 600px;
                    border: 5px solid green;
                }
            </style>
            <h2>New generation</h2>
            <div class="new-generation">
           
            </div>
        `;
    }
}

window.customElements.define('new-generation', NewGeneration)