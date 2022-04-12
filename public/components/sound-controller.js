class SoundController extends HTMLElement {

    className = 'sound-controller';
    errorSound = new Audio("../audio/Blip_Select.wav");
    coinSound = new Audio("../audio/Pickup_Coin.wav");
    gcSound = new Audio("../audio/Powerup.wav");
    memoryErrorSound = new Audio("../audio/Explosion.wav");

    play(sound) {
        sound.volume = 0.3;
        sound.play();
    }

    connectedCallback() {

        window.addEventListener("collect:error", (e) => this.play(this.errorSound));
        window.addEventListener("collect:success", (e) => this.play(this.coinSound));
        window.addEventListener("minor-gc:start", (e) => this.play(this.gcSound));
        window.addEventListener("major-gc:start", (e) => this.play(this.gcSound));
        window.addEventListener("memory:error", (e) => this.play(this.memoryErrorSound));

        this.errorSound.load();
        this.coinSound.load();
        this.gcSound.load();
        this.memoryErrorSound.load();
    }
}

window.customElements.define('sound-controller', SoundController)