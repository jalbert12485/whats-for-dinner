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

var currentFood;
var currentDrink;


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
          currentFood=response.meals[0];
          displayFoodCard();
      });    
}

//Updated the food card to display the current food item and checks to see if it is a favorited item.
function displayFoodCard(){
  $("#food-img").attr("src",currentFood.strMealThumb); 
  $("#food-thumb").attr("src",currentFood.strMealThumb); 
  $("#food-title").text(currentFood.strMeal);
  $("#food-title").attr("data-number",currentFood.idMeal);
 
  if(isSavedFood()){
    $("#food-heart-empty").attr("style","display: none");
    $("#food-heart-full").attr("style", "display: block");
  } else {
    $("#food-heart-empty").attr("style","display: block");
    $("#food-heart-full").attr("style", "display: none");
  }
}

// Initializes the food card with a random meal.
randomMeal();

// Gets a random drink and displays on the home and the drink pages.
function randomDrink(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {

        currentDrink=response.drinks[0];
        displayDrinkCard();
      });    
}

// Updates drink card to show current drink and checks to see if it is a favorited drink.
function displayDrinkCard(){
  $("#drink-img").attr("src",currentDrink.strDrinkThumb); 
  $("#drink-thumb").attr("src",currentDrink.strDrinkThumb); 
  $("#drink-name").text(currentDrink.strDrink);
  $("#drink-name").attr("data-number",currentDrink.idDrink);
  if(isSavedDrink()){
    $("#drink-heart-empty").attr("style","display: none");
    $("#drink-heart-full").attr("style", "display: block");
  }else{
    $("#drink-heart-empty").attr("style","display: block");
    $("#drink-heart-full").attr("style", "display: none");
  }
}

//Initializes the drink card with a random drink.
randomDrink();

// Allows the user to save a displayed item to their favorites.
$("#save-food").on("click",saveFavoriteFood);
$("#save-drink").on("click",saveFavoriteDrink);

// Gets the id of the displayed food, find the entry in the api and saves all the info into the favorites for later use.
function saveFavoriteFood() {
  var isSaved=false;
  var index=-1;

  for(var i=0; i<favoriteFoods.length; i++){
    if(favoriteFoods[i][0]==currentFood.idMeal){
      isSaved=true;
      index=i;
    }
  }
  if(isSaved){
    favoriteFoods.splice(index,1);
    localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
  }
  if(!(isSaved)){
  favoriteFoods.push([currentFood.idMeal,currentFood.strMeal,currentFood]);
  localStorage.setItem("favoriteFoods",JSON.stringify(favoriteFoods));
  } 
  displayFoodCard();
}

//Used to check if the current food is saved as a favorite.
function isSavedFood(){
  var favoriteID=currentFood.idMeal;

  for(var i=0; i<favoriteFoods.length; i++){
    if(favoriteFoods[i][0]==favoriteID){
      return true;
    }
  }
  return false;
}

//Check is the current drink is saved as a favorite.
function isSavedDrink(){
  var favoriteID=currentDrink.idDrink;

  for(var i=0; i<favoriteDrinks.length; i++){
    if(favoriteDrinks[i][0]==favoriteID){
      return true;
    }
  }
  return false;
}


//  Determine is the current drink is saved, if so, deltes this from favorites.  If not, this will add the drink to favorites.
function saveFavoriteDrink() {
  var isSaved=false;
  var index=-1;

  
  for(var i=0; i<favoriteDrinks.length; i++){
    if(favoriteDrinks[i][0]==currentDrink.idDrink){
      isSaved=true;
      index=i;
    }
  }
  if(isSaved){
    favoriteDrinks.splice(index,1);
    localStorage.setItem("favoriteDrinks",JSON.stringify(favoriteDrinks));
  }
  if(!(isSaved)){
  favoriteDrinks.push([currentDrink.idDrink,currentDrink.strDrink,currentDrink]);
  localStorage.setItem("favoriteDrinks",JSON.stringify(favoriteDrinks));
  }
  displayDrinkCard();
}


// Listens for the veiw favorite buttons to be clicked then runs corresponding functions.
$("#view-fav-food").on("click",viewFavoriteFood);
$("#view-fav-drink").on("click", viewFavoriteDrink);


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
  newText.addClass("column is-four-fifths is-tablet modal-off");
  newText.attr("data-foodli",i);
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
  newText.addClass("column is-four-fifths is-tablet modal-off");
  newText.attr("data-drinkli",i);
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
  var foodli=event.target.dataset.foodli;
  var drinkli=event.target.dataset.drinkli;
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
  if(foodli != null){
    currentFood=favoriteFoods[foodli][2];
    displayFoodCard();
  }
  if(drinkli != null){
    currentDrink=favoriteDrinks[drinkli][2];
    displayDrinkCard();
  }


});

