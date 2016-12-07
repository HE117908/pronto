var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var date = new Date().getTime();
var idCom = 'commande'+ date; // id de la commande = commande + date en millisecondes
var c = {};
var long = 0;
var tableTemp;
var total;

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

function passData(data){
    c = data;
    //drawTable();
    ajouteCommande();
    payerSep();
}

function payer(x){
    setElem(("Table "+x), "");
    var recu = document.getElementById("recu"+x).value;
    var total = document.getElementById("total"+x).innerHTML;
    var res = (recu - total);
    setElem("rendu"+x, "");
    addElem("rendu"+x, res.toFixed(2) + " €");
    cart['idCommande'] = idCom;
    cart['PrixTotal'] = document.getElementById("total"+x).innerHTML;
    cart['typePaiement'] = document.getElementById("typePaiement"+x).value;
    cart['platsSuspendu'] = document.getElementById("typeSuspendu"+x).value;
    cart['idTable'] = c['idTable'];
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
}

function raz(x){
    setElem("totalTVA"+x, 0);
    setElem("totalHTVA"+x, 0);
    setElem("total"+x, 0);
    document.getElementById("recu"+x).value = '';
}


function ajouteCommande(){
    var ligne;
    var elem = Object.keys(c.commande.plats);
    var eleme = Object.keys(c.commande.boissons);
    var totalP = 0;
    var totalB = 0;
    for (var i in elem) {
        i = elem[i];
        var prixp = c.commande.plats[i].Prix;
        var qtep = c.commande.plats[i].Quantite;
        ligne = '<tr id="' + c.idTable + '">';
        ligne += '<td>' + c.commande.plats[i].Quantite + '</td>';
        ligne += '<td>' + c.commande.plats[i].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += i
        ligne += '"'
        ligne += '" value='
        ligne += prixp
        ligne += '>' + prixp + " €" + '</td>';
        ligne += '<td>' + '<button class="add" onclick="ajoutePaiement(this.parentNode.parentNode)"> + </button>' + '</td>';
        ligne += '</tr>';
        addElem(c.idTable, ligne);
        var prixligneP = (qtep*prixp);//prix plats selon quantité
        totalP= totalP + prixligneP;
    }
    for (var j in eleme) {
        j = eleme[j];
        var prixb = (c.commande.boissons[j].Prix);
        var qteb =(c.commande.boissons[j].Quantite);
        ligne = '<tr id="' + c.idTable + '">';
        ligne += '<td>' + c.commande.boissons[j].Quantite + '</td>';
        ligne += '<td>' + c.commande.boissons[j].Nom + '</td>';
        ligne += '<td class="prix" id="prix'
        ligne += j
        ligne += '" value='
        ligne += prixb
        ligne += '>' + prixb + " €" + '</td>';
        ligne += '<td>' + '<button class="add" onclick="ajoutePaiement(this.parentNode.parentNode)"> + </button>' + '</td>';
        ligne += '</tr>';
        addElem(c.idTable, ligne);
        var prixligneB = (qteb*prixb); //prix boissons selon quantité
        totalB= totalB + prixligneB;
    }
    //permet de commander boisson sans plats et inversement
    if (isNaN(totalB)){
        totalB = 0;
    }
    if (isNaN(totalP)){
        totalP = 0;
    }
    total = (totalB+totalP);
    var oldtt = parseFloat(getElem('total'+c.idTable.substring(6)).textContent);
    var tt = total+oldtt;
    var tttva = (tt*6)/100;
    var tthtva = (tt - tttva);
    setElem('totalTVA'+c.idTable.substring(6), tttva);
    setElem('totalHTVA'+c.idTable.substring(6), tthtva);
    setElem('total'+c.idTable.substring(6), tt);
}

