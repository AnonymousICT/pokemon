const POKEMON_URL = "https://pokeapi.co/api/v2"
let POKEMONTYPE_ARRAY=[];

function getDataFromApi(pokemon, callback) {
let results = `${POKEMON_URL}/pokemon/${pokemon}`
$.getJSON(results, callback)
}

function getTypeData(array, callback) {
	console.log('yes I crossDomain');
// let typeResults = `${POKEMON_URL}/type/${value.type}`
	$.each(array, function( index , value ) {
		console.log(value);
		console.log(`${POKEMON_URL}/type/${value}`)
		$.ajax({
		    url: `${POKEMON_URL}/type/${value}`,
		    type: 'GET',
		    crossDomain: true,
		    success: callback
		}); 
	});
}

function renderTypeResults(data){
// console.log('test');
	let damageArray = [];
	$.each(data.damage_relations , function(index , value) {
		$.each(value, function(index , damageObject) {
			// console.log(damageObject)
			damageArray.push("<li>"+index+"</li>")
			damageArray.push("<li>"+damageObject.name+"</li>")
		} )
	})
	let halfDamageArray=[];
	console.log("APPLES");
	console.log(halfDamageArray);
	$.each(data.damage_relations.half_damage_from, function(index, halfDamage){
		// halfDamageArray.push("<h2>"+halfDamage.name+"</h2>");
		console.log('BANANA');
		console.log(halfDamageArray);
	})
return `
<div class='resultsType'>
	<p> this works</p>
	${halfDamageArray.join()};
	<ul>
		${damageArray.join()};
	</ul>
</div>
`
}

function displayTypeData(data){
	console.log(data);
	console.log(data.damage_relations);
	console.log ("THIS IS ALL WE WANTED WE DO, DAMMIT");
	for (let i=0; i<data.damage_relations.double_damage_from.length; i++) {
		console.log(i, data.damage_relations.double_damage_from[i].name);
	}
	$('.typeResults').html(renderTypeResults(data));
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

return `<div class='resultsName'>${data.id}
	<h1>${data.name}</h1>
	<ul>
		${pokemonType}
	</ul>	
</div>`
}

function displaySearchResults (data) {
	$('.results').html(renderResults(data));
	// console.log('SEE IT?!')
  	getTypeData(POKEMONTYPE_ARRAY, displayTypeData)
}

function listenSubmitButton() {
$('.form').on('submit', function(event){
	event.preventDefault();
	const userInput = $
	(event.currentTarget).find('.userInput').val().toLowerCase()
	// console.log(userInput);
	getDataFromApi(userInput, displaySearchResults);
})
}

function listenRandomPokemonButton () {
$('randomButton').click(function(){
	let pokemonNumber = Math.floor(Math.random() * Math.floor(802));
	renderResults();
})
}

function init() {
	listenSubmitButton()
	listenRandomPokemonButton()

}

$(init);