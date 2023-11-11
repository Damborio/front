const cards = document.querySelectorAll('.card');
const gameBoard = document.querySelector('.game-board');
let hasFlippedCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = e => {
    if (boardLocked) return;

    const target = e.target.parentElement;

    if (target === firstCard) return;
    
    target.classList.add("flip");

    if (!hasFlippedCard) {
        // First click

        hasFlippedCard = true
        firstCard = target;
    } else {
        // Second click

        hasFlippedCard = false
        secondCard = target

        // Check for math
        checkForMatch();
    }
};

const checkForMatch = () => {

    const isEqual = firstCard.dataset.framework === secondCard.dataset.framework
    isEqual ? disableCards() : unflipCards();
};

const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

const unflipCards = () => {
    boardLocked = true;

        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");

            resetBoard()
        }, 1000);
}

const resetBoard = () => {
    // To heavy 
    [hasFlippedCard, boardLocked] = [false, false];
    [firstCard, secondCard] = [null, null]
};

cards.forEach(card => {
    card.addEventListener("click", flipCard);

    const randomIndex = Math.floor(Math.random() * 40);
    card.style.order = randomIndex;
});

cards.forEach(card => card.addEventListener('click', () => {
    const openCards = document.querySelectorAll('.flip').length;
    if (openCards === cards.length) window.location.href = 'results.html';
}));


// function flipCard() {
//     if (lockBoard) return;
//     if (this === firstCard) return;

//     this.classList.add('flipped');

//     if (!hasFlippedCard) {
//         hasFlippedCard = true;
//         firstCard = this;
//         return;
//     }

//     secondCard = this;
//     checkForMatch();
// }



// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);
//     resetBoard();
// }

// function resetBoard() {
//     [hasFlippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }

// function shuffleCards() {
//     cards.forEach(card => {
//         const randomPos = Math.floor(Math.random() * 24);
//         card.style.order = randomPos;
//     });
// }

// shuffleCards();

