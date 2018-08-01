if (!(sessionStorage.getItem('student')) || (JSON.parse(sessionStorage.getItem('student'))['email'] != adminemail)) {
    window.location.replace('index.html');
}

if (JSON.parse(localStorage.getItem('time'))) {
    $(`#quiz-time`).attr('style', 'display:none;');
} else {
    $('#quiz-time').removeAttr('style');
}

class s_quiz {
    public question: string;
    public choice: { index: number, choice: string }[];
    public type: string;
    public correct_index: number;
    constructor(Q: string, Correct: number, choices: { index: number, choice: string }[], T: string) {
        this.question = Q;
        this.type = T;
        this.correct_index = Correct;
        this.choice = choices;
    }
}

class m_quiz {
    public question: string;
    public choice: { index: number, choice: string }[];
    public type: string;
    public correct_indexes: number[];
    constructor(Q: string, correct: number[], C: { index: number, choice: string }[], T: string) {
        this.question = Q;
        this.type = T;
        this.correct_indexes = correct;
        this.choice = C;
    }
}
var i = 2;

//Show the respective type of boxes for correct index/es  
$(`input:radio[name='type']`).on('blur', (): void => {
    if ($(`[name='type']:checked`).val() === 'S') {
        $(`[name='choice_S']`).removeClass('hide');
        $(`[name='choice_M']`).addClass('hide');
    } else {
        $(`[name='choice_M']`).removeClass('hide');
        $(`[name='choice_S']`).addClass('hide');
    }
});


//Adds fields
$('#add-btn').on('click', (): void => {
    if (<string>$(`[name='type']:checked`).val() === 'S') {
        $(`<div class="row"><input type='radio' required class='' name='choice_S' value='${i}' /><input type='checkbox' class='hide' name='choice_M' value='${i}' /><input type='text' name='choices' class='form-control col' required placeholder='Enter Answer in choice'/><button type='button' class='btn btn-outline-danger' id='del-btn${i}'>Delete</button></div>`).insertBefore('#add-btn');
    } else {
        $(`<div class="row"><input type='radio' required class='hide' name='choice_S' value='${i}' /><input type='checkbox' class='' name='choice_M' value='${i}' /><input type='text' name='choices' class='form-control col' required placeholder='Enter Answer in choice'/><button type='button' class='btn btn-outline-danger' id='del-btn${i}'>Delete</button></div>`).insertBefore('#add-btn');
    }
    i++;
    $('#del-btn' + (i - 1)).on('click', (): void => {
        $(`#del-btn${i - 1}`).parent().remove();
        --i;
    });
});

//When Submitting Form
$('#quizf').on('submit', (e) => {
    e.preventDefault();
    let question = (<string>$('#quizquest').val()).replace('?', '');
    let choices: { index: number, choice: string }[] = [];
    $(`[name='choices']`).each((ind: number, el: object): void => {
        choices.push({ index: ind, choice: (<string>$(el).val()) });
    });
    let correct_index: number;
    let correct_indexes: number[];
    if(!(localStorage.getItem('time'))){
        let time: number = <number>$('#quiz-time').val();
        setlocal('time', $('#quiz-time').val());
    }
    if (!($(`[name='choice_S']`).hasClass('hide'))) {
        correct_index = <number>($(`[name='choice_S']:checked`).val());
    }
    else if (!($(`[name='choice_M']`).hasClass('hide'))) {
        if ($(`[name='choice_M']:checked`).length > 0) {
            $(`[name='choice_M']:checked`).each((index: number, el: object): void => {
                correct_indexes.push(<number>$(el).val());
            });
        } else {
            window.alert(`Please Check atleast one box!`);
        }
    }
    if (<string>$(`[name="type"]:checked`).val() === "S") {
        let abc: any = new s_quiz(question, correct_index, choices, <string>$(`[name='type']:checked`).val());
        gl_quiz.push(abc);
    } else {
        let abc: any = new m_quiz(question, correct_indexes, choices, <string>$(`[name='type']:checked`).val());
        gl_quiz.push(abc);
    }
    setlocal('quiz', gl_quiz);
    location.reload();
});



