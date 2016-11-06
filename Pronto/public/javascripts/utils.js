/**
 * Created by francois on 06/11/2016.
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
