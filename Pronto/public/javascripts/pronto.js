/**
 * Created by Alex on 11/10/2016.
 */

var tmp = {}; //objet temporaire avec plats(ou boissons...) et commentaire
var plats = {}; //objet des plats
var boissons = {}; // objet des boissons
var com = {}; //objet commande avec plats et boissons (sans ids table et garçon...)
var cart = {}; //objet avec ids garçon, table ... et tableau de commande
var table;
var garcon;
var date = new Date().getTime();
var idCom = 'commande'+ date; // id de la commande = commande + date en millisecondes
var element = 0; //pour incrémenter les elem (numero uniquement)


//fonction pour montrer l'onglet selectionné
function showBox(n) {

    hide('home');
    hide('Entrées');
    hide('Plats');
    hide('Desserts');
    hide('Boissons');
    hide('commande');

    document.getElementById(n).style.display='block';
}

//fonction qui cache les autres onglets
function hide(id) {
    document.getElementById(id).style.display='none';
}


//fonction pour récupérer les données d'un "item" (entrée, plat...)
function getItem(id) {
    var nom = document.getElementById(id + 'Nom').textContent;
    var comment = document.getElementById(id + 'Comment').value;
    var prix = document.getElementById(id + 'Prix').textContent;
    var ac, sup;
    if((getElem(id + 'Acc'))!=null){
        ac = document.getElementById(id + 'Acc').value;
    }else{
        ac = 'Accompagnements';
    }
    if((getElem(id + 'Acc'))!=null){
        sup = document.getElementById(id + 'Supp').value;
    }else{
        sup = 'Suppléments';
    }
    addTmp(id, nom, comment, ac, sup, prix);
    drawCommand();
    razQtt(id);
}

//fonction qui affiche le résumé de la commande
function drawCommand(){
    setElem('tempCom', '');
    var i = 0;
    var j = 0;
    for (var elem in plats) {
        i++;
        st = '<h4 class=\"pull-right\"><input id=\"'
            + elem
            +'Bouton'
            + i
            + '\" class=\"btn btn-default\" type=\"button\" value=\"-\" onclick=\"suppItem(\''
            + elem
            + '\')\"/></h4>'
            +'<div class=thumbnail id=\"'
            + elem
            +'Nom'
            + i
            + ' \"><div class=\"caption-full\"><h4>'
            + plats[elem].Nom
            + '   X <b>'
            + plats[elem].Quantite
            +'</b></h4></div></div>';
        addElem('tempCom',st);
    }
    for (var elem in boissons) {
        j++;
        st = '<h4 class=\"pull-right\"><input id=\"'
            + elem
            +'Bouton'
            + i
            + '\" class=\"btn btn-default\" type=\"button\" value=\"-\"onclick=\"suppItem(\''
            + elem
            + '\')\"/></h4>'
            +'<div class=thumbnail id=\"'
            + elem
            +'Nom'
            + i
            + ' \"><div class=\"caption-full\"><h4>'
            + boissons[elem].Nom
            + '   X <b>'
            + boissons[elem].Quantite
            +'</b></h4></div></div>';
        addElem('tempCom',st);
    }
}

//fonction pour supprimer un élément dans la commande
function suppItem(item){
    for(elem in plats){
        if(item==elem){
            delete plats[item];
            console.log(plats);
            drawCommand();
        }
    }
    for(elem in boissons){
        if(item==elem){
            delete boissons[item];
            console.log(boissons);
            drawCommand();
        }
    }
}

//fonction pour raz la valeur de la qtt
function razQtt(el){
    var qtt = el + 'Input';
    getElem(qtt).value = 1;
    var com = el + 'Comment';
    getElem(qtt).value = 1;
}


//crée le select des serveurs
function drawServeur(){
    setElem('dropdownMenuServeur', '');
    for (var serv in données.serveurs) {
        st = '<option><a href=\"#\" >'
            + serv
            + '</a></option>';
        addElem('dropdownMenuServeur',st);
    }
}

//crée le select des tables
function drawTable(){
    setElem('dropdownMenuTable', '');
    for (var tab in données.tables) {
        st = '<option><a href=\"#\" >'
            + tab
            + '</a></option>';
        addElem('dropdownMenuTable',st);
    }
}

//fonction pour changer le garçon de salle
function setGarcon(nom){
        garcon = nom;
        setElem('garconCom', garcon);
}

//fonction pour changer la table
function setTable(nom){
    if(nom.value !='---'){
        table = nom.value;
        setElem('tableCom', table);
    }
}

