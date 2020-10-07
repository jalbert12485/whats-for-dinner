function turnOnModal(e){
    e.preventDefault();
    $("#myModal").addClass("is-active");
}

function turnOffModal(e){
    e.preventDefault();
    $("#myModal").removeClass("is-active");
}


$(document).on("click",".modal-on",turnOnModal);
$(document).on("click",".modal-off",turnOffModal);

function searchFoodRecipe(){
    var search="chicken";
    var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+search;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
          console.log(response);
      });
}



function randomMeal(){
    var queryURL = "https://www.themealdb.com/api/json/v1/1/random.php";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response.meals[0]);
          $("#food-img").attr("src",response.meals[0].strMealThumb); 
          $("#food-thumb").attr("src",response.meals[0].strMealThumb); 
          $("#food-title").text(response.meals[0].strMeal);
        //   $("#food-content").text(response.meals[0].strInstructions);
      });    
}

randomMeal();

function randomDrink(){
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response.drinks[0].strDrinkThumb);
        $("#drink-img").attr("src",response.drinks[0].strDrinkThumb); 
        $("#drink-thumb").attr("src",response.drinks[0].strDrinkThumb); 
        $("#drink-name").text(response.drinks[0].strDrink);
        //   $("#food-content").text(response.meals[0].strInstructions);
      });    
}

randomDrink();