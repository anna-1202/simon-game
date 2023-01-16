const i18n = [];
i18n["en"] = [];
i18n["ru"] = [];
i18n["en"]["game_over"] = "Game Over";
i18n["ru"]["game_over"] = "Конец Игры";
i18n["en"]["level"] = "Level ";
i18n["ru"]["level"] = "Уровень ";
i18n["en"]["start"] = "Press A Key to Start ";
i18n["ru"]["start"] = "Нажми клавишу чтобы начать ";

let  lang = "en";
let isGameStarted = false;

const gamePattern = [];
let userPattern = [];
const colors = ["green", "red", "yellow", "blue"];
let level = 0;


$("#level-title").text(i18n[lang]["start"]);

$(".lang").click(function () {
    lang = this.id;
    if (!isGameStarted){
        $("#level-title").text(i18n[lang]["start"]);
    }
    }) ;


$("body").one("keypress", function () {
    isGameStarted=true;
    randomSelectedPictures();
    enableClick();
});

function randomSelectedPictures() {
    level++;
    $("#level-title").text(i18n[lang]["level"] + level);
    const randomNum = Math.floor(Math.random() * 4);
    const color = colors[randomNum];
    gamePattern.push(color);
    $("#" + color).fadeOut(100).fadeIn(100);
    playAudio(color);

}

function enableClick() {
    $(".btn").click(function () {
        const color = this.id;
        $("#" + color).addClass("pressed");
        playAudio(color);
        setTimeout(function () {
            $("#" + color).removeClass("pressed");
        }, 200);
        userPattern.push(color);
        comparePattern();
    });

}

function playAudio(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

function comparePattern() {
    if (gamePattern[userPattern.length-1] === userPattern[userPattern.length-1]) {
        if (gamePattern.length == userPattern.length){

        userPattern = [];
            setTimeout(randomSelectedPictures, 500);
        }
    } else {
        $("#level-title").text(i18n[lang]["game_over"]);
    }
}

