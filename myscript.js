var player1 = prompt("Player one: Enter ur name, you will be blue");
var player1color = "rgb(86, 151, 255)";

var player2 = prompt("Player Two: Enter ur name, you will be red");
var player2color = "rgb(237, 45, 73)";

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);
}

function changecolor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returncolor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    var colorReport = returncolor(5,colIndex);
    for (var row = 5; row > -1; row--){
        colorReport = returncolor(row,colIndex);
        if (colorReport === "rgb(128, 128, 128)"){
            return row
        }
        
    }
     
}

function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== "rgb(128, 128, 128)" && one !== undefined)
}


function horizontalWinCheck(){
    for(var row = 0; row < 6; row++){
        for(var col = 0; col < 4; col++){
            if (colorMatchCheck(returncolor(row,col), returncolor(row,col+1), returncolor(row,col+2), returncolor(row,col+3) )){
                console.log('horiz');
                reportWin(row,col);
                return true;
            }else {
                continue;
            }

        }
    }
}

function verticalWinCheck(){
    for(var col = 0; col < 7; col++){
        for(var row = 0; row < 3; row++){
            if (colorMatchCheck(returncolor(row,col), returncolor(row+1,col), returncolor(row+2,col))){
                console.log('vertical');
                reportWin(row,col);
                return true;
            }else {
                continue;
            }

        }
    }
}

function diagonalWinCheck(){
    for(var col = 0; col < 5; col++){
        for(var row = 0; row < 7; row++){
            if (colorMatchCheck(returncolor(row,col), returncolor(row+1,col+1), returncolor(row+2,col+2), returncolor(row+3,col+3) )){
                console.log('diag');
                reportWin(row,col);
                return true;
            }else if(colorMatchCheck(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2), returncolor(row-3,col+3) )) {
                console.log('diag');
                reportWin(row,col);
                return true;
            }else {
                continue;
            }

        }
    }
}


var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h3').text(player1+" it is your turn, pick a column to drop in! ")

$('.border').on('click','button',function(){
   
    var col = $(this).closest("td").index();
    
    var bottomAvail = checkBottom(col);
    

    changecolor(bottomAvail,col,currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName+"u won")
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }

    currentPlayer = currentPlayer * -1;

    if (currentPlayer === 1 ){
        currentName = player1;
        $('h3').text(currentName+ " it is ur turn") 
        currentColor = player1color;      
    }else {
        currentName = player2;
        $('h3').text(currentName+ " it is ur turn") 
        currentColor = player2color; 
    }
})