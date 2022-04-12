class SurvivorSpace extends HTMLElement {

    className = 'survivor-space';
    objectsContainer = () => this.querySelector(`.${this.className}`);

    connectedCallback() {
        this.innerHTML = `
            <style>
                .survivor-space {
                    height: 60px;
                    padding: 2px 4px;
                    width: 356px;
                    border: 3px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 4px;
                    background-color: lightblue;
                }
            </style>
                <b>Survivor Space</b>
                <div class=${this.className}>
            </div>
        `;

        const addObject = (objectId) => {
            this.objectsContainer().append(document.getElementById(objectId));
        }

        window.addEventListener("survivor-space:add", (e) => addObject(e.detail.id));
    }
}

window.customElements.define('survivor-space', SurvivorSpace)