function ajoutePaiement(tr){
    long++;
    tr.cells[3].innerHTML="&nbsp;"
    tr= tr.parentNode.removeChild(tr);
    document.getElementById("tabPaiementSep").appendChild(tr);
    var totPaiementSepare = 0;
    for(var i = 0; i < long; i++){
        var pri = document.getElementById("tabPaiementSep").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
        var qte = document.getElementById("tabPaiementSep").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
        if(pri.length == 3){
            pri = pri.substring(0,pri.length-1);
        }else if(pri.length == 4){
            pri = pri.substring(0,pri.length-1);
        }else if(pri.length == 5){
            pri = pri.substring(0,pri.length-1);
        }
        var res = pri*qte;
        totPaiementSepare += parseFloat(res);
    }
    setElem("totalPaiementSep", totPaiementSepare);
    setElem("renduPaiementSep", "");
}

function payerSep() {
    var recuSep = document.getElementById("recuPaiementSep").value;
    var totalSep = document.getElementById("totalPaiementSep").innerHTML;
    var resSep = (recuSep - totalSep);
    addElem("renduPaiementSep", resSep.toFixed(2) + " €");
    var resteAPayer = total - totalSep;
    var selection = document.getElementById("tabPaiementSep").getElementsByTagName("tr")[0];
    //setElem("totalRes1", resteAPayer);
    /*if(getElem() == "Table 1"){
        setElem("totalRes1", resteAPayer);
    }else if(getElem() == "Table 2"){
        setElem("totalRes2", resteAPayer);
    }else if(getElem() == "Table 3"){
        setElem("totalRes3", resteAPayer);
    }else if(getElem() == "Table 4"){
        setElem("totalRes4", resteAPayer);
    }else if(getElem() == "Table 5"){
        setElem("totalRes5", resteAPayer);
    }else if(getElem() == "Table 6"){
        setElem("totalRes6", resteAPayer);
    }else if(getElem() == "Table 7"){
        setElem("totalRes7", resteAPayer);
    }else if(getElem() == "Table 8"){
        setElem("totalRes8", resteAPayer);
    }*/
    setElem("tabPaiementSep", "");
    setElem("totalPaiementSep", 0);
    document.getElementById("recuPaiementSep").value = '';

}

function ticket(){
    var ticket = document.getElementById("Table 1").textContent;
    alert(ticket);
}

function suspendu(n) {
    var type = getElem("typeSuspendu" + n).value;
    var prix;
    if(type=="Soupe"){
        prix = 5;
    }else{
        prix = 2;
    }
    console.log(type);
    var ligne = '<tr id="Table ' + n + '">';
    ligne += '<td>1</td>';
    ligne += '<td>' + type + '</td>';
    ligne += '<td class="prix" id="prix'
    ligne += n
    ligne += '" value='
    ligne += prix
    ligne += '>' + prix + '€ </td>';
    ligne += '<td>' + '<button class="add" onclick="ajoutePaiement(this.parentNode.parentNode)"> + </button></td>';
    ligne += '</tr>';

    addElem("Table "+n, ligne);
}

function drawTable(){
    /*
<div id="collapseSix" class="panel-collapse collapse">
        <div class="panel-body">
        <table class="table table-striped" id="table6">
        <thead>
        <tr>
        <th>Quantité :</th>
    <th>Nom du produit :</th>
    <th>Prix :</th>
    </tr>
    </thead>
    <tbody id="Table 6"></tbody>
        </table>
        <div class="paiement">
        <p>
        <label for="recu6">Argent reçu : </label>
    <input id="recu6" name="recu1" placeholder='Entrez une valeur'/>
        </p>
        <p><label>Total TVA(6%) : <span id="totalTVA6"></span></label></p>
        <p><label>Total HTVA : <span id="totalHTVA6"></span></label></p>
        <p><label class="total">Total : <span id="total6"></span> €</label></p>
        <p><label>A rendre : <span id="rendu6"></span></label></p>
        <button class="btnTicket" id="btnTicket6" onclick="ticket();">Ticket</button>
        <button class="btnPayer" id="btnPayer6" onclick="payer(6)">Payer</button>
        <select id="typePaiement6">
        <option>Liquide</option>
        <option>Bancontact</option>
        <option>Visa(carte de crédit)</option>
    <option>Chèque cadeau</option>
    <option>Ticket restaurant</option>
    </select>
    </div>
    </div>
    </div>
    </div>*/
}




