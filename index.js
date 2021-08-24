let colors = ['red', 'blue', 'yellow', 'green']
let gamePattern = [];
let userClieckedPattern = [];
let level = 0;
let steps = 0;

$(document).on('keydown', function () {
    if (level == 0) {
        ++level
        document.getElementById('level-title').innerHTML = 'level ' + level;
        setTimeout(function () {
            let randomChosenColor = nextSequence();
            $("#" + randomChosenColor).fadeOut(500).fadeIn(500);
            gamePattern.push(randomChosenColor);
        }, 1000);
}
})

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    return colors[randomNumber];
}

function clickHandler(event) {
    animatePress(event.target.id)
    $("#" + event.target.id).fadeOut(100).fadeIn(100);
    var audio = new Audio('./sounds/' + event.target.id + '.mp3');
    userClieckedPattern.push(event.target.id);
    audio.play();
    if (checkAnswer()) {
        if (steps == level) {
            steps = 0;
            ++level;
            userClieckedPattern = [];
            document.getElementById('level-title').innerHTML = 'level ' + level;
            setTimeout(function () {
                let randomChosenColor = nextSequence();
                $("#" + randomChosenColor).fadeOut(500).fadeIn(500);
                gamePattern.push(randomChosenColor);
            }, 1000);
        }
    }

    else {
        animateGameOver();
        steps = 0;
        userClieckedPattern = [];
        gamePattern = [];
        level = 1;
        document.getElementById('level-title').innerHTML = 'level ' + level;
        setTimeout(function () {
            let randomChosenColor = nextSequence();
            $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
            gamePattern.push(randomChosenColor);
        }, 1000);
    }
}

function checkAnswer() {
    if (userClieckedPattern[userClieckedPattern.length - 1] == gamePattern[userClieckedPattern.length - 1]) {
        ++steps;
        return true;
    }
    return false;
}

function animatePress(color) {
    $("#" + color).addClass('pressed');
    setTimeout(function () {
        $("#" + color).removeClass('pressed');
    }, 100);
}

function animateGameOver() {
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over')
    }, 100);
}
