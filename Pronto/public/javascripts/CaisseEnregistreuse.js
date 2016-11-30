// fonctions utilitaires
function setElem(id, v){
    document.getElementById(id).innerHTML = v;
}
function addElem(id, v){
    document.getElementById(id).innerHTML += v;
}
function getElem(id){
    return document.getElementById(id);
}

function payer() {
    var diff = 50 - 10;
    addElem("rendu1", diff + " €");
}

function ajouteCommande(c){
    var ligne;
    var elem = Object.keys(c.commande.plats);
    var eleme = Object.keys(c.commande.boissons);
    for (var i in elem) {
        i = elem[i];
        var prixp = c.commande.plats[i].Prix;
        ligne = '<tr>';
        ligne += '<td>' + "5X" + '</td>';
        ligne += '<td>' + c.commande.plats[i].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += i
        ligne += '"'
        ligne += '" value='
        ligne += prixp
        ligne += '>' + prixp + " €" + '</td>';
        ligne += '</tr>';
        if(c.idTable == "Table 1"){
            addElem('tableau1', ligne);
        }else if(c.idTable == "Table 2"){
            addElem('tableau2', ligne);
        }else if(c.idTable == "Table 3"){
            addElem('tableau3', ligne);
        }
    }
    for (var j in eleme) {
        j = eleme[j];
        var prixb = c.commande.boissons[j].Prix
        ligne = '<tr>';
        ligne += '<td>' + "2X" + '</td>';
        ligne += '<td>' + c.commande.boissons[j].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += j
        ligne += '" value='
        ligne += prixb
        ligne += '>' + prixb + " €" + '</td>';
        ligne += '</tr>';
        if (c.idTable == "Table 1") {
            addElem('tableau1', ligne);
        } else if (c.idTable == "Table 2") {
            addElem('tableau2', ligne);
        } else if (c.idTable == "Table 3") {
            addElem('tableau3', ligne);
        }
    }
    // Calcul du total d'un table

    var longp = Object.keys(elem).length;
    var longb = Object.keys(eleme).length;
    if (c.idTable == "Table 1") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        addElem('totalTVA1', ((sommep + sommeb)*6)/100 + " €");
        addElem('total1', sommep + sommeb + " €");
        /*if(sommep == true && sommeb == true){
         addElem('totalTVA1', ((sommep + sommeb)*6)/100 + " €");
         addElem('total1', sommep + sommeb + " €");
         }else if(sommep == true && sommeb == false){
         addElem('totalTVA1', (sommep*6)/100 + " €");
         addElem('total1', sommep + " €");
         }else if(sommep == false && sommeb == true){
         addElem('totalTVA1', (sommeb*6)/100 + " €");
         addElem('total1', sommeb + " €");
         }*/
    } else if (c.idTable == "Table 2") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        addElem('totalTVA2', ((sommep + sommeb)*6)/100 + " €");
        addElem('total2', sommep + sommeb + " €");
    } else if (c.idTable == "Table 3") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        addElem('totalTVA3', ((somme + sommeb)*6)/100 + " €");
        addElem('total3', sommep + sommeb + " €");
    }
}



