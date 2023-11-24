const pokeApi = {};

function converterPokeApi(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    
    const types = pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types - types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(converterPokeApi)
}

pokeApi.getPokemons = (offSet = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;

  return fetch(url)
  .then((response) => response.json()) // transformamos a lista em json
  .then((jsonBody) => jsonBody.results) // pegamos apenas a lista de results
  .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) // percorremos essa lista e buscamos os detalhes dos pokemons
  .then((detailRequests) => Promise.all(detailRequests)) // passamos por todas essas promessas e esperamos que todas elas terminem
  .then((pokemonListDetails) => pokemonListDetails) // retornamos essa lista de detalhes
};
