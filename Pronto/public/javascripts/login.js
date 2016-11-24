/**
 * Created by francois on 06/11/2016.
 */

   /* $(document).ready(function(){
        var user,pass;
        $("#submit").click(function(){
            user=$("#inputLogin").val();
            pass=$("#inputPassword").val();
            $.post("http://localhost:3000/login_post",{user: user,password: pass});



            return false;
        });
    });

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
        url: '/login_post'
    });

    return

}
