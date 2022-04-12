import {toEncodedJson} from "../utils.js";
import "../programmer.js";
import "./gc-object.js";
import "./object-reference.js";
import "./sound-controller.js";
import "./gc-collector.js";
import "./code-sample.js";
import "./code-executor.js";
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

    connectedCallback() {
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
                gap: 20px;
            }
            button:enabled {
                cursor: pointer;
            }
        </style>
<!--            <p>Garbage Collector</p>-->
        <sound-controller></sound-controller>
        <div class="code">
            <code-sample></code-sample>
            <code-executor></code-executor>
        </div>
        <div class="memory">
            <stack-memory></stack-memory> 
            <div>
                <heap-memory></heap-memory>
                <gc-collector></gc-collector>
            </div>
        </div>
        `;
    }
}

window.customElements.define("my-game", Game);
