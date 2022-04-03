import {toEncodedJson} from "./utils.js";
import "./programmer.js";
import "./new-generation.js";
import "./gc-object.js";
import "./gc-collector.js";

class Game extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
            <style>
                .space {
                    height: 200px;
                }
            </style>
            <h1>Garbage Collector</h1>
            <my-programmer></my-programmer>
            <div class="space"></div>
            <new-generation></new-generation>
            <gc-collector></gc-collector>
        `;
    }
}

window.customElements.define("my-game", Game);
