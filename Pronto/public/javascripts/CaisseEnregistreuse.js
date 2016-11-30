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

function payer1(){
    var recu = document.getElementById("recu1").value;
    var total = document.getElementById("total1").innerHTML;
    setElem("rendu1", "");
    addElem("rendu1", recu - total + " €");
}

function payer2(){
    var recu = document.getElementById("recu2").value;
    var total = document.getElementById("total2").innerHTML;
    setElem("rendu2", "");
    addElem("rendu2", recu - total + " €");
}

function payer3(){
    var recu = document.getElementById("recu3").value;
    var total = document.getElementById("total3").innerHTML;
    setElem("rendu3", "");
    addElem("rendu3", recu - total + " €");
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

    var longp = Object.keys(elem).length;
    var longb = Object.keys(eleme).length;
    if (c.idTable == "Table 1") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        var tot = sommep + sommeb;
        var TVA = ((sommep + sommeb)*6)/100;
        addElem('totalTVA1', TVA + " €");
        addElem('totalHTVA1', (tot - TVA) + " €");
        addElem('total1', tot);
    } else if (c.idTable == "Table 2") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        addElem('totalTVA2', TVA + " €");
        addElem('totalHTVA2', (tot - TVA) + " €");
        addElem('total2', tot);
    } else if (c.idTable == "Table 3") {
        var sommep = prixp * longp;
        var sommeb = prixb * longb;
        addElem('totalTVA3', TVA + " €");
        addElem('totalHTVA3', (tot - TVA) + " €");
        addElem('total3', tot);
    }else{}
}



