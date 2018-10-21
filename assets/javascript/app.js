
var game = {

    currentQ: 0,
    answersCorrect: 0,
    answersWrong: 0,
    counting: false,
    timeoutID: null,
    time: 10,
    images: {
        title: "./assets/images/saw.png",
        counting: "./assets/images/jigsaw.png",
        wrong: "./assets/images/wrong.png",
        right: "./assets/images/right.png",
        timeout: "./assets/images/timeout.png",
        gameover: "./assets/images/gameover.png "
    },
    questions: [
        {
            q: "How many Saw films are there?",
            a: ["2", "8", "11"],
            c: "8"
        },

        {
            q: "How many Saw video games are ther?",
            a: ["1", "2", "5"],
            c: "2"
        },
        {
            q: "What is Saw's antagonist's alias?",
            a: ["jigsaw", "clownface","trikey the killer"],
            c: "jigsaw"
        },
        {
            q: "In Saw 2, how many people were trapped in the house?",
            a:["3", "5", "8"],
            c: "8"

        },
        {
            q: "Which actor plays jigsaw?",
            a: ["tobin bell", "cary elwes", "hans raith"],
            c: "tobin bell"
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
        game.timeoutID = null;
        game.time = 10;

        $("#splashImg").attr({src: game.images.title, alt: "Saw Trivia title image"});    
        $("#splashMessage").text("Would you like to play a game?");
        $("#answer").removeClass("setup");
        $("#answer").addClass("start");

        $("#main").hide();
        $("#splash").show();
  
    },

    update(btn) {
        if (btn.hasClass("setup")) {
            game.setup();
        }
        if (btn.hasClass("start")) {
            btn.removeClass("start");
            game.changeQ();
        } else if (btn.hasClass('choice')) {
            game.answerChosen(btn);
        }
    },
    //end update stuff

    //Q stuff
    setQ(qObject) {
        if (qObject) {
            var q = qObject.q;
            var a = qObject.a;
            $("#question").text(q);
            for (let i in a) {
                $("#" + i.toString()).text(a[i]);
            }
        }
    },

    changeQ() {
        $("#mainImg").attr({src: game.images.counting, alt: "Image of Jigsaw and the words tick tock"});
        game.currentQ++;
        if (game.currentQ > game.questions.length) {
            game.endGame();
        } else {
            $("#splash").hide();
            $("#main").show();
            game.stopTimer();
            game.startTimer(10);
            game.setQ(game.questions[game.currentQ - 1]);
        }
    },
    //end Q stuff

    //Answer or lack there of
    answerChosen(elem) {
        if (game.questions[game.currentQ - 1]) {
            if (elem.text() == game.questions[game.currentQ - 1].c) {
                $("#splashImg").attr({src: game.images.right, alt: "Image of Jigsaw and the word correct"}); 
                game.answersCorrect++;
            } else {
                $("#splashImg").attr({src: game.images.wrong, alt: "Image of Jigsaw and the word wrong"});
                game.answersWrong++;
            }
            
            $("#splashMessage").text("You chose " + elem.text());
            $("#answer").text("The correct answer was " + game.questions[game.currentQ - 1].c);
        }
        game.stopTimer();
        setTimeout(game.changeQ, 5000);
        $("#splash").show();
        $("#main").hide();
    },

    timeOut() {
        game.answersWrong++;
        $("#splashImg").attr({src: game.images.wrong, alt: "Image of Jigsaw and the words clock ran out"});
        $("#splashMessage").text("You have ran out of time.");
        if (game.questions[game.currentQ - 1]) {
            $("#answer").text("The correct answer was " + game.questions[game.currentQ - 1].c);
        }
        game.stopTimer();
        setTimeout(game.changeQ, 5000);
        $("#splash").show();
        $("#main").hide();
        
    },
    //end answer stuff

    //end stuff
    endGame() {
        $("#splashMessage").text("You answered " + game.answersCorrect + " correctly and " + game.answersWrong + " incorrectly  . Play again?");
        $("#answer").text("Yes").addClass("setup");
        $("#splashImg").attr({src: game.images.wrong, alt: "Image of Jigsaw and the words game over"});
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
