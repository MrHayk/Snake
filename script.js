// import $ from "jquery";

const cont = document.querySelector(".container");
const apple = document.querySelector(".apple");
const snake = document.querySelector(".snake");
const h5 = document.querySelector("h5");
const music = document.querySelector(".music")

let score = 0;
let sequel = [];
let parts = [];
let timer = 100;
parts[score] = document.createElement("div");
parts[score].classList.add("parts" + score);
parts[score].innerHTML = 0;
console.log(parts[score]);

const apl = {
    x: 0,
    y: 0
}
const snk = {
    x: 0,
    y: 0,
    speed: 15
}

const prSnk = new Proxy(snk, {
    set(target, prop, value) {
        otherPartsPlacing();
        target[prop] = value; // Check point
        snake.style.top = prSnk.y + "px";
        snake.style.left = prSnk.x + "px";
    }
})

const prApl = new Proxy(apl, {
    set(target, prop, value) {
        target[prop] = value;
        apple.style.top = prApl.y + "px";
        apple.style.left = prApl.x + "px";
    }
})

// Placing container into grid
let Xsteps = cont.offsetWidth / snk.speed;
let Ysteps = cont.offsetHeight / snk.speed;
let height = snk.speed * Math.floor(Ysteps);
let width = snk.speed * Math.floor(Xsteps);
console.log(width, height);

prApl.y = (snk.speed * Math.round(Math.random() * (Ysteps - 1))); //495
prApl.x = (snk.speed * Math.round(Math.random() * (Xsteps - 1))); //990

let vorUxutyamb = "right"

setInterval(() => {
    if ((vorUxutyamb == "up") && prSnk.y > 0) {
        prSnk.y -= snk.speed;
        checkIfAppleEaten();
    }
    else if ((vorUxutyamb == "left") && prSnk.x > 0) {
        prSnk.x -= snk.speed;
        checkIfAppleEaten();
    }
    else if ((vorUxutyamb == "down") && prSnk.y < height - snk.speed) {
        prSnk.y += snk.speed;
        checkIfAppleEaten();
    }
    else if ((vorUxutyamb == "right") && prSnk.x < width - snk.speed) {
        prSnk.x += snk.speed;
        checkIfAppleEaten();
    }
}, timer);

document.addEventListener("keydown", function (evnt) {
    console.log(evnt.code);
    key = evnt.code;
    // Responsive keys

    if ((key == "ArrowUp" || key == "KeyW")) {
        vorUxutyamb = "up";
    }
    else if ((key == "ArrowLeft" || key == "KeyA") && prSnk.x > 0) {
        vorUxutyamb = "left";
    }
    else if ((key == "ArrowDown" || key == "KeyS") && prSnk.y < height - snk.speed) {
        vorUxutyamb = "down"
    }
    else if ((key == "ArrowRight" || key == "KeyD") && prSnk.x < width - snk.speed) {
        vorUxutyamb = "right";
    }
    if (score == 1) {
        music.play();
    }
});

function checkIfAppleEaten() {
    //Below for apple cordinates generation
    if ((prSnk.x - prApl.x > -prSnk.speed && prSnk.x - prApl.x < prSnk.speed)
        && (prSnk.y - prApl.y > -prSnk.speed && prSnk.y - prApl.y < prSnk.speed)) {
        prApl.y = (snk.speed * Math.round(Math.random() * (Ysteps - 1))); //495
        prApl.x = (snk.speed * Math.round(Math.random() * (Xsteps - 1))); //990
        //Below for score collection
        score++;
        h5.innerHTML = score;
        //For other parts 
        parts.push(document.createElement("div"));
        parts[score].classList.add("parts" + score);
        cont.append(parts[score]);
        parts[score].classList.add(`snakePart`);
        // console.log(parts[score]);
        parts[0].style.top = prSnk.y + "px";
        parts[0].style.left = prSnk.x + "px";
        parts[score].style.top = parts[score - 1].style.top;
        parts[score].style.left = parts[score - 1].style.left;
    }
}

function otherPartsPlacing() {
    if (score > 0) {
        parts[0].style.top = prSnk.y + "px";
        parts[0].style.left = prSnk.x + "px";
    }
    let i = 0;
    while (score >= 0 && i < score) {
        parts[0].style.top = prSnk.y + "px";
        parts[0].style.left = prSnk.x + "px";
        parts[score - i].style.top = parts[score - (i + 1)].style.top;
        parts[score - i].style.left = parts[score - (i + 1)].style.left;
        i++;
    }
}
