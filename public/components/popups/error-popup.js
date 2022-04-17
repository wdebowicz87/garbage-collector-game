class ErrorPopup extends HTMLElement {

    getElement = () => this.querySelector(".error-popup")

    connectedCallback() {
        this.innerHTML = `
        <style>
            .error-popup {
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
            
            .error-popup-content {
                position: relative;
                background-color: white;
                margin: auto;
                padding: 0px;
                width: 600px;
                animation: error-popup-appear 0.4s;
            }
            .error-popup-content img {
                float: left;
                padding: 0px;
                width: 115px;
            }
            .error-popup-body {
                padding: 5px 15px 10px  ;
                font-size: larger;
                width: 450px;
                display: inline-block;
            }
            
            .error-popup-header {
              padding: 10px 10px;
              background-color: darkred;
              color: white;
            }
            
            @keyframes error-popup-appear {
               from {top:-300px; opacity:0}
               to {top:0; opacity:1}
            }

            .error-popup-close {
                color: white;
                float: right;
                font-size: 28px;
                font-weight: bold;
            }
            
            .error-popup-close:hover,
            .error-popup-close:focus {
              color: #000;
              text-decoration: none;
              cursor: pointer;
            }
            
        </style>
        <div class="error-popup">
          <div class="error-popup-content">
            <div class="error-popup-header">
              <span class="error-popup-close">&times;</span>
              <h1>BOOM!</h1>
            </div>
            <img src="images/bin_45.svg"></img>
            <div class="error-popup-body">
                <p>Your memory exploded with <b>java.lang.OutOfMemoryError</b></p>
                <p>Start Garbage Collection (GC) before your heap runs out of space. 
                Collect all the objects that does not have reference on the stack memory.</p>
                <p>If your heap is full but there are no objects to collect your app might have a memory leak.</p>
            </div>
          </div>
        
        </div>
        `;

        this.querySelector(".error-popup-close").onclick = () => {
            this.getElement().style.display = "none";
        }

        window.addEventListener("memory:error", e => {
            this.getElement().style.display = "block";
        })
    }
}

window.customElements.define('error-popup', ErrorPopup);