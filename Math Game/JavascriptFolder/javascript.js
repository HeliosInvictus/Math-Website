var playing = false;
var score;
var timeRemainingValue; 
var action;
var correctAnswer;


document.getElementById("startResetBox").onclick =
    function () {
        if (playing == true) {
            location.reload;//reloads page
            clearBoxes();
            document.getElementById("startText").innerHTML="start";
            document.getElementById("timeClock").style.display = "none";
            document.getElementById("scoreCard").innerHTML = "score: " + " " + "0";
            hide("gameOver");
            hide("correct");
            hide("wrong");
            playing = false;
            
            
        } else {           
            score = 0;
            timeRemainingValue = 60;
            clearBoxes();
            document.getElementById("scoreCard").innerHTML = score;
            document.getElementById("timeClock").style.display = "block";
            document.getElementById("startText").innerHTML="Reset Game";
            document.getElementById("timeRemaining").innerHTML = timeRemainingValue;
            hide("wrong");
            hide("gameOver");
            reveal("timeClock");
            clearInterval(action);
            startCountDown();
            generateQA();
           
            playing = true;
        }
    }
for(i = 1; i < 5; i++)
    {
    document.getElementById("box"+i).onclick =
        function(){
            if(playing == true){

                if(this.innerHTML == correctAnswer){

                    //add some delay
                    //then hide correct again
                  hide("wrong");
                  reveal("correct");
                  setTimeout(function(){
                  hide("correct");
                  },1000);

                    if(correctAnswer > 100){
                        score += 3; 
                        document.getElementById("scoreCard").innerHTML = score;
                        }else{

                            score += 1; 
                            document.getElementById("scoreCard").innerHTML = score;
                        }
                        generateQA();
                }
               else{
                  hide("correct");
                  reveal("wrong");
                  setTimeout(function(){
                  hide("wrong");
                  },1000);

                  score -= 2; 
                  document.getElementById("scoreCard").innerHTML = score;
                  generateQA();
                }
        }
    }
}

function startCountDown(){
    action = setInterval(function(){
            timeRemainingValue -= 1;
            document.getElementById("timeRemaining").innerHTML = timeRemainingValue;
            if(timeRemainingValue == 0){
                stopCountDown();
                clearBoxes();
                reveal("gameOver");
                document.getElementById("gameOver").innerHTML = "<p>Game Over!</p>" + "<p>Your Score is " +  score + "." + "</p>"
                document.getElementById("startText").innerHTML="start";
                     playing = false;
                     hide("timeClock");
                     hide("wrong");
                     hide("right");  
                }
            }, 1000);
}

function stopCountDown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.visibility = "hidden";
}

function reveal(Id){
    document.getElementById(Id).style.visibility = "visible";
}

function generateQA(){
    var x = 1 + Math.round(29*Math.random());
    var y = 1 + Math.round(29*Math.random());
    var wrongAnswer;
    var answers = [correctAnswer];   

    
    document.getElementById("questionBox").innerHTML = x + "x" + y;
    
    correctAnswer = x * y;
    
    
    var correctAnswerPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctAnswerPosition).innerHTML = correctAnswer;
    
    for(var i = 1; i < 5; i++){
        if(i == correctAnswerPosition){
            //if I stumble on the right answer, do nothing and move on
        }
        else{
                do{
                    wrongAnswer = 1 + Math.round(800*Math.random());
                }while((answers.indexOf(i) > -1))   
                       
                document.getElementById("box"+i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
        }

    }
}





function clearBoxes(){
    document.getElementById("questionBox").innerHTML = " ";
    document.getElementById("box1").innerHTML = " ";
    document.getElementById("box2").innerHTML = " ";
    document.getElementById("box3").innerHTML = " ";
    document.getElementById("box4").innerHTML = " ";
}