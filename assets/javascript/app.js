var game = {
    currentQ: 0,
    time: 30,
    questionInterval: null,
    timerInterval: null,
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

    updateTime(arg){
        if(game.time > 0){
        game.time -= arg;
        $("#time").html(game.time);
    }else{
        game.time = 0;
        game.clearTimer();
    }
    },

    clearTimer(){
        
        clearInterval(game.interval);
        game.time = 30;
    },

    setTimer(){
      interval = setInterval(game.changQ, 5000, 5)  
    },

    setQ(qObject) {
        if (qObject) {
            var q = qObject.q;
            var a = qObject.a;

            $("#question").text(q);

            for (let i in a) {
              $("#" + i.toString() ).text(a[i]);
            }
        }
    },

    changeQ(arg) {
        game.setQ(game.questions[game.currentQ]);
        game.currentQ++;
        
        console.log(game.currentQ > game.questions.length);
        if (game.currentQ > game.questions.length) {
            console.log("HGEYE");
            game.setQ({ q: "BLAH", a: ["bleep", "blue", "l"] })
        }

    },

}
