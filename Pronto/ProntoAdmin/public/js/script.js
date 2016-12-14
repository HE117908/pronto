function hide(x){
     var divsToHide = document.getElementsByClassName("hiding"); //divsToHide is an array
     for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none";
    }
    document.getElementById(x).style.display = "";
}

function addUser(){
    var user = $('#username').val();
    var pwd = $('#pwd').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/add_user",
       data: {username: user, pwd: pwd},
       success: function(data){
            if(data==='done')
              {
                console.log("request successful");
              }
              getUsers();
          }
    });
}

function getUsers(){
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/get_users",
       datatype: "json"
    }).done(function(result){
       var x = result.length;
       data = "<ul>";
       for(i=0; i<x; i++){
           data += "<li>"+result[i].IdServeur+"</li>";
       }
       data += "</ul>";
       $("#userList").html(data);
       });
}

function remUser(){
    var user = $('#userRemove').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/remove_user",
       data: {username: user},
       success: function(data){
            if(data==='done')
              {
                console.log("request successful");
              }
              getUsers();
          }
    });    
}

function addPlat(){
    var plat = $('#plate').val();
    var prix = $('#price').val();
    var cat = $('#catPlat').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/add_plat",
       data: {plat: plat, prix: prix, cat: cat},
       success: function(data){
            if(data==='done')
              {
                $('#result').html("Effectué avec succès");
              }
          }
    });   
}

function addAccomp(){
    var accomp = $('#accomp').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/add_accomp",
       data: {accomp: accomp},
       success: function(data){
            if(data==='done')
              {
                $('#result').html("Effectué avec succès");
              }
          }
    });    
}

function addSupp(){
    var supp = $('#supp').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/add_supp",
       data: {supp: supp},
       success: function(data){
            if(data==='done')
              {
                $('#result').html("Effectué avec succès");
              }
          }
    });    
}
function addBoisson(){
    var boisson = $('#boisson').val();
    var prix = $('#priceBoisson').val();
    var cat = $('#catBoisson').val();
    $.ajax({
       type: "POST",
       url: "http://localhost:3100/add_boisson",
       data: {boisson: boisson, prix: prix, cat: cat},
       success: function(data){
            if(data==='done')
              {
                $('#result').html("Effectué avec succès");
              }
          }
    });   
}