import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./object-reference.js";
import "./gc-collector.js";
import "./code-sample.js";
import "./minor-gc.js";
import "./major-gc.js";
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
        this.querySelector('.start').disabled = true;
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

    runCode = () => {
        this.interval = setInterval(() => {
            this.createObject();
        }, 1000);
    }

    pauseCode = () => {
        clearInterval(this.interval)
    }


    connectedCallback() {
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
            .start {
                margin-top: 18px;
                width: 70px;
                height: 60px;
            }
        </style>
<!--            <p>Garbage Collector</p>-->
        <div class="code">
            <code-sample></code-sample>
            <button class="start" onclick="window.start()"><b>Start</b></button>
        </div>
        <div class="memory">
            <stack-memory></stack-memory> 
            <div>
                <heap-memory></heap-memory>
                <gc-collector></gc-collector>
            </div>
        </div>
        `;

        window.addEventListener("minor-gc:start", e => {
            this.pauseCode();
        })
        window.addEventListener("major-gc:start", e => {
            this.pauseCode();
        })

        window.addEventListener("minor-gc:stop", e => {
            this.runCode();
        })
        window.addEventListener("major-gc:stop", e => {
            this.runCode();
        })
    }
}

window.customElements.define("my-game", Game);
