var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var date = new Date().getTime();
var idCom = 'commande'+ date; // id de la commande = commande + date en millisecondes

//fonction pour créer la commande avant l'envoye sans id, table, etc (objets boissons + plats)
function addCom(){
    com['boissons'] = boissons;
    com['plats'] = plats;
}

//fonction pour créer la commande avant l'envoye + id, table, etc
function addCart(val){
    addCom();
    cart['commande'] = com;
    console.log(cart);
}

function payer(x){
    setElem(("tableau"+x), "");
    var recu = document.getElementById("recu"+x).value;
    var total = document.getElementById("total"+x).innerHTML;
    var res = (recu - total);
    console.log(total);
    setElem("rendu"+x, "");
    addElem("rendu"+x, res.toFixed(2) + " €");
    cart['idCommande'] = idCom;
    cart['PrixTotal'] = document.getElementById("total"+x).innerHTML;
    cart['typePaiement'] = document.getElementById("typePaiement"+x).value;
    addCart();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(cart),
        contentType: 'application/json',
        url: '/caisse_post',
        error: function() {
            alert("Enregistrement échoué.");
        },
        success: function() {
            raz(x);
        }
    });
    //raz(x);
}

function raz(x){
    setElem("totalTVA"+x,"");
    setElem("totalHTVA"+x,"");
    setElem("total"+x,"");
    document.getElementById("recu"+x).value = '';
}

function ajouteCommande(c){
    var ligne;
    var elem = Object.keys(c.commande.plats);
    var eleme = Object.keys(c.commande.boissons);
    var totalP = 0;
    for (var i in elem) {
        i = elem[i];
        var prixp = c.commande.plats[i].Prix;
        var qtep = c.commande.plats[i].Quantite;
        ligne = '<tr>';
        ligne += '<td>' + c.commande.plats[i].Quantite + '</td>';
        ligne += '<td>' + c.commande.plats[i].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += i
        ligne += '"'
        ligne += '" value='
        ligne += prixp
        ligne += '>' + prixp + " €" + '</td>';
        ligne += '<td>' + '<button class="add" onclick="ajoutePaiement()"> + </button>' + '</td>';
        ligne += '</tr>';
        addElem('tableau'+c.idTable.substring(6), ligne);

        var prixligneP = (qtep*prixp);//prix plats selon quantité
        totalP= totalP + prixligneP;
        console.log(totalP);

    }
    for (var j in eleme) {
        j = eleme[j];
        var prixb = (c.commande.boissons[j].Prix);
        var qteb =(c.commande.boissons[j].Quantite);
        var totalB = 0;
        ligne = '<tr>';
        ligne += '<td>' + c.commande.boissons[j].Quantite + '</td>';
        ligne += '<td>' + c.commande.boissons[j].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += j
        ligne += '" value='
        ligne += prixb
        ligne += '>' + prixb + " €" + '</td>';
        ligne += '<td>' + '<button class="add" onclick="ajoutePaiement()"> + </button>' + '</td>';
        ligne += '</tr>';
        addElem('tableau'+c.idTable.substring(6), ligne);

        var prixligneB = (qteb*prixb);//prix boissons selon quantité
        totalB= totalB + prixligneB;
        console.log(totalB);
    }

    //permet de commander boisson sans plats et inversement
    if (isNaN(totalB)){
        totalB = 0;
    }
    if (isNaN(totalP)){
        totalP = 0;
    }
    var total = (totalB+totalP);
    var TVA = (total*6)/100;

        addElem('totalTVA'+c.idTable.substring(6), TVA + " €");
        addElem('totalHTVA'+c.idTable.substring(6), (total - TVA) + " €");
        addElem('total'+c.idTable.substring(6), total);

}

function ajoutePaiement(){
    var c = $('.prix').length;
    console.log(c);
    for (var i = 0; i < c; i++){

    }
}




