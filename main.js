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
			if (data.damage_relations.no_damage_from!==[]) {
				zeroArr.push(data.damage_relations.no_damage_from);
			} 
				doubleArr.push(data.damage_relations.double_damage_from);
				halfArr.push(data.damage_relations.half_damage_from);
		});
	}
	let damageRelations = []
		damageRelations = [doubleArr,halfArr,zeroArr];
	return damageRelations;
}

// function displayTypeResults(data) {
// 	$.each(data, function(index, value){
// 		console.log(value)		
// 	})
// }

function displaySearchResults (data) {
	console.log(data);
	let pokemonNumber = `${data.id}`;
	let pokemonName = `${data.name}`;
	let pokemonType = '';
	$.each(data.types, function( index , value ) {
	  pokemonType += `<h3>${value.type.name}
	  <ul class='${value.type.name}'></ul></h3>`
	  POKEMONTYPE_ARRAY.push(value.type.name);
	  console.log(POKEMONTYPE_ARRAY);
	});
	//the 2nd call to the API
	typeData = getTypeDataFromApi(POKEMONTYPE_ARRAY);
	console.log('this is the typeData object!',typeData);
	$.each(POKEMONTYPE_ARRAY, function(index, value){
		console.log(value)
		// displayTypeResults(value);
		// $(`.${value}`).html(`<li>${typeData[index]}</li>`)
	})
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
		 
	// for (let key in typeData) {
	// 	// console.log(key);
	// 	// console.log(typeData[key]);
	// 	// console.log(typeData['double']);
	// 	// for (let i=0; i<typeData[key].length; i++) {
	// 	// 	console.log(i, typeData[key][i]);
	// 	// 	for (let j=0; i<typeData[key][i].length; j++) {
	// 	// 		console.log(i, j);
	// 	// 	}
	// 	// }
	// }
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