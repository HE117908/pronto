/**
 * Created by francois on 06/11/2016.
 */

var tabData = {};

function addData(type,data){
    if(type == "usr")tabData.username = data;
    else tabData.password = data;

}


function onSubmit() {
    $.ajax({
        type: 'POST',
        data: JSON.stringify(tabData),
        contentType: 'application/json',
        url: '/login_post'
    });

}