// When the food card is clicked, the food recipe is displayed.
$("#food-card").on("click",".view-recipe",displayFoodRecipe);

// Updates the modal to display the current food recipe.
function displayFoodRecipe(){
  $("#modal-title").empty();
  $("#modal-body").empty();


  var newDivCol=$("<div>");
  newDivCol.addClass("columns is-mobile");


  var newFigDiv=$("<div>");
  newFigDiv.addClass("column is-one-fifth");
  var newFigure=$("<figure>");
  newFigure.addClass("image is-64x64");
  var newImg=$("<img>");
  newImg.attr("src",currentFood.strMealThumb);
  

  newFigure.append(newImg);
  newFigDiv.append(newFigure);
  newDivCol.append(newFigDiv);

  var newTitle=$("<h1>");
  newTitle.text(currentFood.strMeal);
  newTitle.addClass("column");
  newDivCol.append(newTitle);
  

  $("#modal-title").append(newDivCol);

  var ingredients=[];
  var measure=[];
  for(var i=0; i< 20; i++){
    ingredients.push(currentFood[`strIngredient${i}`]);
    measure.push(currentFood[`strMeasure${i}`]);
  }
 
  var newUl=$("<ul>");
  newUl.text("Ingrediants");
  newUl.addClass("columns");

for(var j=0; j < 2; j++){
  var newCol=$("<div>");
  newCol.addClass("column is-mobile");


  for(var i=0; i< 10; i++){ 
    var newLi=$("<li>");
    if(ingredients[10*j+i] != null && ingredients[10*j+i] != ""){
    newLi.text(ingredients[10*j+i] + ": " +measure[10*j+i]);
    newCol.append(newLi);
    }

  }

  newUl.append(newCol);
}

  $("#modal-body").append(newUl);

  var newPara=$("<p>");
  newPara.text(currentFood.strInstructions);
  $("#modal-body").append(newPara);


}

//Listens for the drink card to be clicked and displays the drink recipe.
$("#drink-card").on("click",".view-recipe",displayDrinkRecipe);

//Display the current drink recipe in a modal.
function displayDrinkRecipe(){
  $("#modal-title").empty();
  $("#modal-body").empty();


  var newDivCol=$("<div>");
  newDivCol.addClass("columns is-mobile");


  var newFigDiv=$("<div>");
  newFigDiv.addClass("column is-one-fifth");
  var newFigure=$("<figure>");
  newFigure.addClass("image is-64x64");
  var newImg=$("<img>");
  newImg.attr("src",currentDrink.strDrinkThumb);
  

  newFigure.append(newImg);
  newFigDiv.append(newFigure);
  newDivCol.append(newFigDiv);

  var newTitle=$("<h1>");
  newTitle.text(currentDrink.strDrink);
  newTitle.addClass("column");
  newDivCol.append(newTitle);
  

  $("#modal-title").append(newDivCol);
  
  var ingredients=[];
  var measure=[];
  for(var i=0; i< 20; i++){
    ingredients.push(currentDrink[`strIngredient${i}`]);
    measure.push(currentDrink[`strMeasure${i}`]);
  }

  var newUl=$("<ul>");
  newUl.text("Ingrediants");
  newUl.addClass("columns");

for(var j=0; j < 2; j++){
  var newCol=$("<div>");
  newCol.addClass("column is-mobile");


  for(var i=0; i< 10; i++){ 
    var newLi=$("<li>");
    if(ingredients[10*j+i] != null && ingredients[10*j+i] != ""){
    newLi.text(ingredients[10*j+i] + ": " +measure[10*j+i]);
    newCol.append(newLi);
    }

  }

  newUl.append(newCol);
}

  $("#modal-body").append(newUl);

  var newPara=$("<p>");
  newPara.text(currentDrink.strInstructions);
  $("#modal-body").append(newPara);


}


// Search Bars
$("#name-food-search-submit").on("click",function(e){
  e.preventDefault;  
  searchByFoodName();
});
$("#ingredient-food-search-submit").on("click",function(e){
  e.preventDefault;
  searchByFoodIng();
});
$("#origin-food-search-submit").on("click",function(e){
  e.preventDefault;
  searchByFoodOrigin();
});
$("#name-drink-search-submit").on("click",function(e){
  e.preventDefault;
  searchByDrinkName();
});
$("#ingredient-drink-search-submit").on("click",function(e){
  e.preventDefault;
  searchByDrinkIng();
});

