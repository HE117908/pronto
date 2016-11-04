/**
 * Created by Alex on 11/10/2016.
 */

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
    var com = document.getElementById(a + 'Comment').value;
    var ac = 'ac';
    var sup = 'sup';
    addTmp(a ,nom ,com ,ac ,sup);
    drawCommand();

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
function suppItem() {
    alert('hello word!!!');
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

//fonction pour push dans un tableau tmp
function addTmp(typeTemp, nom, det, ac, sup){
    var type = typeTemp.substring(0,typeTemp.length-1);
    var input = typeTemp + "Input";
    var qtt = getElem(input).value;
    var accomp = [];
    var suppl = [];

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

function addCom(){
    com['boissons'] = boissons;
    com['plats'] = plats;
}

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
    //raz();
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

function afficherPlats(c){
    var ligne;
    setElem('tableau', '');
    var elem = Object.keys(c.commande.plats);
    for (var i in elem) {
        i = elem[i];
        ligne = '<tr>';
        ligne += '<td>' + c.idTable + '</td>';
        ligne += '<td>' + c.commande.plats[i].Nom + '</td>';
        ligne += '<td>' + c.commande.plats[i].Detail + '</td>';
        ligne += '</tr>';
        addElem('tableau', ligne);
    }
}

function afficherBoissons(b){
    var ligne;
    setElem('tableau', '');
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



$('.link_ingredient').tooltip({placement: "auto top", toggle: "tooltip", title: "<h4>Ingrédients:</h4> jumbo lump crab, avocado, herb oil.", animation:"true", html: "true"});
$('.btn-success').popover({trigger: "focus", content: "commande envoyée", placement: "bottom"});
$('.btn-default').tooltip({placement: "auto right", trigger: "onClick" , toggle: "tooltip", title: "<h4>Produits ajoutés</h4>", animation:"true", html: "true"});








//fonction pour créer les éléments (entrées, plats...) de l'interface avec variables de la bdd mysql

/*
<div class="thumbnail" id="entree1">
    <div class="caption-full">
    <h4 class="pull-right" id="entree1Prix">$21</h4>
    <h4><a href="#" onmouseover="affiche()" class="link_ingredient" id="entree1Nom">HEIRLOOM TOMATO & WATERMELON GAZPACHO</a></h4>
<h4 class="pull-right">
    <input id="moinsEntree1" class="btn btn-default" type="button" value="-" />
    <input id ="resultEntree1" class="btn btn-default" type="texte" value="0" maxlength="2" />
    <input id="plusEntree1" class="btn btn-default" type="button" value="+" onclick="getItem('entree1')"/>
    </h4>
    <!-- <p id="entree1Desc">jumbo lump crab, avocado, herb oil.</p> -->
<textarea class="form-control" rows="2" id="commententree1" placeholder="Commentaires: "></textarea>
    </div>
    </div>
    */