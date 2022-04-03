import {toEncodedJson} from "./utils.js";
import "./programmer.js";
import "./new-generation.js";
import "./old-generation.js";
import "./gc-object.js";
import "./gc-collector.js";
import { start } from "./gc-gameplay.js";

class Game extends HTMLElement {

    connectedCallback() {
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
            <div class="space"></div>
            <b>Memory</b>
            <div class="memory">
                <new-generation></new-generation>
                <old-generation></old-generation>
            </div>
            <gc-collector></gc-collector>
        `;

        start();
    }
}

window.customElements.define("my-game", Game);
