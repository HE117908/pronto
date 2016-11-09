/**
 * Created by francois on 06/11/2016.
 */

function onSubmit() {
    var tabData = {};
    tabData.usr = document.getElementById("inputLogin").value;
    tabData.pwd = document.getElementById("inputPassword").value;
    alert(JSON.stringify(tabData));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(tabData),
        contentType: 'application/json',
        url: '/login_post'
    });

}