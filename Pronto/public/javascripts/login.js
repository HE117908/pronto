/**
 * Created by francois on 06/11/2016.
 */

    $(document).ready(function(){
        var user,pass;
        $("#submit").click(function(){
            user=$("#inputLogin").val();
            pass=$("#inputPassword").val();
            $.post("http://localhost:3000/login_post",{user: user,password: pass}, function(data){
                if(data==='done')
                {
                    alert("login success");
                }
            });

            return false;
        });
    });

/*
function onSubmit() {
    var tabData = {};
    tabData.usr = document.getElementById("inputLogin").value;
    tabData.pwd = document.getElementById("inputPassword").value;
    //alert(JSON.stringify(tabData));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(tabData),
        contentType: 'application/json',
        url: '/login_post'
    });

    return false;

}
    */