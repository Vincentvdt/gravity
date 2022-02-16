const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// set width and height
canvas.width = innerWidth
canvas.height = innerHeight

// set mouse position to the middle of the screen by default
let mouse = {
    x: innerWidth / 2, y: innerHeight / 2
}

const gravity = 0.98
const friction = 0.90

let colors = [
    '#219F94',
    '#C1DEAE',
    '#E8E8A6'
]

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class Ball {
    constructor(position, radius, velocity, color) {
        this.position = {
            x: position.x,
            y: position.y
        }
        this.velocity = {
            x: velocity.x,
            y: velocity.y
        }
        this.radius = radius
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color

        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.radius + this.velocity.y >= canvas.height ||
            this.position.y - this.radius + this.velocity.y <= 0
        ) {
            this.velocity.y = -this.velocity.y * friction
        } else {
            this.velocity.y = this.velocity.y += gravity
        }

        if (this.position.x + this.radius + this.velocity.x >= canvas.width ||
            this.position.x - this.radius + this.velocity.x <= 0.5) {
            this.velocity.x = -this.velocity.x * friction
        }
        console.log(this.position.y)
        if (this.position.y > canvas.height - 0.5) {
            this.velocity.y = 0
            this.velocity.x = 0
        }
    }
}

let balls = []

function init() {
    balls = []
    for (let i = 0; i < 100; i++) {
        let radius = getRandomArbitrary(8, 20)
        let position = {
            x: getRandomArbitrary(radius, canvas.width - radius),
            y: getRandomArbitrary(radius, canvas.height - radius)
        }

        let velocity = {
            x: getRandomArbitrary(-3, 3),
            y: getRandomArbitrary(-2, 2)
        }
        let color = colors[Math.floor(getRandomArbitrary(0, colors.length - 1))]
        balls.push(new Ball(position, radius, velocity, color))
    }
}


function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    balls.forEach(ball => {
        ball.update()
    })
}

init()
animate()

// Event Listeners

// update mouse position
addEventListener('mousemove', ({clientX, clientY}) => {
    mouse.x = clientX
    mouse.y = clientY
})

addEventListener('click', () => {
    init()
})


addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
    init()
})



