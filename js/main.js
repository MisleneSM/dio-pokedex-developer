const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const limit = 10;
const maxRecords = 151;
let offset = 0;


function loadPokemonItens(offSet, limit) {
  pokeApi.getPokemons(offSet, limit).then((pokemons = []) => {
    // aqui passamos para o parametro de pokemons um array vazio, como se fosse uma variavel qualquer, fazemos assim para reduzir o número de códigos.

   
    const newHtml = pokemons.map(convertPokemonToLi).join("") 
    pokemonList.innerHTML += newHtml;
  })
}

function convertPokemonToLi(pokemon){
  return  `
  <li class="pokemon ${pokemon.type}">
  <span class="number">${pokemon.number}</span>
  <span class="name">${pokemon.name}</span>
  <div class="detail">
      <ol class="types">
          ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join("")}
      </ol>
      <img src= "${pokemon.photo}" alt="${pokemon.name}">
  </div>
</li>
`
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit

  const qtdRecord = offset + limit

  if(qtdRecord >= maxRecords){
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton)
  }else {
    loadPokemonItens(offset, limit);
  }
});



