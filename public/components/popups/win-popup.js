class WinPopup extends HTMLElement {

    getElement = () => this.querySelector(".win-popup")
    minorGcs = 0;
    majorGcs = 0;
    outOfMemoryErrors = 0;
    createdObjects = 0;
    collectedObjects = 0;
    misscollectedObjects = 0;

    collectionPrecision() {
        const collectionsAttempts = this.collectedObjects + this.misscollectedObjects;
        return collectionsAttempts > 0 ?
            Math.floor(100 * this.collectedObjects / (this.collectedObjects + this.misscollectedObjects)) :
            0;
    }

    render() {
        this.innerHTML = `
        <style>
            .win-popup {
                display: none;
                position: fixed;
                z-index: 1;
                padding-top: 140px;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgb(0,0,0);
                background-color: rgba(0,0,0,0.4);
            }
            
            .win-popup-content {
                position: relative;
                background-color: white;
                margin: auto;
                padding: 0px;
                width: 600px;
                animation: win-popup-appear 0.4s;
            }
            .win-popup-content .win-left-bin {
                float: left;
                padding: 0px;
                width: 115px;
                margin-top: 120px;
            }
            .win-popup-body {
                padding: 5px 15px 10px;
                font-size: larger;
                width: 450px;
                display: inline-block;
            }
            
            .win-popup-header {
              padding: 10px 10px 10px 60px;
              background-color: green;
              color: white;
            }
            .win-popup-footer {
              padding: 20px;
              background-color: green;
              color: white;
            }
            
            @keyframes win-popup-appear {
               from {top:-300px; opacity:0}
               to {top:0; opacity:1}
            }

            .win-popup-close {
                color: white;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }
            
            .win-popup-close:hover,
            .win-popup-close:focus {
              color: #000;
              text-decoration: none;
              cursor: pointer;
            }
            
            .win-popup table {
                border-collapse: collapse;
                padding: 2px;
                font-size: medium;
            }
            .win-popup th {
                background-color: green;
                color: white;
                padding: 3px;
                border: 2px solid green;
            }
            .win-popup td {
                padding: 3px;
                border: 2px solid green;
            }
            .win-bin {
                position: absolute;
                top: -58px;
                width: 60px;
                opacity: 0.9;
                animation: 10s 2s win-bin-move infinite;
            }
            @keyframes win-bin-move {
                    0% {transform: translateX(0px) rotate(0deg); }
                    5% {transform: translateX(-10px) rotate(0deg); }
                    35% {transform: translateX(575px) rotate(-10deg); }
                    40% {transform: translateX(580px) rotate(0deg); }
                    50% {
                        transform: translateX(550px) translateY(490px) rotate(0deg) scaleX(-1); 
                    }
                    55% {transform: translateX(560px) translateY(490px) rotate(0deg) scaleX(-1); }
                    80% {transform: translateX(10px) translateY(490px) rotate(10deg) scaleX(-1); }
                    85% {transform: translateX(0px) translateY(490px) rotate(0deg) scaleX(-1); }
                    100% {transform: translateX(0px) translateY(0px) rotate(-360deg) scaleX(1); }
            }
        </style>
        <div class="win-popup">
          <div class="win-popup-content">
            <img src="images/bin_45.svg" class="win-bin"></img>
            <div class="win-popup-header">
              <span class="win-popup-close">&times;</span>
              <h1>Congratulations!</h1>
            </div>
            <img class ="win-left-bin" src="images/bin_close.svg"></img>

            <div class="win-popup-body">
                <p>
                    Program finished running.<br>
                    Good job cleaning all the garbage.
                </p>
                <h2>Statistics</h2>
                <table>
                    <tr>
                        <th>Event</th>
                        <th>Amount</th>
                    </tr>
                    <tr>
                        <td>Created objects</td>
                        <td>${this.createdObjects}</td>
                    </tr>
                    <tr>
                        <td>Collected objects</td>
                        <td>${this.collectedObjects}</td>
                    </tr>
                    <tr>
                        <td>Collection precision</td>
                        <td>${this.collectionPrecision()}%</td>
                    </tr>
                    <tr>
                        <td>OutOfMemoryErrors</td>
                        <td>${this.outOfMemoryErrors}</td>
                    </tr>
                    <tr>
                        <td>Minor Garbage Collections</td>
                        <td>${this.minorGcs}</td>
                    </tr>
                    <tr>
                        <td>Major Garbage Collections</td>
                        <td>${this.majorGcs}</td>
                    </tr>
                </table>
                <p>
                    <h2>Thank you for playing</h2>
                    You can check the source code of this simulator on <a href="https://github.com/wdebowicz87/garbage-collector-game" target="_blank">github</a><br>
                    Made by <a href="https://twitter.com/wdebowicz" target="_blank">@wdebowicz</a>
                </p>
            </div>
            <div class="win-popup-footer"></div>
          </div>
        
        </div>
        `;

        this.querySelector(".win-popup-close").onclick = () => {
            this.getElement().style.display = "none";
        }
    }

    connectedCallback() {
        this.render();

        window.addEventListener("minor-gc:start", e => {
            this.minorGcs++;
        })
        window.addEventListener("major-gc:start", e => {
            this.majorGcs++;
        })
        window.addEventListener("memory:error", e => {
            this.outOfMemoryErrors++;
        })
        window.addEventListener("object:new", e => {
            this.createdObjects++;
        })
        window.addEventListener("collect:success", e => {
            this.collectedObjects++;
        })
        window.addEventListener("collect:error", e => {
            this.misscollectedObjects++;
        })

        window.addEventListener("game:won", e => {
            this.render();
            this.getElement().style.display = "block";
        })
    }
}

window.customElements.define('win-popup', WinPopup);