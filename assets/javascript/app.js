var game = {
    currentQ: 0,
    answersCorrect: 0,
    answersWrong: 0,
    counting: false,
    questions: [
        {
            q: "how many?",
            a: ["2", "5", "42"],
            c: "5"
        },

        {
            q: "why?",
            a: ["not", "gonna", "lie"],
            c: "not"
        }

    ],

    answerChosen(elem) {
        if (game.questions[game.currentQ - 1]) {
            if (elem.text() == game.questions[game.currentQ - 1].c) {
                game.answersCorrect++;
            } else {
                game.answersWrong++;
            }
            $("#splashImg").src;
            $("#splashMessage").text("You chose " + elem.text());


            $("#answer").text("Answer: " + game.questions[game.currentQ - 1].c);
        }
        $("#splash").show();
        $("#main").hide();
        var id = setTimeout(game.changeQ, 5000);
    },

    endGame() {
        console.log("ending game");
        $("#splashMessage").text("GAME OVER. Play again?");
        $("#answer").text("Yes").on("click", game.setup);
        $("#main").hide();
        $("#splash").show();
    },


    timeOut() {

        $("#splashImg").src;
        $("#splashMessage").text("You ran out of time.");
        if (game.questions[game.currentQ - 1]) {
            $("#answer").text("Answer: " + game.questions[game.currentQ - 1].c);
        }

        $("#splash").show();
        $("#main").hide();

        setTimeout(game.changeQ, 5000);


    },

    setup() {
        game.currentQ = 0;
        game.answersCorrect = 0;
        game.answersWrong = 0;
        game.counting = false;

        $("#main").hide();
        $("#splash").show();
        $("#splashImg").src;
        $("#splashMessage").text("Would you like to play a game?");
        $("#answer").addClass("start");

    },

    setQ(qObject) {

        console.log("setting question")
        if (qObject) {
            var q = qObject.q;
            var a = qObject.a;

            $("#question").text(q);
            for (let i in a) {
                $("#" + i.toString()).text(a[i]);
                console.log($("#" + i.toString()));

            }
        }

    },

    changeQ() {
        if (game.currentQ > game.questions.length) {

            game.endGame();
        }
        $("#splash").hide();
        $("#main").show();
        var id = setTimeout(game.timeOut, 10 * 1000);
        $(".choice").on("click", function () {
            console.log($(this) + " Clearing " + id);
            clearTimeout(id);
            game.answerChosen($(this));
        });
        console.log("changing question");
        game.setQ(game.questions[game.currentQ]);

        game.currentQ++;
        console.log(game.currentQ > game.questions.length);


    },

}

$(document).ready(
    function () {

        game.setup();
       
    }
);

$(document).on("click", ".btn", function (e) {
    e.preventDefault();
    if($(this).hasClass("setup")){
        game.setup();
    }
    if ($(this).hasClass("start")) {
        console.log("start clicked");
        $(this).removeClass("start");
        game.changeQ();
    } else if ($(this).hasClass('choice')) {

    }


    if ($(this).hasClass("btn-primary")) {

    } else if ($(this).hasClass("btn-secondary")) {
        $(this).addClass("btn-primary");
        $(this).removeClass("btn-secondary");
    } else if ($(this).hasClass("btn-info")) {

        $(this).removeClass("btn-info");
    }
});
