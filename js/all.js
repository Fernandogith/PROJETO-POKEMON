"use strict";var cardPokemon=document.querySelectorAll(".js-open-details-pokemon"),btnCloseModal=document.querySelector(".js-close-details-pokemon");function openDatailsPokemon(){document.documentElement.classList.add("open-modal")}function closeDatailsPokemon(){document.documentElement.classList.remove("open-modal")}cardPokemon.forEach(function(e){e.addEventListener("click",openDatailsPokemon)}),btnCloseModal.addEventListener("click",closeDatailsPokemon);