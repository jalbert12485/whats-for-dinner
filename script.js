function turnOnModal(e) {
  e.preventDefault();
  $("#myModal").addClass("is-active");
}

function turnOffModal(e) {
  e.preventDefault();
  $("#myModal").removeClass("is-active");
}


$(document).on("click", ".modal-on", turnOnModal);
$(document).on("click", ".modal-off", turnOffModal);

function searchFoodRecipe() {
  var search = "chicken";
  var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + search;

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log(response);
    });

}

function randomMeal() {
  var queryURL = "https://www.themealdb.com/api/json/v1/1/random.php";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log(response.meals[0].strMealThumb);
      $("#food-img").attr("src", response.meals[0].strMealThumb);
    });

}

randomMeal();

function findByDrink() {
  var alch = "drinkName";
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search;
  $.ajax({
    url: queryURL,
    method: "GET",
    accept: "application/JSON",
  }).then(function (response) {
    console.log(response);
  })
}

function randomDrink() {
  var drink = "randomDrinkName";
  var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  $.ajax({
      url: queryURL,
      method: "GET",
      accept: "application/JSON",
    }).then(function () {

        .then(function (response) {
          console.log(response);
          if (window.localStorage) {
            var search = document.getElementById("searchBox");
            search.addEventListener("change", function () {
              localStorage.setItem("searchBox", search.value);
            }, false);
          }
        });
        if (window.localStorage) {
          var search = document.getElementById("searchBox");
          searchBox.value = localStorage.getItem("searchBox");
          search.value = localStorage.setItem("searchBox");
          searchBox.value = sessionStorage.setItem("searchBox");
        }
        // add for() for over-all forcast (data to go into)
        for (var search = i; i > 0; i++);
        var col = $("<div>").addClass("row-md-3");
        var card = $("<div>").addClass("card bg-primary text-white");