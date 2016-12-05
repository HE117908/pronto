/**
 * Created by francois on 06/11/2016.
 */

//-----------------------------------------------------------------------------------------------------------//
//partie cuisine

function afficherPlats(c){
    var ligne;
    var j = 0;
    var elem = Object.keys(c.commande.plats);
    for (var i in elem) {
        j++;
        i = elem[i];
        ligne = '<tr id="row'
        ligne += elem
        ligne += j
        ligne += '"'
        ligne += '" >';
        ligne += '<td>' + '<input onclick="change(this.name)" type="checkbox" name="row'
        ligne += elem
        ligne += j
        ligne += '"'
        ligne += ' >' + '</td>'
        ligne += '<td>' + c.idTable + '</td>';
        ligne += '<td>' + c.commande.plats[i].Quantite + '</td>';
        ligne += '<td>' + c.commande.plats[i].Nom + '</td>';
        ligne += '<td>' + c.commande.plats[i].Detail + '</td>';
        ligne += '<td>' + c.commande.plats[i].Accompagnements + '</td>';
        ligne += '<td>' + c.commande.plats[i].Supplements + '</td>';
        ligne += '</tr>';
        addElem('tableau', ligne);
    }
}

function afficherBoissons(b){
    var ligne;
    var j = 0;
    var elem = Object.keys(b.commande.boissons);
    for (var i in elem) {
        j++;
        i = elem[i];
        ligne = '<tr id="row'
        ligne += elem
        ligne += j
        ligne += '"'
        ligne += '" >';
        ligne += '<td>' + '<input onclick="change(this.name)" type="checkbox" name="row'
        ligne += elem
        ligne += j
        ligne += '"'
        ligne += ' >' + '</td>'
        ligne += '<td>' + b.idTable + '</td>';
        ligne += '<td>' + b.commande.boissons[i].Quantite + '</td>';
        ligne += '<td>' + b.commande.boissons[i].Nom + '</td>';
        ligne += '<td>' + b.commande.boissons[i].Detail + '</td>';
        ligne += '</tr>';
        addElem('tableau', ligne);
    }
}

function change(item){
    if(document.formulaire.elements[item].checked == true){
        document.getElementById(item).style.backgroundColor = "cornflowerblue";
        document.getElementById(item).style.display = "none";
    }
    else{
        document.getElementById(item).style.backgroundColor = "white";
    }
}
