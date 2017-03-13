/**
 * app.js
 * main application script
 * this is included in index.html
 */
"use strict";



var inputElem = document.querySelector("#inputElem");
var searchButton = document.querySelector("#search-button");
var clearButton = document.querySelector("#clear-search-button");

/**
 * renderFish creates and returns a new row(div) element containing
 * column elements for the properties of the
 * `fish` object.
 * @param {Object} fish the fish object
 * @returns {Object} a new, populated div element 
 */
function renderFish(fish) {
	//create row element
	var row = document.createElement("div");
	row.className = "row fish";
	//create column elements for
	//fish props and append them
	//to the row element 
	var col1 = document.createElement("div");
	col1.className = "col-sm-4";
	var image = document.createElement("IMG");
	image.className = "img-responsive fishImage "
	image.src = "images/" + fish.images;
	col1.appendChild(image);
	
	var col2 = document.createElement("div");
	col2.className = "col-sm-8";
	col2.innerHTML = "<h2 class='title'>"+ fish.title + "</h2>" +
			"<p class = 'fishDesc'>" + fish.description + "</p>" +
			"<p class = 'fishDesc'> <b> Caring tip: </b>" + fish.care + "</p>" +
			"<p class='fishProp'> <b> Group: </b>" + fish.group + "<br/>" +
			" <b>Size: </b>" + fish.size + "<br/>"+
			"<b> Family: </b>" + fish.family + "</p>";

	row.appendChild(col1);
	row.appendChild(col2);
	
	return row;
}

/**
 * renderFishes clears the contents of the fishContainer element
 * and then appends one div(row) element for each
 * element in the `fishes` array
 * @param {Object[]} fishes an array of fish objects
 */
function renderFishes(fishes) {
	//clear any existing content within the element
	var fishContainer = document.querySelector(".fishContainer");
	fishContainer.textContent = "";
	//for each element in the fishes array
	for (var idx = 0; idx < fishes.length; idx++) {		
		fishContainer.appendChild(renderFish(fishes[idx]));
	}
}

/**
 * add an event listener for the "click" event on the search button.
 * whenever that occurs, get the input fish name and filter the
 * list of fishes by the name. Also enable the clear filter button.
 */

searchButton.addEventListener("click", function() {
	
	if(inputElem.value.length > 0)
	{
		var inputValue = inputElem.value.toLowerCase();
		var filteredFishes = sortedFishes.filter(function(fish) { 
			var fishTitle = fish.title.toLowerCase();
			return ((fishTitle.indexOf(inputValue))!=-1); })
			renderFishes(filteredFishes);
			clearButton.disabled= false;
	}
	
});
/**
 * add an event listener for the "click" event on the clear button.
 * whenever that occurs, render all the fishes again.
 */
clearButton.addEventListener("click", function() {
	//render all of the fishes
	inputElem.value= "";
	renderFishes(sortedFishes);
	clearButton.disabled= true;
});

//sort the fishes by name
var sortedFishes = FISHES.sort(function(fish1, fish2) {
	if (fish1.title < fish2.title)
	    return -1;
	  if (fish1.title > fish2.title)
	    return 1;
	  return 0;
});
//render all of the fishes
renderFishes(sortedFishes);