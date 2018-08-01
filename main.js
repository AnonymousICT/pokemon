const POKEMON_URL = "https://pokeapi.co/api/v2"
let POKEMONTYPE_ARRAY=[];

function getPokemonDataFromApi(pokemon, callback) {
	let results = `${POKEMON_URL}/pokemon/${pokemon}`
	$.getJSON(results, callback)
}

function getTypeDataFromApi(type) {
	for(i=0; i<type.length; i++) {
		let results = `${POKEMON_URL}/type/${type[i]}`
		$.getJSON(results, function(data){
			console.log(data.damage_relations.double_damage_from, 'double');
			// console.log(data.damage_relations.half_damage_from, 'half');
			// console.log(data.damage_relations.no_damage_from, 'no');

		});	
	}

}

function displaySearchResults (data) {
	console.log(data);
	let pokemonNumber = `${data.id}`;
	let pokemonName = `${data.name}`;
	let pokemonType = '';
	$.each(data.types, function( index , value ) {
	  pokemonType += `<li>${value.type.name}</li>`
	  POKEMONTYPE_ARRAY.push(value.type.name);
	  console.log(POKEMONTYPE_ARRAY);
	});
	  typeData = getTypeDataFromApi(POKEMONTYPE_ARRAY);
	//html markup and then your head explode stop reading this because it's fine. Breath. love Howard
	let str= `<div class='resultsName'>Pokedex #:${pokemonNumber}
		<h1>Pokemon: ${data.name}</h1>
		Type(s)
		<ul>
			${pokemonType}
		</ul>	
	</div>`;
	$('.results').html(str);
	
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