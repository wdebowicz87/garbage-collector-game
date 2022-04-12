class HeapMemory extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .heap-memory {
                    height: 340px;
                    padding: 10px;
                    width: 900px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                }
                .new-generation-flex {
                    height: 110px;
                    padding: 10px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 30px;
                    background-color: lightgoldenrodyellow;
                }
                .old-generation-flex {
                    height: 110px;
                    padding: 10px;
                    border: 1px solid green;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                    background-color: lightgoldenrodyellow;
                }
            </style>
            <b>Heap Memory</b>
            <div class="heap-memory">
                <div>
                    <b>New Generation</b>
                    <div class="new-generation-flex">
                        <eden-space></eden-space>
                        <survivor-space></survivor-space>     
                        <minor-gc></minor-gc>
                    </div>
                </div>
                <div>
                    <b>Old Generation</b>
                    <div class="old-generation-flex">
                        <tenured-space></tenured-space>      
                        <major-gc></major-gc>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('heap-memory', HeapMemory);