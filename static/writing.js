const textarea = document.getElementById('writing-area');
const timerDisplay = document.getElementById('timer');
const wordCountDisplay = document.getElementById('word-count');

let timeLeft = 120; // 2 minutes in seconds
let timer;
let lastTypedTime;
let hasStartedTyping = false;

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishWriting();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateWordCount() {
    const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
    wordCountDisplay.textContent = `${words} word${words !== 1 ? 's' : ''}`;
}

function checkPause() {
    if (hasStartedTyping && Date.now() - lastTypedTime > 10000) { // 10 seconds
        textarea.value = '';
        updateWordCount();
    }
}

textarea.addEventListener('input', () => {
    if (!hasStartedTyping) {
        hasStartedTyping = true;
        startTimer();
    }
    lastTypedTime = Date.now();
    updateWordCount();
});

function finishWriting() {
    sessionStorage.setItem('writtenText', textarea.value);
    window.location.href = '/result';
}

lastTypedTime = Date.now();
setInterval(checkPause, 1000); // Check for pauses every second