// Searches the api for a food with input name and returns a random result.
function searchByFoodName(){
  var foodName=$("#name-food-search-input").val();
  var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+foodName;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      if (!response.meals){
        $("#name-food-search-input").val("No Results");  
    }else{
      var number=Math.floor(Math.random()*response.meals.length);
      currentFood=response.meals[number];
      displayFoodCard();
    }
    }); 
}

// Searches the api for a food with the input ingredient and returns a random result.
function searchByFoodIng(){
  var foodIng=$("#ingredient-food-search-input").val();
  var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="+foodIng;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      if (!response.meals){
        $("#ingredient-food-search-input").val("No Results");  
    }else{
      var number=Math.floor(Math.random()*response.meals.length);
        currentFood=response.meals[number];
        displayFoodCard();
    }
    }); 
}

// Searches the api for a food from the given origin and returns random result.
function searchByFoodOrigin(){
  var foodOrigin=$("#origin-food-search-input").val();
  var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?a="+foodOrigin;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      if (!response.meals){
        $("#origin-food-search-input").val("No Results");  
    }else{
        var number=Math.floor(Math.random()*response.meals.length);
        currentFood=response.meals[number];
        displayFoodCard();
  }
    }); 
}


//Searches the api for a drink with the input name and returns a random result.
function searchByDrinkName(){
  var drinkName=$("#name-drink-search-input").val();
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+drinkName;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      if (!response.drinks){
        $("#name-drink-search-input").val("No Results");
    }
    else {
      var number=Math.floor(Math.random()*response.drinks.length);
        currentDrink=response.drinks[number];
        displayDrinkCard();
    }
    }); 
}

//Searches the api for a drink with the input ingredient and returns a random result.
function searchByDrinkIng(){
  var drinkIng=$("#ingredient-drink-search-input").val();
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i="+drinkIng;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      if (!response.drinks){
        $("#ingredient-drink-search-input").val("No Results");
    }
    else {
      var number=Math.floor(Math.random()*response.drinks.length);
        currentDrink=response.drinks[number];
        displayDrinkCard();
    }
    }); 
}

// Listens for arrow, then displays a new random drink or meal.
$("#drink-arrow").on("click",randomDrink);
$("#food-arrow").on("click",randomMeal);


//Searches the api for a clicked category, then returns all results.
function findByCategory(category){
  // https://developers.zomato.com/api/v2.1/cities?q=chicago
  var queryUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  $.ajax({
      url: queryUrl,
      method: "GET", 
      accept: "application/json"
      // headers: {
      //     "user-key":"751583b89913088b443a8dd9ca80a1dc",
      //     "Content-Type":"application/x-www-form-urlencoded"
      // }

  }).then(function(response){
 
     
      if (!response.meals){
          $("#response").html("<h2> No results found </h2>")
      }
      else {
        $("#result").empty();
        var newIntro=$("<h2>");
        newIntro.text("Category Results Below");
        var newPara=$("<h2>");
        newPara.text("Click on picture to see full card.");
        newPara.addClass("mb-4");
        $("#result").append(newIntro);
        $("#result").append(newPara);

      
        for(var j=0; j< Math.floor((response.meals.length)/4); j++){
            var newRow=$("<div>");
            newRow.addClass("columns is-tablet");
          for (var i = 0; i < 4; i++) {
            var newCol=$("<div>");
            newCol.addClass("column border");
            var newCard=$("<div>");
            newCard.addClass("card food-click m-1");
            newCard.attr("data-number",response.meals[4*j+i].idMeal);
            var newFigure=$("<figure>");
            newFigure.addClass("image");
            var newImg=$("<img>");
            newImg.attr("src",response.meals[4*j+i].strMealThumb);

            newFigure.append(newImg);
            newCard.append(newFigure);
          
            var newTitle=$("<p>");
            newTitle.text(response.meals[4*j+i].strMeal);
            newTitle.addClass("title is-5");

            newCard.append(newTitle);
            newRow.append(newCard);
          }
        $("#result").append(newRow); }
    }
  })
}
$("#food-category").on("click",".food-cat", function(){ 
  var category=this.dataset.cat;
 findByCategory(category);
});

$("#result").on("click",".food-click", function(){
  $(window).scrollTop(0);
  var currentFoodId=JSON.parse(this.dataset.number);
  var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+currentFoodId;


  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      currentFood=response.meals[0];
      displayFoodCard();
    }); 
  
});


      // curl -X GET --header "Accept: application/json" --header "user-key: 751583b89913088b443a8dd9ca80a1dc" "https://developers.zomato.com/api/v2.1/cities?q=chicago" 
   