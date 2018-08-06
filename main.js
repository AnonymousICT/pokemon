const POKEMON_URL = "https://pokeapi.co/api/v2"

function getPokemonData(userInput, callback) {
	//get data from api
	let userSelection = `${POKEMON_URL}/pokemon/${userInput}`;
	try {
		$.getJSON(userSelection, function(data){
			console.log(data)});
	}
	catch(error) {
		console.log('error!');
		console.log(error);
	}
		
	$.getJSON(userSelection, function(data) {
		let typeA = data.types[0].type.name;
		let typeB = '';
		if (data.types.length>1) {
			typeB = data.types[1].type.name;
		};
		$('.results').html(`
			<h1>Pokemon #: ${data.id} ${data.name}</h1>
			<h2>Type(s): </h2><h3>${typeA}<br>${typeB}</h3>
			<img class="sprite" src="pokemon/${data.id}.png">

		`);
		console.log(typeA, typeB);
		getPokemonTypeData(typeA, typeB).then(function(results){
			setTimeout(function(){
				console.log(results, 'please work?')
				$('.typeResults').html(`<ul>`);
				for(let key in results) {
					// console.log(key, results[key]);
					$('.typeResults').append(`
						<li class="${key}">${key}: ${results[key]}</li>
					`);
				};
				$('typeResults').append(`</ul>`);
			},3000);
		});
	});
};

async function getPokemonTypeData(typeA, typeB) {
	let typeMultiplier = {
		normal:1,
	    fire:1,
	    fighting:1,
	    water:1,
	    flying:1,
	    grass:1,
	    poison:1,
	    electric:1,
	    ground:1,
	    psychic:1,
	    rock:1,
	    ice:1,
	    bug:1,
	    dragon:1,
	    ghost:1,
	    dark:1,
	    steel:1,
	    fairy:1
	};

	$.getJSON(`${POKEMON_URL}/type/${typeA}`).done(function(typeAData){
			for(let i=0; i<typeAData.damage_relations.double_damage_from.length; i++) {
				typeMultiplier[typeAData.damage_relations.double_damage_from[i].name]*=2.0;
			}
			for(let j=0; j<typeAData.damage_relations.half_damage_from.length; j++) {
				typeMultiplier[typeAData.damage_relations.half_damage_from[j].name]*=0.5;
			}
			for(let k=0; k<typeAData.damage_relations.no_damage_from.length; k++) {
				typeMultiplier[typeAData.damage_relations.no_damage_from[k].name]*=0.0;
			}
		}
	)
	if (typeB) {
		$.getJSON(`${POKEMON_URL}/type/${typeB}`).done(function(typeBData){
				for(let i=0; i<typeBData.damage_relations.double_damage_from.length; i++) {
				typeMultiplier[typeBData.damage_relations.double_damage_from[i].name]*=2.0;
				}
				for(let j=0; j<typeBData.damage_relations.half_damage_from.length; j++) {
				typeMultiplier[typeBData.damage_relations.half_damage_from[j].name]*=0.5;
				}
				for(let k=0; k<typeBData.damage_relations.no_damage_from.length; k++) {
				typeMultiplier[typeBData.damage_relations.no_damage_from[k].name]*=0.0;
				}
			}
		)
	}
	return new Promise(function(resolve,reject) {
		resolve(typeMultiplier);
	})
};

function userPokemonSelection () {
//submitbutton
$('#form').submit(function(event){
	event.preventDefault();
	let userInput = $('#pokemonName').val().trim().toLowerCase();
	getPokemonData(userInput);
})

//randombutton
$('.randomButton').on('click', function(){
	let userInput = Math.floor(Math.random() * Math.floor(802));
	getPokemonData(userInput);
})
}

function initializeSearchPage () {
userPokemonSelection();
}

$(initializeSearchPage);