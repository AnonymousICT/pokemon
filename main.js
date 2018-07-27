const POKEMON_URL = "https://pokeapi.co/api/v2"
let POKEMONTYPE_ARRAY=[];

function getDataFromApi(pokemon, callback) {
let results = `${POKEMON_URL}/pokemon/${pokemon}`
$.getJSON(results, callback)
}

function getTypeData(array, callback) {
// let typeResults = `${POKEMON_URL}/type/${value.type}`
$.each(array, function( index , value ) {
$.ajax({
    url: 'https://pokemonurl.com',
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: success
});
 
});
}

function renderTypeResults(data){
return `
<div class='resultsType'>
	<ul>
		<li>${data.damage_relations.half_damage_from.name}</li>
	</ul>
</div>
`
}

function displayTypeData(data){
	$('.results').html(renderTypeResults(data));
}

function renderResults(data) {
console.log(data)
let pokemonNumber = `${data.id}`
let pokemonName = `${data.name}`
let pokemonType = ''
$.each(data.types, function( index , value ) {
  pokemonType += `<li>${value.type.name}</li>`
  POKEMONTYPE_ARRAY.push(value.type.name);
  console.log(POKEMONTYPE_ARRAY)
});

return `<div class='resultsName'>${data.id}
	<h1>${data.name}</h1>
	<ul>
		${pokemonType}
	</ul>	
</div>`
}

function displaySearchResults (data) {
	$('.results').html(renderResults(data));
  	getTypeData(POKEMONTYPE_ARRAY, displayTypeData)
}

function listenSubmitButton() {
$('.form').on('submit', function(event){
	event.preventDefault();
	const userInput = $
	(event.currentTarget).find('.userInput').val().toLowerCase()
	console.log(userInput);
	getDataFromApi(userInput, displaySearchResults);
})
}

function listenRandomPokemonButton () {

}

function init() {
	listenSubmitButton()

}

$(init);