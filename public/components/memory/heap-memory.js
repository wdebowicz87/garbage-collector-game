import "./eden-space.js";
import "./tenured-space.js";
import "./survivor-space.js";

class HeapMemory extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .heap-memory {
                    height: 100px;
                    padding: 10px;
                    width: 1400px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 20px;
                }
            </style>
            <b>Heap Memory</b>
            <div class="heap-memory">
                <eden-space></eden-space>
                <survivor-space></survivor-space>
                <tenured-space></tenured-space>
            </div>
        `;
    }
}

window.customElements.define('heap-memory', HeapMemory);