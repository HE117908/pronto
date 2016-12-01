function payer(x){
    var recu = document.getElementById("recu"+x).value;
    var total = document.getElementById("total"+x).innerHTML;
    setElem("rendu"+x, "");
    addElem("rendu"+x, recu - total + " €");
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



