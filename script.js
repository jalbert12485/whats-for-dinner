// Variable to enable saving of favorite foods
var favoriteFoods=JSON.parse(localStorage.getItem("favoriteFoods"));
if(favoriteFoods===null){
  favoriteFoods=[];
  localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
}

// Variable to enable saving of favorite foods
var favoriteDrinks=JSON.parse(localStorage.getItem("favoriteDrinks"));
if(favoriteDrinks===null){
  favoriteDrinks=[];
  localStorage.setItem("favoriteDrinks",JSON.stringify(favoriteDrinks));
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
        $("#drink-name").attr("data-number",response.drinks[0].idDrink);
      });    
}

randomDrink();

// Allows the user to save a displayed item to their favorites.
$("#save-food").on("click",saveFavoriteFood);
$("#save-drink").on("click",saveFavoriteDrink);

// Gets the id of the displayed food, find the entry in the api and saves all the info into the favorites for later use.
function saveFavoriteFood() {
  var favoriteID=Number($("#food-title").data("number"));
  var favoriteName=$("#food-title").text();
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

function saveFavoriteDrink() {
  var favoriteID=Number($("#drink-name").data("number"));
  var favoriteName=$("#drink-name").text();
  var isSaved=false;
  for(var i=0; i<favoriteDrinks.length; i++){
    if(favoriteDrinks[i][0]==favoriteID){
      isSaved=true;
    }
  }

  if(!(isSaved)){
  favoriteDrinks.push([favoriteID,favoriteName]);
  localStorage.setItem("favoriteDrinks",JSON.stringify(favoriteDrinks));
  }
}



$("#view-fav-food").on("click", viewFavoriteFood);
$("#view-fav-drink").on("click", viewFavoriteDrink);

// $("#view-fav-drink").on("click", viewFavoriteDrink);
//Opens the modal and displayed your saved favorite recipes.
function viewFavoriteFood(){
  $("#modal-title").text("Favorite Food Recipes");
  $("#modal-body").empty();

  var newUl=$("<ul>");

  for(var i=0; i< favoriteFoods.length; i++){
  var newLi=$("<li>");
  newLi.addClass("columns is-vcentered")
  var newText=$("<h3>");
  newText.text(favoriteFoods[i][1]);
  newText.addClass("column is-four-fifths is-tablet");
  var removeButton=$("<button>");
  removeButton.text("Remove");
  removeButton.addClass("column is-one-fifth is-tablet");
  removeButton.attr("data-removefood",i);
  newLi.append(newText);
  newLi.append(removeButton);
  newUl.append(newLi);
  }

  $("#modal-body").append(newUl);
}

function viewFavoriteDrink(){
  $("#modal-title").text("Favorite Drink Recipes");
  $("#modal-body").empty();

  var newUl=$("<ul>");

  for(var i=0; i< favoriteDrinks.length; i++){
  var newLi=$("<li>");
  newLi.addClass("columns is-vcentered")
  var newText=$("<h3>");
  newText.text(favoriteDrinks[i][1]);
  newText.addClass("column is-four-fifths is-tablet");
  var removeButton=$("<button>");
  removeButton.text("Remove");
  removeButton.addClass("column is-one-fifth is-tablet");
  removeButton.attr("data-removedrink",i);
  newLi.append(newText);
  newLi.append(removeButton);
  newUl.append(newLi);
  }

  $("#modal-body").append(newUl);
}

//In the modal containing favorite recipes, allows the remove button to remove items from your favorites.
$("#my-modal").on("click",function (event){
  var removeIndFood=event.target.dataset.removefood;
  var removeIndDrink=event.target.dataset.removedrink;
  console.log(removeIndDrink);
  if(removeIndFood != null){
    favoriteFoods.splice(removeIndFood,1);
    localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
    viewFavoriteFood();
  }
  if(removeIndDrink != null){
    favoriteDrinks.splice(removeIndDrink,1);
    localStorage.setItem("favoriteDrinks",JSON.stringify(favoriteDrinks));
    viewFavoriteDrink();
  }


});
    
