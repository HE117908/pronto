/**
 * Created by francois on 06/11/2016.
 */

//-----------------------------------------------------------------------------------------------------------//
//partie cuisine

function afficherPlats(c){
    var ligne;
    var elem = Object.keys(c.commande.plats);
    for (var i in elem) {
        i = elem[i];
        ligne = '<tr>';
        ligne += '<td>' + c.idTable + '</td>';
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
    var elem = Object.keys(b.commande.boissons);
    for (var i in elem) {
        i = elem[i];
        ligne = '<tr>';
        ligne += '<td>' + b.idTable + '</td>';
        ligne += '<td>' + b.commande.boissons[i].Nom + '</td>';
        ligne += '<td>' + b.commande.boissons[i].Detail + '</td>';
        ligne += '</tr>';
        addElem('tableau', ligne);
    }
}
