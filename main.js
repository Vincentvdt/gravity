const wrapper = document.querySelector('#root');
// let colors = ["#165B33", "#D6001C"];//Gold = "#caa906"

let max = 75;
let min = 20;

class Ball {

    constructor(posX, posY) {
        this.id = Math.floor(Math.random() * Date.now()).toString();
        this.size = Math.floor(Math.random() * (max - min)) + min;
        this.posX = posX - (this.size / 2);
        this.posY = (window.innerHeight - posY) - (this.size / 2);
        this.velocity = 1.1;
        this.domElement = document.createElement('div');
        this.isFalling = true;
        this.timerFade = undefined;

        // this.color = colors[Math.floor(Math.random() * colors.length)];
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }


    init() {

        this.domElement.className = 'ball';
        this.domElement.dataset.id = this.id;
        this.domElement.style.width = `${this.size}px`
        this.domElement.style.height = `${this.size}px`
        this.domElement.style.bottom = `${this.posY}px`;
        this.domElement.style.left = `${this.posX}px`;
        this.domElement.style.backgroundColor = this.color;

        wrapper.appendChild(this.domElement);

        this.initFall()

        this.domElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isFalling = !this.isFalling
            if (this.isFalling) {
                this.domElement.style.cursor = "grab";
            } else {
                this.domElement.style.cursor = "pointer";
            }
        })
    }

    die() {
        clearTimeout(this.timerFade)
        wrapper.removeChild(this.domElement);
    }

    initFall() {

        let bottom = this.posY
        let timeoutDelay = Math.floor(1000 * (1 + ((this.size / 100) * 2)))


        let timerFall = setInterval(() => {
            if (!this.isFalling) return;
            if (bottom <= 0) {
                this.isFalling = false;
                this.domElement.style.bottom = `${bottom}px`
                clearInterval(timerFall)
                this.timerFade = setTimeout(() => {
                    this.domElement.style.opacity = "0";
                    setTimeout(
                        () => {
                            this.die()
                        }
                        , 1500)
                }, timeoutDelay)
            }

            bottom -= (this.size / 10) * this.velocity
            if (bottom <= 0) bottom = 0;
            this.domElement.style.bottom = `${bottom}px`
        }, 20)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener("click", (e) => {
        let ball = new Ball(e.pageX, e.pageY);
        ball.init();

    })
})