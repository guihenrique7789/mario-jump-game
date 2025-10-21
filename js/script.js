const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const jumpSound = new Audio('./sounds/mario-bros-jump.mp3');
const backgroundMusic = new Audio('./sounds/supermarioworldmusic.mp3');

backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

let musicStarted = false;
let score = 0;
let scoreInterval;
const scoreElement = document.querySelector('.score');

// Função para atualizar a pontuação - AGORA COM 6 DÍGITOS
const updateScore = () => {
    score++;
    scoreElement.textContent = String(score).padStart(6, '0'); // 6 zeros agora
}

// Função para iniciar a pontuação
const startScore = () => {
    if (!scoreInterval) {
        scoreInterval = setInterval(updateScore, 100);
    }
}


const stopScore = () => {
    clearInterval(scoreInterval);
    scoreInterval = null;
}

const startBackgroundMusic = () => {
    if (!musicStarted) {
        backgroundMusic.play().catch(e => {
            console.log('Clique ou pressione qualquer tecla para iniciar a música');
        });
        musicStarted = true;
    }
}

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        mario.src = './images/Spin.gif';
        mario.style.width = '110px';
        mario.style.height = '110px';
        mario.style.marginLeft = '15px';
        
        jumpSound.currentTime = 0;
        jumpSound.play().catch(e => console.log('Erro ao tocar som do pulo'));
        
        setTimeout(() => {
            mario.classList.remove('jump');
            mario.src = './images/mario.gif';
            mario.style.width = '130px';
            mario.style.height = 'auto';
            mario.style.marginLeft = '0px';
        }, 500);
    }
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 130) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
        stopScore();
        
        backgroundMusic.pause();
        
        setTimeout(() => {
            if(confirm(`Game Over! Pontuação: ${String(score).padStart(6, '0')}\nPressione OK para reiniciar.`)) {
                location.reload();
            }
        }, 500);
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        jump();
    }
    startBackgroundMusic();
    startScore();
});

document.addEventListener('click', () => {
    jump();
    startBackgroundMusic();
    startScore();
});

document.addEventListener('touchstart', () => {
    startBackgroundMusic();
    startScore();
});