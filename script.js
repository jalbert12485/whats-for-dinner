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

//We will remove this later

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