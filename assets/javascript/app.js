
var game = {
    currentQ: 0,
    answersCorrect: 0,
    answersWrong: 0,
    counting: false,
    timeoutID: null,
    time: 10,

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

    //timer stuff
    countDown() {


        if (game.time > 0) {
            $("#time").text(game.time);
            game.time--;
            game.timeoutID = setTimeout(game.countDown, 1000);
        } else {
            game.timeOut();
        }

    },

    startTimer(seconds) {
        if (!game.counting) {
            game.time = seconds;
            game.counting = true;
            game.countDown();
        }

    },

    stopTimer() {
        clearTimeout(game.timeoutID);
        game.counting = false;
    },
    //end timer stuff

    //update stuff
    setup() {
        game.currentQ = 0;
        game.answersCorrect = 0;
        game.answersWrong = 0;
        game.counting = false;

        $("#main").hide();
        $("#splash").show();
        $("#splashImg").src;
        $("#splashMessage").text("Would you like to play a game?");
        $("#answer").removeClass("setup");
        $("#answer").addClass("start");

    },

    update(btn) {
        if (btn.hasClass("setup")) {
            game.setup();
        }


        if (btn.hasClass("start")) {
            console.log("start clicked");
            btn.removeClass("start");
            game.changeQ();
        } else if (btn.hasClass('choice')) {
            game.answerChosen(btn);
        }


    },
    //end update stuff

    //Q stuff
    setQ(qObject) {

        console.log("setting question")
        if (qObject) {
            var q = qObject.q;
            var a = qObject.a;

            $("#question").text(q);
            for (let i in a) {
                $("#" + i.toString()).text(a[i]);
                console.log("this button says: " + $("#" + i.toString()).text());

            }
        }

    },

    changeQ() {
        game.currentQ++;
        
        console.log("CURRENT Q IS MORE THAN # OF QS is " + (game.currentQ > game.questions.length).toString());
        if (game.currentQ > game.questions.length) {

            game.endGame();
        } else {
            $("#splash").hide();
            $("#main").show();

            game.stopTimer();
            game.startTimer(10);
            console.log("changing question");
            game.setQ(game.questions[game.currentQ - 1]);

         
        }

    },
//end Q stuff

//Answer or lack there of
    answerChosen(elem) {
        console.log("answer was chosen");
        console.log("CURRENT Q: " + game.currentQ);

        if (game.questions[game.currentQ-1]) {
            if (elem.text() == game.questions[game.currentQ-1].c) {

                game.answersCorrect++;
            } else {

                game.answersWrong++;
            }

            $("#splashImg").src;
            console.log("You chose " + elem.text())
            $("#splashMessage").text("You chose " + elem.text());

            console.log("current currect answer is: " + game.questions[game.currentQ - 1].c)
            $("#answer").text("Answer: " + game.questions[game.currentQ - 1].c);
        }

        game.stopTimer();
        console.log("setting timeout to change Q after answer");
        setTimeout(game.changeQ, 5000);

        $("#splash").show();
        $("#main").hide();

    },

    timeOut() {
        console.log("time ran out");
        game.answersWrong++;
        $("#splashImg").src;
        $("#splashMessage").text("You ran out of time.");
        if (game.questions[game.currentQ-1]) {
            console.log("current Q :"+ game.currentQ-1);

            $("#answer").text("Answer: " + game.questions[game.currentQ-1].c);
        }

        $("#splash").show();
        $("#main").hide();
        game.stopTimer();
        
        console.log("setting timeout to change Q after time out");

        setTimeout(game.changeQ, 5000);



    },
//end answer stuff

//end stuff
    endGame() {
        console.log("ending game");
        $("#splashMessage").text("Correct: " + game.answersCorrect + " Incorrect: " + game.answersWrong + " Play again?");
        $("#answer").text("Yes").addClass("setup");
        $("#main").hide();
        $("#splash").show();
    },
//end end stuff
}
//setup when ready
$(document).ready(
    function () {

        game.setup();

    }
);
//update when clicked
$(document).on("click", ".btn", function (e) {
    e.preventDefault();
    game.update($(this));
});
