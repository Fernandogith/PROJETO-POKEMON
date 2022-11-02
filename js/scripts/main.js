// VARIAVEIS E CONSTANTES GLOBAIS

    const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');

    const btnCloseModal = document.querySelector('.js-close-details-pokemon');

    // Caminha junto com a função createCardPokemon de baixo, busca a area/local no HTML onde vamos adicionar os elementos criados
    const areaPokemons = document.getElementById('js-list-pokemons');




// FUNCIONALIDADES SOLTAS
    // Script do slide principal
    var slide_hero = new Swiper(".slide-hero", {
        effect: 'fade',
    pagination: {
        el: ".slide-hero .main-area .area-explore .swiper-pagination",
    },
    });

    cardPokemon.forEach(card => {
        card.addEventListener('click', openDatailsPokemon)
    })

    btnCloseModal.addEventListener('click', closeDatailsPokemon)




// FUNÇÕES

    function openDatailsPokemon() {
        document.documentElement.classList.add('open-modal')
    }

    function closeDatailsPokemon() {
        document.documentElement.classList.remove('open-modal')
    }

    function createCardPokemon(code, type, nome, imagePok ) {
        
        // --- CRIADA DIV CHAMADA BUTTON E ADICIONADA A DIV AREAPOKEMONS
        // Cria elemtno no html com ID chamado button
        let card = document.createElement('button');
        // Adiciona classes ao elemento criado
        card.classList = `card-pokemon js-open-details-pokemon ${type}`
        // Adiciona elemento criado ao HTML
        areaPokemons.appendChild(card);


        // --- CRIADA DIV E ADICIONADA DENTRO DA DIV BUTTON
        // Criação do elemento
        let image = document.createElement('div')
        // Adiciona classe ao elemento criado
        image.classList = 'image'
        // Adiciona o elemento ao HTML
        card.appendChild(image)

        // -- CRIADA DIV CHAMADA IMG COM ATRIBUTO SRC RECEBENDO O CAMINHO DA IMAGEM, E ADICIONADA DENTRO DA DIV IMAGE
        // Criação do elemento img
        let imageSrc = document.createElement('img');
        // Adiciona classe ao elemento criado
        imageSrc.classList = 'thumb-img'
        // Adicionando atributo src e caminho da imagem ao elemento criado
        imageSrc.setAttribute('src', imagePok);
        // Adiciona elemento ao HTML
        image.appendChild(imageSrc);

        // Cria div dentro para receber informações dentro do card
        let infoCardPokemon = document.createElement('div');
        // Adiciona classe info ao elemento
        infoCardPokemon.classList = 'info'
        // Adiciona elemento (essa div) ao HTML
        card.appendChild(infoCardPokemon)

        // Cria div dentro da div info para receber o text (dentro de card ainda)
        let infoTextPokemon = document.createElement('div');
        // Adiciona classe text ao elemento
        infoTextPokemon.classList = 'text'
        // Adiciona elemento (essa div text) ao HTML, dentro de card, dentro da div info
        infoCardPokemon.appendChild(infoTextPokemon)




    }

    // Função chamada ao carregar a pagina, esperando url da API
    function listingPokemons(urlApi) {
        // Utilizado o Axios para buscar na API os primeiros 9 pokemons
        axios({
            method: 'GET',
            url: urlApi,
        })
        // Tendo a resposta
        .then((response) => {
            // Pega o elemento no HTMl criado para receber a contagem de pokemons
            const countPokemons = document.getElementById('js-count-pokemons')
            // Pega as informações entre chaves do response.data da API
            const { results, next, count } = response.data;

            // Adiciona no espaço de texto da div o count vindo da API
            countPokemons.innerText = count;

            // Para cada registro no results, faz o trecho de codigo
            results.forEach(pokemon => {
                // Na API vem a URL com os detalhes do pokemon (codigo, nome, imagem...), passado essa URL para dentro de urlApiDetails
                let  urlApiDetails = pokemon.url;
            
                // Feita nova requisição com o Axios, agora para pegar estes detalhes, ou seja, para cada pokemon, fazemos a primeira requisição para trazer os 9 primeiros e mais essa para pegar os detalhes
                axios({
                    method: 'GET',
                    url: `${urlApiDetails}`,
                })
                // Tendo a resposta
                .then(response => {
                    // Pega do response.data name, id, sprites, type
                    const {name, id, sprites, types } = response.data

                    // Organizando o retorno da API em um objeto, lembrando que para cada volta é feito isso, sendo assim, criará um objeto a cada volta
                    const infoCard = {
                        nome: name,
                        code: id,
                        image: sprites.other.dream_world.front_default,
                        type: types[0].type.name
                    }

                    // Tendo o objeto organizado com as informações de cada pokemon a cada volta, chamamos a função que criará o card no HTML, passando as informações para adicionar ao card (codigo, nome, tipo, imagem)
                    createCardPokemon(infoCard.code, infoCard.type, infoCard.nome, infoCard.image) 
                })
            })
        })
    }




// FUNÇÕES CHAMADAS AO CARREGAR A PAGINA
    // Função chamada ao carregar a pagina, para carregar os primeiros 9 Pokemons
    listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0')
