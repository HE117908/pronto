var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var date = new Date().getTime();
var idCom = 'commande'+ date; // id de la commande = commande + date en millisecondes
var c = {}; //objet pour mise en forme
var long = 0; //permet de récupérer le nbr d'éléments pour les paiements séparés
var total; //total d'une commande
var totRestant;

//fonction pour créer la commande avant l'envoye sans id, table, etc (objets boissons + plats)
function addCom(){
    boissons = c.commande.boissons;
    plats = c.commande.boissons;
    com['boissons'] = boissons;
    com['plats'] = plats;
}

//fonction pour créer la commande avant l'envoye + id, table, etc
function addCart(val){
    addCom();
    cart['commande'] = com;
    console.log(cart);
}

//fonction qui permet de récupérer les données via les sockets
function passData(data){
    c = data;
    var x = c.idTable.substring(6);
    var tot = parseFloat(getElem("total"+x).innerHTML);
    if(tot==0){setElem("tableTicket"+x, '')};
    ajouteTicket();
    ajouteCommande();
    payerSep();
}

//function qui effectue les différents calcul de l'interface de caisse(boutton payer principale)
function payer(x){
    setElem(("Table "+x), "");
    var recu = document.getElementById("recu"+x).value;
    var total = document.getElementById("totalRes"+x).innerHTML;
    var res = (recu - total);
    setElem(("rendu"+x), res.toFixed(2) + " €");
    cart['idCommande'] = idCom;
    cart['PrixTotal'] = document.getElementById("total"+x).innerHTML;
    cart['typePaiement'] = document.getElementById("typePaiement"+x).value;
    cart['typePaiementSep'] = document.getElementById("typePaiementSep").value;
    cart['platsSuspendu'] = document.getElementById("typeSuspendu"+x).value;
    cart['idTable'] = c['idTable'];
    cart['idServeur'] = c['idGarcon'];

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
    boissons = {};
    plats = {};
}

//fonction de remise à zéro des champs
function raz(x){
    setElem("totalTVA"+x, 0);
    setElem("totalHTVA"+x, 0);
    setElem("total"+x, 0);
    setElem("totalRes"+x, 0);
    document.getElementById("recu"+x).value = '';
}

//fonction qui effectue la mise en forme des données de la caisse
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
        ligne += '<td class="prix" id="prix';
        ligne += i;
        ligne += '"';
        ligne += '" value=';
        ligne += prixp;
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
        ligne += '<td class="prix" id="prix';
        ligne += j;
        ligne += '" value=';
        ligne += prixb;
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
    setElem('totalTVA'+c.idTable.substring(6), tttva.toFixed(2));
    setElem('totalHTVA'+c.idTable.substring(6), tthtva.toFixed(2));
    setElem('total'+c.idTable.substring(6), tt);
    setElem('totalRes'+c.idTable.substring(6), tt);
}

function ajouteTicket(){
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
        ligne += '<td>' + prixp + " €" + '</td>';
        ligne += '</tr>';
        numTab = c.idTable.substring(6);
        addElem("tableTicket" + numTab, ligne);
        var prixligneP = (qtep * prixp);//prix plats selon quantité
        totalP = totalP + prixligneP;
    }
    for (var j in eleme) {
        j = eleme[j];
        var prixb = (c.commande.boissons[j].Prix);
        var qteb =(c.commande.boissons[j].Quantite);
        ligne = '<tr id="' + c.idTable + '">';
        ligne += '<td>' + c.commande.boissons[j].Quantite + '</td>';
        ligne += '<td>' + c.commande.boissons[j].Nom + '</td>';
        ligne += '<td>' + prixb + " €" + '</td>';
        ligne += '</tr>';
        numTab = c.idTable.substring(6);
        addElem("tableTicket"+numTab, ligne);
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
    var oldtt = parseFloat(getElem('totalTicket'+c.idTable.substring(6)).textContent);
    var tt = total+oldtt;
    var tttva = (tt*6)/100;
    var tthtva = (tt - tttva);
    setElem('totalTVATicket'+c.idTable.substring(6), tttva);
    setElem('totalHTVATicket'+c.idTable.substring(6), tthtva);
    setElem('totalTicket'+c.idTable.substring(6), tt);
}

//Fonction qui permet d'ajouter les plats ou boissons a payer séparement
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


//Fonction qui effectue tous les calculs concernant les paiements séparés
function payerSep() {
    var recuSep = getElem("recuPaiementSep").value;
    var totalSep = getElem("totalPaiementSep").innerHTML;
    var resSep = (recuSep - totalSep);
    setElem("renduPaiementSep", resSep.toFixed(2) + " €");
    var totalSep2 = getElem("totalRes"+c.idTable.substring(6)).innerHTML;
    totRestant = totalSep2 -totalSep;
    setElem('totalRes'+c.idTable.substring(6), totRestant);
    setElem("tabPaiementSep", "");
    setElem("totalPaiementSep", 0);
    document.getElementById("recuPaiementSep").value = '';
    long = 0;
}

function ticket(x){
    $("#tickethead"+x).html("<p>"+c.idCommande+"</p><p>Servi par :"+c.idGarcon+"</p><p>N°TVA: 1234567</p><p>"+getDate()+"</p>");
    $(".panel-primary").removeClass("print");
    $("#t"+x).addClass("print");
    $("#ticket"+x).addClass("print");
    $("#tickethead"+x).addClass("print");
    $("#tableTicketT"+x).addClass("print");
    window.print();
}

function getDate() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth()+1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    var jour = day+"/"+month+"/"+year+" - "+hour+":"+minute+":"+second;
    return jour;
}

function suspendu(n) {
    var type = getElem("typeSuspendu" + n).value;
    var prix;
    if(type=="Soupe"){
        prix = 5;
    }else{
        prix = 2;
    }
    var ligne = '<tr id="Table ' + n + '">';
    ligne += '<td>1</td>';
    ligne += '<td>' + type + '</td>';
    ligne += '<td class="prix" id="prix'
    ligne += n
    ligne += '" value='
    ligne += prix
    ligne += '>' + prix + ' €</td>';
    ligne += '<td>' + '<button class="add" onclick="ajoutePaiement(this.parentNode.parentNode)"> + </button></td>';
    ligne += '</tr>';
    var prixTot = parseFloat(getElem('total'+c.idTable.substring(6)).textContent);
    var prixSuspendu = prixTot + prix;
    var totalSep2 = parseFloat(getElem("totalRes"+c.idTable.substring(6)).innerHTML);
    var prixRestant = totalSep2 + prix;
    setElem('total'+c.idTable.substring(6), prixSuspendu);
    setElem('totalRes'+c.idTable.substring(6), prixRestant);
    addElem("Table "+n, ligne);
}





