if (!localStorage.getItem('quiz')) {
    $('.card-title')[0].innerHTML = 'There is no quiz taking place right now, Try Again later!'
    $('#nextquiz').addClass('hide');
    $('#qGoBack').removeClass('hide');
    $('#qGoBack').on('click', () => {
        location.replace('../index.html');
    });
} else {
    let marks: number = 0;
    
    if (!(sessionStorage.getItem('student'))) {
        window.location.replace('../login/login.html');
    } else {
        if (!(sessionStorage.getItem('points'))) {
            setsession('points', { P: 0 });
            marks = parseInt(JSON.parse(sessionStorage.getItem('points'))['P']);
        } else {
            marks = parseInt(JSON.parse(sessionStorage.getItem('points'))['P']);
        }
    }
    
    // let time: number = parseInt(JSON.parse(localStorage.getItem('time')));
    let time: number = 61;
    let hour: number = 0;
    let seconds: number = 0;
    
    // Custom timer made for the quiz
    
    let set_time = setInterval((): void => {
        if (time >= 60) {
            while (time > 60) {
                if (time >= 60) {
                    ++hour;
                }
                time -= 60;
            }
        }
        if (time == 0 && seconds == 0 && hour > 0) {
            time += 60;
            --hour;
        }
        if (seconds == 0) {
            if (time > 0) {
                --time;
                seconds += 60;
            }
        }
        $('#timer-set').html("");
        timer(seconds--);
    }, 1000);
    
    //Custom Timer Made for Quiz
    
    function timer(t: number): void {
        if (hour > 0 && time < 1) {
            $('#timer-set').html(`0${hour}:0${time}:${t}`);
        } else {
            $('#timer-set').html(`0${hour}:${time}:${t}`);
        }
        if (t < 10) {
            $('#timer-set').html(`0${hour}:${time}:0${t}`);
        }
    }
    
    var total_marks = (JSON.parse(localStorage.getItem('quiz'))).length * 10;
    
    $('#quizlink').removeClass('activelink');
    $('#quizlist').removeClass('active');
    
    //current question number
    let question_no: number = 0
    
    if (question_no == 0 && marks > 0) {
        location.replace('index.html');
        setsession('points', { P: 0 });
    }
    
    //Passing Values and getting question Number for Single or Multiple choice Generators
    function Quiz(): void {
        if (JSON.parse(localStorage.getItem('quiz'))) {
            $('#insertans').html('');
            let quiz_questions: string[] = JSON.parse(localStorage.getItem('quiz'));
            if (quiz_questions[question_no]['type'] === 'S') {
                $('.card-title').html(quiz_questions[question_no]['question'] + ' ?');
                for (let i = 0; i < quiz_questions[question_no]['choice'].length; i++) {
                    s_generator(quiz_questions[question_no]['choice'][i]);
                }
                $('#insertans').append(`<button id='submit-btn' class="btn btn-outline-primary">Submit</button>`);
                console.log('Single');
                $('#insertans').on('submit', (e) => {
                    e.preventDefault();
                    let flag: boolean = false;
                    if ($(`[name='choice']:checked`).length < 1) {
                        window.alert('Select atleast one button!');
                        return false;
                    }
                    if (parseInt(<string>$('[name="choice"]:checked').val()) == parseInt(quiz_questions[question_no]['correct_index'])) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                    if (flag) {
                        marks += 10;
                    }
                    $('#submit-btn').remove();
                    setsession('points', { P: marks });
                });
            } else {
                $('.card-title').html(quiz_questions[question_no]['question'] + ' ?');
                for (let i = 0; i < quiz_questions[question_no]['choice'].length; i++) {
                    m_generator(quiz_questions[question_no]['choice'][i]);
                }
                $('#insertans').append(`<button id='submit-btn' class="btn btn-outline-primary">Submit</button>`);
                console.log('Multiple');
                $('#insertans').on('submit', (e): void => {
                    e.preventDefault();
                    let flag: boolean = false;
                    if ($(`[name='choice']:checked`).length < 1) {
                        window.alert('Check Atleast one box!');
                        return;
                    }
                    $('[name="choice"]:checked').each((index, el): void => {
                        if (parseInt(<string>$(el).val()) == parseInt(quiz_questions[question_no]['correct_indexes'][index])) {
                            flag = true;
                        } else {
                            flag = false;
                        }
                        $('#submit-btn').remove();
                    });
                    if (flag) {
                        marks += 10;
                    }
                    setsession('points', { P: marks });
                });
            }
        }
    }
    
    //Executing Main_Quiz generator on page load.
    Quiz();
    
    //Sets points and moves the page to next question.
    function next_question(q_no: number): void {
        if (question_no < (JSON.parse(localStorage.getItem('quiz')).length) - 1) {
            question_no++;
            Quiz();
        } else {
            $('.card-body').html("");
            if (marks > Math.round((total_marks * 0.85))) {
                $('.card-body').append(`<h5 class='card-title'>Congrats!</h5>`);
                $('.card-body').append(`<p class='cardpara'>You got ${marks} out of ${total_marks}`);
            } else {
                $('.card-body').append(`<h5 class='card-title'>Result: </h5>`);
                $('.card-body').html(`You got ${marks} out of ${total_marks}`);
            }
        }
    }
    
    //Going to next question
    $('#nextquiz').on("click", (e): void => {
        e.preventDefault();
        next_question(question_no);
    });
    
    //Generates Quiz with single choice
    function s_generator(choice: string) {
        $('#insertans').append(`<input type='radio' class='form-control' required name='choice' value='${choice['index']}' /><p class='cardpara'>${choice['choice']}.</p>`);
    }
    
    //Generates Quiz with multiple choice
    function m_generator(choice: string) {
        $('#insertans').append(`<input type='checkbox' class='form-control' name='choice' value='${choice['index']}' /><p class='cardpara'>${choice['choice']}.</p>`);
    }

}