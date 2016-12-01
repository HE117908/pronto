function hide(x){
     var divsToHide = document.getElementsByClassName("hiding"); //divsToHide is an array
     for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none";
    }
    document.getElementById(x).style.display = "";
}