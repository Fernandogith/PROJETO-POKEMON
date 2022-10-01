const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
const btnCloseModal = document.querySelector('.js-close-details-pokemon')

function openDatailsPokemon() {
    document.documentElement.classList.add('open-modal')
}

function closeDatailsPokemon() {
    document.documentElement.classList.remove('open-modal')
}

cardPokemon.forEach(card => {
    card.addEventListener('click', openDatailsPokemon)
})


btnCloseModal.addEventListener('click', closeDatailsPokemon)
