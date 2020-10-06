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
