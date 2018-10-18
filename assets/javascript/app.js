var game = {
    currentQ: 0,
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

    setCountdown(){

        
        console.log("seting up countdown");
        var time = 10;
        var id = setInterval(count, 1000);
        
        if(game.counting){
            cancel();
            game.setCountdown();
        }

        function count(){
          
            if(time == 0){
                console.log("done");
                clearInterval(id);
                game.counting = false;
                game.timeOut();
            }else{
                game.counting = true;
                console.log('counting');
                time--;
                $("#time").text(time);
            }
        };

        function cancel(){

            console.log("CANCELLING");
            clearInterval(id);
            game.counting = false;
        }

    },

    timeOut(){
        
        var id = setTimeout(game.changeQ, 5000);

        
    },

    setQ(qObject) {

        console.log("setting question")
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
        game.setQ(game.questions[game.currentQ]);
        console.log("changing question");
        game.setCountdown();
        game.currentQ++;
        console.log(game.currentQ > game.questions.length);
        if (game.currentQ > game.questions.length) {
            console.log("HGEYE");
            game.setQ({ q: "BLAH", a: ["bleep", "blue", "l"] })
        }

    },

}

game.changeQ();
