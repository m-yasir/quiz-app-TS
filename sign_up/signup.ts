if (sessionStorage.getItem('student')) {
    location.replace('index.html');
}

//Inteface and class for Signup Accounts Creation
interface signupin {
    email: string;
    username: string;
    password: string;
}

class signup implements signupin {
    public email: string;
    public password: string;
    public username: string;
    constructor(em: string, pw: string, un: string) {
        this.email = em;
        this.username = un;
        this.password = pw;
    }
}

//SIGN-UP account creation check (FOR STUDENTS!) No admin account creation for now!
$('#signupform').on("submit", (e): void => {
    let sign;
    e.preventDefault();
    let pwcmp = $('#su_password1');
    let pwcmp2 = $('#su_password2');
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
    let email = `${$('#su_email').val()}`;
    let password = `${$('#su_password2').val()}`;
    let username = `${$('#su_username').val()}`;
    if (pwcmp.val() == pwcmp2.val() && regex.test(email) === true) {
        sign = new signup(email, password, username);
        gl_array.push(sign);
        setlocal('student', gl_array);
        location.replace('../login/login.html');
        $('#signupform').trigger('reset');
    } else {
        window.alert('Use valid email address only!');
        $('#su_email').focus();
    }
});
