const POKEMON_URL = "https://pokeapi.co/api/v2"
let POKEMONTYPE_ARRAY=[];

function getPokemonDataFromApi(pokemon, callback) {
	let results = `${POKEMON_URL}/pokemon/${pokemon}`
	$.getJSON(results, callback)
}

function getTypeDataFromApi(type, callback) {
	let results = `${POKEMON_URL}/type/${type}`
	$.getJSON(results,callback)
	console.log(results)
}

function renderResults(data) {
	console.log(data);
	let pokemonNumber = `${data.id}`;
	let pokemonName = `${data.name}`;
	let pokemonType = '';
	$.each(data.types, function( index , value ) {
	  pokemonType += `<li>${value.type.name}</li>`
	  POKEMONTYPE_ARRAY.push(value.type.name);
	  console.log(POKEMONTYPE_ARRAY);
	});

	return `<div class='resultsName'>Pokedex #:${pokemonNumber}
		<h1>Pokemon: ${data.name}</h1>
		Type(s)
		<ul>
			${pokemonType}
		</ul>	
	</div>`;
}

function displaySearchResults (data) {
	$('.results').html(renderResults(data));
	
}


function listenSubmitButton() {
$('.form').on('submit', function(event){
	event.preventDefault();
	const userInput = $
	(event.currentTarget).find('.userInput').val().toLowerCase()
	// console.log(userInput);
	getPokemonDataFromApi(userInput, displaySearchResults);
})
}

function listenRandomPokemonButton () {

}

function init() {
	listenSubmitButton()
	listenRandomPokemonButton()

}

$(init);