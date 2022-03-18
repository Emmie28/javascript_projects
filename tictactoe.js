
let player = 'blue';
let moves = new Array(3);
let moveCount = 0;
let check = 0;

//Check if a move is legal.
let legalMove = true;
let games_played = 0;
let blue_won = 0;
let red_won = 0;
let tie = 0;

// T0 Keep track of game in progress.
let game_ended = false;

//Create a two dimensional array.
for(let i = 0; i < 3; i++){
    moves[i] = new Array(3);
}

// Clear board.
function refreshBoard(action){
    
    if(action === 'end_game'){
        let instruction =  document.getElementById('instruction');
        legalMove = false;
        let overall_winner = overallWinner();
        document.getElementById('overall').innerHTML = `Overall winner is: ${overall_winner}`;
        instruction.style = 'color:red';
        instruction.innerHTML = 'please click the new game button to start a new game.';
        document.getElementById('refresh_btn').disabled = true;
        return;
    }
    
    // Alternate who starts the game.
    if (games_played % 2 != 0)
        player = 'red';
    else
        player = 'blue';

    moveCount = 0;
    legalMove = true;
    game_ended = false;

    //Clear the content of the two dimensional array.
    for(let i = 0; i<3; i++){
        for(let j = 0; j<3; j++){
            moves[i][j] = null;
        }
    }
    
    let board = document.getElementById('board');
    
    //Get all the child element with classname 'tile'.
    let board_tiles = board.getElementsByClassName('tile');
    
    //Clear the board.
    for(let i=0; i<board_tiles.length; ++i){
        board_tiles[i].innerHTML = '';
    }
    

}

//Check the overall winner when the endgame button is clicked.
function overallWinner(){
    if(blue_won > red_won){
        return 'blue';
    }
    else if(red_won > blue_won){
        return 'red';
    }
    else
        return 'tie'

}


function new_promise(player){
    return new Promise((resolve, reject) =>{
            let answer = player;
            resolve(answer);
        });
}

//Function to check the winner.
function checkWinner(player){
    let winner;
    game_ended = true;
    if(moves[0][0] == player && moves[0][1] == player && moves[0][2] == player){
        
       winner = new_promise(player);
        return winner;
    }
        
    else if(moves[1][0] == player && moves[1][1] == player && moves[1][2] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[2][0] == player && moves[2][1] == player && moves[2][2] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[0][0] == player && moves[1][1] == player && moves[2][2] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[0][2] == player && moves[1][1] == player && moves[2][0] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[0][0] == player && moves[1][0] == player && moves[2][0] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[0][1] == player && moves[1][1] == player && moves[2][1] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moves[0][2] == player && moves[1][2] == player && moves[2][2] == player){
        winner = new_promise(player);
        return winner;
    }
    else if(moveCount === 9){
        winner = 'tie';
        return winner;
    }
        
    else{
        game_ended = false;
        return;
    }
}

//Get the postion of the tile that is clicked.
function getCordinates(id,player){
    //Add to moves array
    let x;
    let y;
    if(id / 3 < 1){
        x = 0;
        y = id;
    }
    else{
        x = Math.floor(id/3);
        if(x < 2){
            if(id >= 3){
                y = id - 3;
            }
            else{
                y = 3 - id;
            }      
        }
        else{
            if(id >= 6){
                y = id - 6;
            }
            else{
                y = 6 - id;
            }
                
        }
    }
    
    //When user clicked on an already clicked tile.
    if(moves[x][y]){
        if(game_ended)
            alert('The game has ended. Restart, New game or End the game');
        else{
            alert('Not a legal move, Try another square.');
            legalMove = false;
            moveCount -= 1;
        }       
    }
           
    else{
        if(!game_ended)
            legalMove = true;
        moves[x][y] = player;
        }         
}

async function play(id){
    moveCount += 1;
    let c = document.getElementById(id);
    let content;
    let ans;
    
    if(player == 'blue'){
        getCordinates(id,player);
        //Check for legal moves.
        if(legalMove){
            content = 'X';
            c.style = 'color:blue;';
            ans = await checkWinner(player);
            player = 'red';
        }    
    }

    else{ 
        getCordinates(id,player);
        if(legalMove){
            content = 'O';
            c.style = 'color:red;';
            ans = await checkWinner(player);
            player = 'blue';
        }    
    }
    
    //Fill the tile with X or O.
    if(legalMove)
        c.innerHTML = content;

    //If a winner emerges.
    if(ans && ans != 'tie'){
        document.getElementById('announce').innerHTML = `${ans}`;
        games_played += 1;
        document.getElementById('Played').innerHTML = `Games Played: ${games_played}`;
        legalMove = false;
        if(ans === 'blue'){
            blue_won += 1;
            document.getElementById('b_won').innerHTML = blue_won;
        }
        else{
            red_won += 1;
            document.getElementById('r_won').innerHTML = red_won;
        }
            
    }

    //If it is a tie.
    if(ans === 'tie'){
        document.getElementById('announce').innerHTML = `${ans}`;
        games_played += 1;
        tie += 1;
        document.getElementById('Played').innerHTML = `Games Played: ${games_played}`;
        document.getElementById('tie').innerHTML = tie;
        legalMove = false;   
    }   
}


