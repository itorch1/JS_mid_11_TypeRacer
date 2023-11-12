const timer = document.getElementById('timer');
const paragraph = document.getElementById('paragraph');
const input = document.getElementById('input');
const modal = document.getElementById('gameover');

const match = document.querySelector('.match');
const mismatch = document.querySelector('.mismatch');

let countdown;

let paraText;
let score = 0;

modal.addEventListener('click', startRound);
input.addEventListener('input', (e) => {
    const inputArr = e.target.value.split('');
    const paraArr = paragraph.innerText.split('');
    paragraph.innerText = '';
    matchFlag = true;
    paraArr.forEach((char, index) => {
        if (index < inputArr.length) {
            if (matchFlag && char == inputArr[index]) {
                paragraph.innerHTML += `<span class="match">${char}</span>`
            } else {
                matchFlag = false;
                paragraph.innerHTML += `<span class="mismatch">${char}</span>`
            }
        } else {
            paragraph.innerHTML += char;
        }
    })
    if (inputArr.length == paraArr.length && match)
        success();
})


startRound();

function getRandomParagraph() {
    fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
            paragraph.innerText = data.content;
            const time = Math.floor(data.content.length / 5);
            setTimer(time);
        })
}

function setTimer(time) {
    timer.innerText = time;
    if (time <= 5)
        timer.style.color = 'red';
    if (time == 0)
        timer.style.color = 'white';
    if (time != 0)
        countdown = setTimeout(setTimer, 1000, time - 1);
    else {
        fail();
    }
}

function startRound() {
    modal.style.display = 'none';
    input.value = '';
    input.style.background = 'white';
    input.focus();
    getRandomParagraph();

}

function success() {
    score++;
    scoreEl = document.getElementById('score').querySelector('span');
    scoreEl.innerText = score;
    clearTimeout(countdown);
    input.style.background = 'lime';
    setTimeout(startRound, 1000);
}

function fail() {
    input.blur();
    modal.style.display = 'flex';
    score = 0;
    scoreEl = document.getElementById('score').querySelector('span');
    scoreEl.innerText = score;
}