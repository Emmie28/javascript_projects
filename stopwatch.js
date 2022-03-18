
let timeSecond = 60;
let timeMinutes = 0;
let countDown = '';
let clicked = false;
function startTimer(){
    if(timeSecond == 0){
        timeSecond = 60;
    }
    if (clicked == false){
        countDown = setInterval(timer,1000);
        clicked = true;
    }
    
}


function timer(){
    timeSecond--;
    displayTime(timeSecond);
    if(timeSecond == 0){
        
        timeMinutes += 1;
        timeSecond = 60;
   }   
}

function stopTimer(){
    clearInterval(countDown);
    clicked = false;
}

function resetTimer(){
    timeMinutes = 0;
    timeSecond = 0;
    clearInterval(countDown);
    displayTime(timeSecond);
    clicked = false;
}

function displayTime(second){
    const sec = Math.floor(second % 60);
    document.getElementById('time').innerHTML = `${timeMinutes<10 ? '0':''}${timeMinutes}:${sec<10?'0':''}${sec}`;
}