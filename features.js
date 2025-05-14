const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let shuffled_cards = [];
let processing = false;
shuffleCards();

shuffled_cards.forEach(card => {
    card.setAttribute('flipped', 'false');
    card.addEventListener('click', () => {
        card.setAttribute('flipped', 'true');
        if (firstCard === null) {
            firstCard = card;
            firstCard.setAttribute('flipped', 'true');
        } else if (secondCard === null && card !== firstCard) {
            secondCard = card;
            processing = true;
            setTimeout(() => {
                matchCard();
                processing = false;
            }, 500);
        }
    });
});

function matchCard() {
    if (firstCard.textContent !== secondCard.textContent) {
        firstCard.setAttribute('flipped', 'false'); 
        secondCard.setAttribute('flipped', 'false'); 
    }   

    firstCard = null;
    secondCard = null;
}

function shuffleCards() {
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = '';
    cards.forEach(card => {
        shuffled_cards.push(card);
    });

    for (let i = shuffled_cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled_cards[i], shuffled_cards[j]] = [shuffled_cards[j], shuffled_cards[i]];
    }

    shuffled_cards.forEach(card => {
        gameContainer.appendChild(card);
    });
    
    return shuffled_cards;
}