//fonction pour créer dans un objet tmp
function addTmp(id, nom, det, ac, sup, pr){
    var type = returnType(id);
    var idElem = id.substring(type.length);
    var idBdd;
    if(idElem==999){
        idBdd = 6;
    }else if(idElem==998){
        idBdd = 3;
    }else if(idElem==997){
        idBdd = 1;
    }else{
        idBdd = idElem;
    }
    var input = id + "Input";
    var qtt = getElem(input).value;
    var accomp = [];
    var suppl = [];
    var prix = pr.substring(0,pr.length-1);

    if(ac!='Accompagnements') {
        accomp.push(ac);
    }
    if(sup!='Suppléments') {
        suppl.push(sup);
    }

    tmp['Nom'] = nom;
    tmp['Categorie'] = type;
    tmp['Detail'] = det;
    tmp['Prix'] = prix;
    tmp['Quantite'] = qtt;
    tmp['Id'] = idBdd;
    if (type != 'boisson' && type != 'Softs' && type != 'Alcools' && type != 'Bières') {
        tmp['Accompagnements'] = accomp;
        tmp['Supplements'] = suppl;
        addToTab(plats, tmp);
        console.log(plats);
    }
    else {
        addToTab(boissons, tmp);
        console.log(boissons);
    }

}

//fonction qui ajoute tmp dans boissons et plats
function addToTab(tab,ajout){
    element++;
    var elem = "elem" + element;
    tab[elem] = ajout;
    tmp = {};
}

//fonction pour retourner le type d'élément (retire les chiffres à la fin de l'id)
function returnType(id){
    var type = id;
    do{
        type = type.substring(0,type.length-1);
        var lastCaract = type.substr(-1);
    }
    while (!isNaN(lastCaract));
    return type;
}

//fonction pour créer la commande avant l'envoye sans id, table, etc (objets boissons + plats)
function addCom(){
    com['boissons'] = boissons;
    com['plats'] = plats;
}

//fonction pour créer la commande avant l'envoye + id, table, etc
function addCart(val){
    addCom();
    cart['idCommande'] = idCom;
    cart['idTable'] = table;
    cart['idGarcon'] = garcon;
    cart['commande'] = com;
    console.log(cart);
}


//fonction qui envoye la commande au serveur
function onSubmit() {
    if(isEmpty(plats) && isEmpty(boissons)){
        setElem("comError","Veuillez remplir la commande!");
    }
    else if(isEmpty(table)){
        setElem("comError","Veuillez indiquer la table!");
    }
    else {
        setElem("comError","");
        addCart();
        $.ajax({
            type: 'POST',
            data: JSON.stringify(cart),
            contentType: 'application/json',
            url: '/process_post',
            error: function () {
                alert("La commande n'a pas aboutie...");
            },
            success: function () {
                raz();
            }
        });
    }
}


// fonction pour vérifier si un object est vide
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

//fonction qui remet tout les champ à zéro
function raz(){
    setElem('tempCom', '');
    //setElem('garconCom', '');
    setElem('tableCom', '');
    idCom = '';
    table = '';
    //garcon = '';
    tmp = {};
    plats = {};
    boissons = {};
    com = {};
    cart = {};
    date = new Date().getTime();
    idCom = 'commande'+ date;
    element = 0;
    getElem("dropdownMenuTable").value = "---";
    showBox('home');
}

//fonctions pour les boutons + et -
$('.btn-number').click(function(e){
    e.preventDefault();

    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {

            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            }
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});
$('.input-number').focusin(function(){
    $(this).data('oldValue', $(this).val());
});
$('.input-number').change(function() {

    minValue =  parseInt($(this).attr('min'));
    maxValue =  parseInt($(this).attr('max'));
    valueCurrent = parseInt($(this).val());

    name = $(this).attr('name');
    if(valueCurrent >= minValue) {
        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Désolé, la valeur minimal est atteinte');
        $(this).val($(this).data('oldValue'));
    }
    if(valueCurrent <= maxValue) {
        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
    } else {
        alert('Désolé, la valeur maximale est atteinte');
        $(this).val($(this).data('oldValue'));
    }
});
$(".input-number").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode == 65 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

//fonctions pour les pop-ups
$('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
$('.btn-default').tooltip({placement: "auto right", trigger: "onClick" , toggle: "tooltip", title: "<h4>Produits ajoutés</h4>", animation:"true", html: "true"});

