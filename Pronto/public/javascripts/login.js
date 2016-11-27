/**
 * Created by francois on 06/11/2016.
 */

function submitLog() {
    var tabData = {};
    tabData.user = document.getElementById("inputLogin").value;
    tabData.password = document.getElementById("inputPassword").value;
    //alert(JSON.stringify(tabData));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(tabData),
        contentType: 'application/json',
        url: '/login_post',
        error: function() {
                alert("Please enter correct user name and password.");
        },
        success: function() {
            alert("name and password OK.");
            show();
            $('#dropdownMenuServeur').val(tabData.user);
            setElem('garconCom', tabData.user);
        }
    });


}

function show() {

    showBox("home");
    hide("login-modal");
    $(".modal-backdrop").remove();
}