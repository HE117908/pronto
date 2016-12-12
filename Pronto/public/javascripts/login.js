/**
 * Created by francois on 06/11/2016.
 */


/*
* Fonction d'envoi du login/pwd au serveur (AJAX)
*/
function submitLog() {
    var tabData = {};
    tabData.user = document.getElementById("inputLogin").value;
    tabData.password = document.getElementById("inputPassword").value;
    $.ajax({
        type: 'POST',
        data: JSON.stringify(tabData),
        contentType: 'application/json',
        url: '/login_post',
        error: function() {
                alert("Please enter correct user name and password.");
        },
        success: function() {
            show();
            $('#dropdownMenuServeur').val(tabData.user);
            setGarcon(tabData.user);
        }
    });


}


/*
 * Fonction de modification CSS (Login)
 */
function show() {

    showBox("home");
    hide("login-modal");
    $(".modal-backdrop").remove();
}