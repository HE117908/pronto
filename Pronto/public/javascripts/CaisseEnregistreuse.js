var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var date = new Date().getTime();
var idCom = 'commande'+ date; // id de la commande = commande + date en millisecondes
var c = {};
var long = 0;
var tableTemp;

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
}

function payer(x){
    setElem(("Table "+x), "");
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

function raz(x){
    setElem("totalTVA"+x,"0");
    setElem("totalHTVA"+x,"0");
    setElem("total"+x,"0");
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
    var total = (totalB+totalP);

    if(c.idTable == "Table 1") {
        var oldtt = parseFloat(getElem('total1').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA1', tttva);
        setElem('totalHTVA1', tthtva);
        setElem('total1', tt);
    }else if (c.idTable == "Table 2") {
        var oldtt = parseFloat(getElem('total2').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA2', tttva);
        setElem('totalHTVA2', tthtva);
        setElem('total2', tt);
    }else if (c.idTable == "Table 3") {
        var oldtt = parseFloat(getElem('total3').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA3', tttva);
        setElem('totalHTVA3', tthtva);
        setElem('total3', tt);
    }else if (c.idTable == "Table 4") {
        var oldtt = parseFloat(getElem('total4').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA4', tttva);
        setElem('totalHTVA4', tthtva);
        setElem('total4', tt);
    }else if (c.idTable == "Table 5") {
        var oldtt = parseFloat(getElem('total5').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA5', tttva);
        setElem('totalHTVA5', tthtva);
        setElem('total5', tt);
    }else if (c.idTable == "Table 6") {
        var oldtt = parseFloat(getElem('total6').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA6', tttva);
        setElem('totalHTVA6', tthtva);
        setElem('total6', tt);
    }else if (c.idTable == "Table 7") {
        var oldtt = parseFloat(getElem('total7').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA7', tttva);
        setElem('totalHTVA7', tthtva);
        setElem('total7', tt);
    }else if (c.idTable == "Table 8") {
        var oldtt = parseFloat(getElem('total8').textContent);
        var tt = total+oldtt;
        var tttva = (tt*6)/100;
        var tthtva = (tt - tttva);
        setElem('totalTVA8', tttva);
        setElem('totalHTVA8', tthtva);
        setElem('total8', tt);
    }else{}
}

function ajoutePaiement(tr){
    long++;
    tr.cells[3].innerHTML="&nbsp;"
    tr= tr.parentNode.removeChild(tr);
    document.getElementById("tabPaiementSepare").appendChild(tr);
    var totPaiementSepare = 0;
    for(var i = 0; i < long; i++){
        var pri = document.getElementById("tabPaiementSepare").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
        totPaiementSepare += parseFloat(pri);
    }
    setElem("totalPaiementSepare", totPaiementSepare);
}

function payerSep() {
    var idTab = document.getElementById("tabPaiementSepare").getElementsByTagName("tr")[0].id;
    console.log(idTab);
}

function ticket(){
    var ticket = document.getElementById("tableau1").innerHTML;
    alert(ticket);
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




