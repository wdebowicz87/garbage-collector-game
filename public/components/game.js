import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./object-reference.js";
import "./gc-collector.js";
import "./code-sample.js";
import "./memory/heap-memory.js";
import "./memory/eden-space.js";
import "./memory/tenured-space.js";
import "./memory/survivor-space.js";
import "./memory/stack-memory.js";

class Game extends HTMLElement {

    objectCounter = 0;

    createObject = ()=> {
        this.querySelector("code-sample").execute();
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
        }, 1000);
    }

    runGC = () => {
        window.dispatchEvent(new CustomEvent("cycle:start"));
        this.start();
    }

    finishCycle = () => {
        console.log("event finished cycle");
        window.dispatchEvent(new CustomEvent("cycle:finished"));
        setTimeout(this.start, 2500);
    }

    connectedCallback() {
        window.finishCycle = this.finishCycle;
        window.runGC = this.runGC;
        window.start = this.start;
        this.innerHTML = `
        <style>
            .memory {
                    margin-top: 10px;
                    width: 1100px;
                    /*border: 3px solid green;*/
                    display: flex;
                    flex-direction: row;
                    align-items: flex-start;
                    gap: 20px;
            }
            .code {
                    /*border: 3px solid green;*/
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
            }
        </style>
<!--            <p>Garbage Collector</p>-->
        <div class="code">
            <code-sample></code-sample>
            <button onclick="window.start()">start</button>
        </div>
        <div class="memory">
            <stack-memory></stack-memory> 
            <div>
                <heap-memory></heap-memory>
                <gc-collector></gc-collector>
                <button onclick="window.finishCycle()">finish cycle</button>
                <button onclick="window.runGC()">run gc</button>
            </div>
        </div>
        `;
    }
}

window.customElements.define("my-game", Game);
