import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./gc-collector.js";
import "./memory/heap-memory.js";

class Game extends HTMLElement {

    objectCounter = 0;

    createObject = ()=> {
        this.objectCounter++;
        window.dispatchEvent(new CustomEvent("object:new", { detail: { id: this.objectCounter} }));
    }

    start = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(this.createObject, 100);
        }
    }

    finishCycle = () => {
        console.log("event finished cycle");
        window.dispatchEvent(new CustomEvent("cycle:finished"));
    }

    connectedCallback() {
        window.finishCycle = this.finishCycle;
        this.innerHTML = `
            <style>
                .space {
                    height: 200px;
                }
                .memory {
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
            <h1>Garbage Collector</h1>
            <my-programmer></my-programmer> 
            <button onclick="window.finishCycle()">finish cycle</button>
            <div class="space"></div>
            <heap-memory></heap-memory>
            <gc-collector></gc-collector>
        `;

        this.start();
    }
}

window.customElements.define("my-game", Game);
