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

    hide('menu');
    hide('entrees');
    hide('plats');
    hide('desserts');
    hide('boissons');
    hide('commande');

    document.getElementById(n).style.display='block';
}

//fonction qui cache les autres onglets
function hide(id) {
    document.getElementById(id).style.display='none';
}


//fonction pour récupérer les données d'un "item" (entrée, plat...)
function getItem(a) {
    var nom = document.getElementById(a + 'Nom').textContent;
    var comment = document.getElementById(a + 'Comment').value;
    if((getElem(a + 'Acc'))!=null){
        var ac = document.getElementById(a + 'Acc').value;
    }else{
        var ac = 'Accompagnements';
    }
    if((getElem(a + 'Acc'))!=null){
        var sup = document.getElementById(a + 'Supp').value;
    }else{
        var sup = 'Suppléments';
    }
    addTmp(a ,nom ,comment ,ac ,sup);
    drawCommand();
    razQtt(a);
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
            + ' \"><div class=\"caption-full\"><h4><a href=\"#\">'
            + plats[elem].Nom;
        + '</a></h4></div></div>';
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
            + ' \"><div class=\"caption-full\"><h4><a href=\"#\">'
            + boissons[elem].Nom;
        + '</a></h4></div></div>';
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
}

//fonction pour changer le garçon de salle
function setGarcon(nom){
    garcon = nom.value;
    setElem('garconCom', garcon);
}

//fonction pour changer la table
function setTable(nom){
    table = nom.value;
    setElem('tableCom', table);
}

//fonction pour créer dans un objet tmp
function addTmp(typeTemp, nom, det, ac, sup){
    var type = typeTemp.substring(0,typeTemp.length-1);
    var input = typeTemp + "Input";
    var qtt = getElem(input).value;
    var accomp = [];
    var suppl = [];

    if(ac!='Accompagnements') {
        accomp.push(ac);
    }
    if(sup!='Suppléments') {
        suppl.push(sup);
    }

    for(i=0; i < qtt; i++) {
        tmp['Nom'] = nom;
        tmp['Categorie'] = type;
        tmp['Detail'] = det;
        if (type != 'boisson') {
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
}

//fonction qui ajoute tmp dans boissons et plats
function addToTab(tab,ajout){
    element++;
    var elem = "elem" + element;
    tab[elem] = ajout;
    tmp = {};
}

/*
function addQuant(val1,val2){
    tmp.push(val1);
    addCart(val2)
}
*/

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

function onSubmit() {
    addCart();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(cart),
        contentType: 'application/json',
        url: '/process_post'
    });
    $(document).ready(function(){
        $('.btn-success').popover({trigger: "focus", content: "commande envoyée", placement: "bottom"});
    });
    raz();
}

function raz(){
    setElem('tempCom', '');
    setElem('garconCom', '');
    setElem('tableCom', '');
    idCom = '';
    table = '';
    garcon = '';
    tmp = {};
    plats = {};
    boissons = {};
    com = {};
    cart = {};
    date = new Date().getTime();
    idCom = 'commande'+ date;
    element = 0;
    showBox('menu');
}

function affiche(){
    $(document).ready(function(){
        $('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
    });
}


//fonctions pour les + et -

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

//fonctions pour créer la page onload
function drawAll(){
    drawServeur();
    drawTable();
    //drawAccoreon();
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

//crée le menu de raccourcis en accordéon
function drawAccoreon(){
    setElem('menuAccordion', '');
    for (var cat in données.categories) {
        var sc = '<table class="table">'
        for (var sousCat in données.categories[cat]){
            sc += '<tr><td><a href="#'
            + données.categories[cat][sousCat]
            + '" onclick="showBox('
            + données.categories[cat]
            + ')">'
            + données.categories[cat][sousCat]
            + '</a></td></tr>'
        }
        sc += '</table>';
        st = '<div class="panel panel-default"><div class="panel-heading"><br class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">'
            + cat
            + '</a></h4></div><div id="" class="panel-collapse collapse in"><div class="panel-body">'
            + sc
            + '</div></div></div>';
        addElem('menuAccordion',st);
    }
}

$('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
$('.btn-success').popover({trigger: "focus", content: "commande envoyée", placement: "bottom"});
$('.btn-default').tooltip({placement: "auto right", trigger: "onClick" , toggle: "tooltip", title: "<h4>Produits ajoutés</h4>", animation:"true", html: "true"});

