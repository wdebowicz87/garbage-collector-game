class OldGeneration extends HTMLElement {

    className = 'old-generation';

    connectedCallback() {
        this.innerHTML = `
            <style>
                .old-generation {
                    height: 60px;
                    padding: 2px;
                    width: 400px;
                    border: 5px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                }
            </style>
            <b>Old Generation</b>
            <div class=${this.className}>
            </div>
        `;
    }
}

window.customElements.define('old-generation', OldGeneration)