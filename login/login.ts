if(sessionStorage.getItem('student')){
    location.replace('../index.html');
}

//Self-invoking function for login email and password check and Event binds.
(() => {
    $('#loginform').on('submit', (e):void => {
        e.preventDefault();
        if($('#lg_email').val() === adminemail && $('#lg_password').val() === adminpw){ //Check for Admin Login
            let a = {
                email: adminemail,
                username: adminuser, 
                password: adminpw,
                check: true
            }
            setsession('student',a);
            location.replace("../index.html");
            return;
        }
        for (let i = 0; i < gl_array.length; i++) { 
            if ($('#lg_email').val() === gl_array[i]['email'] && $('#lg_password').val() === gl_array[i]['password']) {
                gl_array[i]['check'] = true;
                setsession('student',gl_array[i]);
                location.replace("../index.html");
                return;
            } // Check for Student Login
        }
        $('#loginform').trigger('reset');
        window.alert('Wrong email or Password!');
    });
})()




