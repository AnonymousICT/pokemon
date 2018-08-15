const POKEMON_URL = "https://pokeapi.co/api/v2";

//ajax retrives data based off of the userinput. User input can be either a string or a number
function getPokemonData(userInput, callback){
	let userSelection = `${POKEMON_URL}/pokemon/${userInput}`;
	let typeA;
	let typeB;
	$.ajax({
		type: "GET",
		url: userSelection,
		dataType: "JSON",
		success: function(result) {
			displayPokemonData(result);
		},
		// success: displayPokemonData(result),
		error: function(XMLHttpRequest, textStatus, errorThrown) {
     		alert("Sorry that's an invalid search or the search has timed out.");
     	}
 	})
}

function displayPokemonData (data) {
	typeA = data.types[0].type.name;
	typeB = '';
	if (data.types.length>1) {
		typeB = data.types[1].type.name;
	};
	//this will show the pokemon's "pokedex" number, name and the type(s)
	$('.results').html(`
		<h1>Pokemon #: ${data.id} ${data.name}</h1>
		<h2>Type(s): </h2>
		<h3>${typeA}<br>${typeB}</h3>
		<div class="imgWrapper">
		<img class="sprite" src="assets/pokemon/${data.id}.png" alt=${data.name}>
		</div>
	`);
	
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

	getTypeData(typeA,typeMultiplier);
	if(typeB) {
		getTypeData(typeB,typeMultiplier);
	}

	displayTypeData(typeMultiplier)
}

//gets type data from the API and multiplies the results to the typeMultiplier Object above
function getTypeData(type,typeMultiplier) {
	$.ajax({
		type: "GET",
		url: `${POKEMON_URL}/type/${type}`,
		datatype: "JSON",
		success: function(result) {
			for(let i=0; i<result.damage_relations.double_damage_from.length; i++) {
				typeMultiplier[result.damage_relations.double_damage_from[i].name]*=2.0;
			}
			for(let j=0; j<result.damage_relations.half_damage_from.length; j++) {
				typeMultiplier[result.damage_relations.half_damage_from[j].name]*=0.5;
			}
			for(let k=0; k<result.damage_relations.no_damage_from.length; k++) {
				typeMultiplier[result.damage_relations.no_damage_from[k].name]*=0.0;
			}
		}
	});
}

function displayTypeData(result){
	let typeArr =[]
	setTimeout(function(){
		for(let key in result) {
			typeArr.push("<li><p class='" + key + "'>" + key + ":" + result[key] + "x</p></li>")
		};
		$('.typeResults').html("").append(`<ul class="typeList">${typeArr.join("")}</ul>`
		);
	}
	,1000);
};


function autocomplete () {
	$('#pokemonName').autocomplete({
		minLength: 1,
		source: STORE
	});
}

//this eventually just turned into the place where I have all of my event listeners
function userPokemonSelection () {

	//submitbutton
	$('form').submit(function(event){

		let edgeCases = {
			'deoxys': 'deoxys-normal',
			'wormadam': 'wormadam-plant',
			'giratina': 'giratina-altered',
			'shaymin': 'shaymin-land',
			'basculin': 'basculin-red-striped',
			'darmanitan': 'darmanitan-standard',
			'tornadus': 'tornadus-incarnate',
			'thundurus': 'thundurus-incarnate',
			'landorus': 'landorus-incarnate',
			'keldeo': 'keldeo-ordinary',
			'meloetta': 'meloetta-aria',
			'aegislash': 'aegislash-shield',
			'pumpkaboo': 'pumpkaboo-average',
			'gourgeist': 'gourgeist-average',
			'oricorio': 'oricorio-baile',
			'lycanroc': 'lycanroc-midday',
			'wishiwashi': 'wishiwashi-solo',
			'minior': 'minior-red-meteor',
			'mimikyu': 'mimikyu-disguised'
		}

		event.preventDefault();
		//userInput can be a string or a number
		let userInput = $('#pokemonName').val().trim().toLowerCase();
		if(userInput <=0 || userInput>802) {
			alert("User Input of 0 or greater 802 has been detected")
		} else if (userInput in edgeCases){
			getPokemonData(edgeCases[userInput]);
		} else {
			getPokemonData(userInput);
		}
	})

	//randombutton
	$('.randomButton').on('click', function(){
		//randomly chooses number between 1-802
		let userInput = Math.floor(Math.random() * Math.floor(801))+1;
		getPokemonData(userInput);
	})
	//click on a pokeball
	$('.themeToggle li').click(function() {
	  	$(this).removeClass('selected');
  		$('body').removeClass();
  		$('body').addClass('theme-'+$(this).attr('class'));
	 	$(this).siblings().removeClass('selected');
	 	$(this).addClass('selected');
	})
}

function initializeSearchPage () {
userPokemonSelection();
autocomplete();
}

$(initializeSearchPage);