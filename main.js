const POKEMON_URL = "https://pokeapi.co/api/v2"
let POKEMONTYPE_ARRAY=[];

function getPokemonDataFromApi(pokemon, callback) {
	let results = `${POKEMON_URL}/pokemon/${pokemon}`
	$.getJSON(results, callback)
}

function getTypeDataFromApi(type) {
	let doubleArr = [];
	let halfArr = [];
	let zeroArr = [];
	for(i=0; i<type.length; i++) {
		let results = `${POKEMON_URL}/type/${type[i]}`
		$.getJSON(results, function(data){
			doubleArr.push(data.damage_relations.double_damage_from);
			halfArr.push(data.damage_relations.half_damage_from);
			zeroArr.push(data.damage_relations.no_damage_from);
		});
	}
	return {
		'double':doubleArr,
		'half':halfArr,
		'zero':zeroArr
	};
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
	console.log('this is the typeData object!',typeData);
	//html markup and then your head explode stop reading this because it's fine. Breath. love Howard
	let str= `<div class='resultsName'>Pokedex #:${pokemonNumber}
		<h1>Pokemon: ${data.name}</h1>
		Type(s)
		<ul>
			${pokemonType}
		</ul>	
		<ul>`;
		 // for (let key in typeData){
		 // 	console.log(key, typeData[key]);
		 // 	for(let i=0; i<typeData[key].length; i++){
		 // 		// console.log(key,i);
		 // 		console.log('bananananana');
			// 	// console.log(key, i, typeData[key][i]);	 	
		 // 	}
		 
	for (var key in typeData) {
		console.log(key);
		console.log(typeData[key]);
		console.log(typeData['double']);
		// for (let i=0; i<typeData[key].length; i++) {
			// console.log(i, typeData[key][i]);
			// for (let j=0; i<typeData[key][i].length; j++) {
				// console.log(i, j);
			// }
		// }
	}
		str +=`</ul>
	</div>`
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