class TenuredSpace extends HTMLElement {

    className = 'tenured-space';

    connectedCallback() {
        this.innerHTML = `
            <style>
                .tenured-space {
                    height: 60px;
                    padding: 2px;
                    width: 600px;
                    border: 5px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                }
            </style>
            <b>Tenured</b>
            <div class=${this.className}>
            </div>
        `;
    }
}

window.customElements.define('tenured-space', TenuredSpace)