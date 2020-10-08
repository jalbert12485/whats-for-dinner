// var cityEl = document.getElementById("cityname")
// var submit = document.getElementById("submit")


function findByCity(){
    var city = $("#cityname").val()
    console.log(city)
    // https://developers.zomato.com/api/v2.1/cities?q=chicago
    var queryUrl = `https://developers.zomato.com/api/v2.1/cities?q=${city}`
    $.ajax({
        url: queryUrl,
        method: "GET", 
        accept: "application/json",
        headers: {
            "user-key":"751583b89913088b443a8dd9ca80a1dc",
            "Content-Type":"application/x-www-form-urlencoded"
        }
        
    }).then(function(response){
        console.log(response)
    })
}
$("#submit").on("click", findByCity)
        // curl -X GET --header "Accept: application/json" --header "user-key: 751583b89913088b443a8dd9ca80a1dc" "https://developers.zomato.com/api/v2.1/cities?q=chicago"