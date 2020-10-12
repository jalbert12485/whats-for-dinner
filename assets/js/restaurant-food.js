// var cityEl = document.getElementById("cityname")
// var submit = document.getElementById("submit")


function findByCategory(){
    var category = $("#category").val()
    console.log(category)
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
        console.log(response)
        var output =""
        if (!response.meals){
            output = "no results found"
        }
        else {
            for (var i = 0; i < response.meals.length; i++) {
                output += "<p>" + response.meals[i].strMeal+ "</p>";
                output += "<p><img src='"+response.meals[i].    strMealThumb + "' width='300'></p>" 
            }
        }
        document.getElementById("result").innerHTML = output
    })
}
$("#submit").on("click", findByCategory)
        // curl -X GET --header "Accept: application/json" --header "user-key: 751583b89913088b443a8dd9ca80a1dc" "https://developers.zomato.com/api/v2.1/cities?q=chicago"