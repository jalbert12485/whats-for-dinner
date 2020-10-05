


$("#drinkCard").on("click",function(e){
    e.preventDefault();
    $("#myModal").addClass("is-active");

});

$("#drinkImg").on("click",function(e){
    e.preventDefault();
    $("#myModal").addClass("is-active");

});

$("#foodCard").on("click",function(e){
    e.preventDefault();
    $("#myModal").addClass("is-active");

});

$("#foodImg").on("click",function(e){
    e.preventDefault();
    $("#myModal").addClass("is-active");

});

$("#modalx").on("click",function(e){
    e.preventDefault();
    $('#myModal').removeClass("is-active");
})

$("#modalCancel").on("click",function(e){
    e.preventDefault();
    $('#myModal').removeClass("is-active");
})