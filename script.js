// Variable to enable saving of favorite foods
var favoriteFoods=JSON.parse(localStorage.getItem("favoriteFoods"));
if(favoriteFoods===null){
  favoriteFoods=[];
  localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
}



// Function to turn on modal which will display recipes
function turnOnModal(e){
    e.preventDefault();
    $("#my-modal").addClass("is-active");
}

// Function to turn off modal and return to normal view.
function turnOffModal(e){
    e.preventDefault();
    $("#my-modal").removeClass("is-active");
}

// Turns on modal when a modal-on item is clicked and turns off modal when a modal-off button is clicked.
$(document).on("click",".modal-on",turnOnModal);
$(document).on("click",".modal-off",turnOffModal);

// A food search function for reference
// function searchFoodRecipe(){
//     var search="chicken";
//     var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+search;

//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       .then(function(response) {
//           console.log(response);
//       });
// }


// Pulls a random meal and displays on the meal card in the home page and on the food page.
function randomMeal(){
    var queryURL = "https://www.themealdb.com/api/json/v1/1/random.php";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          $("#food-img").attr("src",response.meals[0].strMealThumb); 
          $("#food-thumb").attr("src",response.meals[0].strMealThumb); 
          $("#food-title").text(response.meals[0].strMeal);
          $("#food-title").attr("data-number",response.meals[0].idMeal);

      });    
}

randomMeal();

// Gets a random drink and displays on the home and the drink pages.
function randomDrink(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        $("#drink-img").attr("src",response.drinks[0].strDrinkThumb); 
        $("#drink-thumb").attr("src",response.drinks[0].strDrinkThumb); 
        $("#drink-name").text(response.drinks[0].strDrink);
      });    
}

randomDrink();

// Allows the user to save a displayed item to their favorites.
$("#save-food").on("click",saveFavoriteFood);


// Gets the id of the displayed food, find the entry in the api and saves all the info into the favorites for later use.
function saveFavoriteFood(option) {
  var favoriteID=Number($("#food-title").data("number"));
  var favoriteName=$("#food-title").text();
  var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+favoriteID;
  var isSaved=false;
  for(var i=0; i<favoriteFoods.length; i++){
    if(favoriteFoods[i][0]==favoriteID){
      isSaved=true;
    }
  }

  if(!(isSaved)){
  favoriteFoods.push([favoriteID,favoriteName]);
  localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
  }
}

$("#view-fav-food").on("click", viewFavoriteFood);

function viewFavoriteFood(){
  $("#modal-title").text("Favorite Food Recipes");
  $("#modal-body").empty();

  var newUl=$("<ul>");

  for(var i=0; i< favoriteFoods.length; i++){
  var newLi=$("<li>");
  newLi.addClass("columns is-vcentered")
  var newText=$("<j3>");
  newText.text(favoriteFoods[i][1]);
  newText.addClass("column is-four-fifths is-tablet");
  var removeButton=$("<button>");
  removeButton.text("Remove");
  removeButton.addClass("column is-one-fifth is-tablet");
  removeButton.attr("data-remove",i);
  newLi.append(newText);
  newLi.append(removeButton);
  newUl.append(newLi);
  }

  $("#modal-body").append(newUl);
}

$("#my-modal").on("click",function (event){
  var removeInd=event.target.dataset.remove;
  if(removeInd != null)
  {
    favoriteFoods.splice(removeInd,1);
    localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
    viewFavoriteFood();
  }


});
    
