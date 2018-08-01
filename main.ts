//ADMIN-ACCESS-CREDENTIALS
let adminemail: string = "admin@admin.com";
let adminuser: string = "admin";
let adminpw: string = "secret";

//Getting Array of accounts from localstorage 
var gl_array: string[] = (JSON.parse(localStorage.getItem('student')) || []);

//Getting QUIZ from Localstorage
var gl_quiz: string[] = (JSON.parse(localStorage.getItem('quiz')) || []);

let button_check: boolean;


if ( JSON.parse(sessionStorage.getItem('student')) ) {
    //Admin USER AND PASS CHECK
    if ((JSON.parse(sessionStorage.getItem('student')))['email'] == adminemail) {
        $('#tquiz').parent().remove();
        $('.mr-auto').append(`<li class="nav-item active" id='quizlist'><a class="nav-link activelink" id='quizlink' href="quiz/quiz.html">Quiz</a></li>`);
    }

    //LOGIN AND SIGN-UP BUTTON FLAG SET
    if (JSON.parse(sessionStorage.getItem('student'))['check']) {
        button_check = true;
    } else {
        button_check = false;
    }

    //Logout and user display check
    let name = (JSON.parse(sessionStorage.getItem('student')))['username'];
    $('.mr-auto').append(`<li class="nav-item"><a class='nav-link active'> Welcome! ${name}</a></li><button class="btn logout-btn btn-outline-primary">Log out</button>`);
    $('.logout-btn').on('click', () => {
        sessionStorage.clear();
        if (location.href.split('/')[location.href.split('/').length - 1] === 'index.html') {
            location.replace('index.html');
        } else {
            location.replace('../index.html');
        }
    });
    $('.mr-auto').attr('style', 'margin-bottom:-5px');
}

//LOGIN AND SIGNUP BUTTON CHECK
if (button_check) {
    $('#mainlogin').remove();
    $('#mainsignup').remove();
}

//Function to set Session Login
function setsession(key: string, item: number | string | object): void {
    window.sessionStorage.setItem(key, JSON.stringify(item));
}

//function to set item in localstorage
function setlocal(key: string, item: string | object | number): void {
    window.localStorage.setItem(key, JSON.stringify(item));
}