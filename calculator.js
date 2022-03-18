var sign = "none";
 
// Function to delete an entry.
function del(){
    
    var content = document.getElementById('0').textContent;
    content = content.substring(0, content.length-1);
    document.getElementById('0').innerHTML = content;
    
}


function calc(id){
    let clicked_btn = document.getElementById(id).textContent;
    let expression = document.getElementById('0').textContent;
    var answer;
    
    if (isNaN(clicked_btn) == true && clicked_btn != '.'){
        sign = clicked_btn;
    }
    if (expression.length == 1 && isNaN(expression) == true){
        answer = clicked_btn;
    }
    else if (id == '%'){
        answer = expression / 100;
        document.getElementById('0').innerHTML = answer;

    }
   
    else {
        answer = expression + clicked_btn;
    }
    
    if (answer.length < 16){
        document.getElementById('0').innerHTML = answer;
    }
        
}

// Convert to either float or integer.
function check_float(number){
    var answer;
    if (number.includes('.')){
            answer = parseFloat(number);
        }
    else{
            answer = parseInt(number);
        }
    return answer;
}

// Function to perform the computation
function cal(){
    let a = document.getElementById('0').textContent;
    let b = 0;
    let c = 0;
    var test = false;
    let operators = ['*', '+', '-', '/'];
   
    for (let i=0; i < a.length; i++){
        if (!operators.includes(a[i]) && test == false){
            if (i == 0){
                b = a[i];
            }
            else{
                    b += a[i];    
                }
                
            }
    
        else{
            test = true;
            
            if (!operators.includes(a[i])){
                c += a[i];
            }
        }
    }

    var answer = 0;
    var m = 0;
    if (sign == '+' ){
        let d = check_float(b);
        let e = check_float(c);
        
        answer = d + e;
        
        
    }
    else if (sign == '-'){
        if (c == 0 ){
           answer = check_float(b);
        }
        else{
            b = check_float(b);
            c = check_float(c);
            answer = b - c;
        }
       
    }
    else if (sign == '/'){
        // check for zero division.
        if (c == 0){
            answer = 'Infinity';
        }
        else{
            b = check_float(b);
            c = check_float(c);
            answer = b / c;
        }   
       
    }
    else {
        m += 1;
        b = check_float(b);
        c = check_float(c);
        answer = b * c;
    }

    document.getElementById('0').innerHTML = answer;
}

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