import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./object-reference.js";
import "./gc-collector.js";
import "./memory/heap-memory.js";
import "./memory/eden-space.js";
import "./memory/tenured-space.js";
import "./memory/survivor-space.js";
import "./memory/stack-memory.js";

class Game extends HTMLElement {

    objectCounter = 0;

    createObject = ()=> {
        this.objectCounter++;
        window.dispatchEvent(new CustomEvent("object:new", { detail: { id: this.objectCounter} }));
    }

    start = () => {
        let counter = 0;
        let maxCount = 6;
        const interval = setInterval(() => {
            this.createObject();
            counter++;
            if (counter == maxCount) {
                clearInterval(interval)
            }
        }, 80);
    }

    run = () => {
        this.start();
    }

    finishCycle = () => {
        console.log("event finished cycle");
        window.dispatchEvent(new CustomEvent("cycle:finished"));
    }

    connectedCallback() {
        window.finishCycle = this.finishCycle;
        window.run = this.run;
        this.innerHTML = `
            <style>
                .space {
                    height: 50px;
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
            <stack-memory></stack-memory> 
            <button onclick="window.finishCycle()">finish cycle</button>
            <button onclick="window.run()">run</button>
            <div class="space"></div>
            <heap-memory></heap-memory>
            <gc-collector></gc-collector>
        `;

        this.start();
    }
}

window.customElements.define("my-game", Game);
