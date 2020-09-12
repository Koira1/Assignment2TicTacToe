import "./styles.css";

var div = document.getElementById("board");
var playerTurn = 0;
var playArray = [];
var id = startTimer();
function startTimer() {
  var width = 100;
  if (width > 0) {
    var elem = document.getElementById("progressbar");
    var id = setInterval(frame, 10);
    function frame() {
      if (width < 0.1) {
        clearInterval(id);
        player();
        startTimer();
      } else {
        width = width - 0.1;
        elem.style.width = width + "%";
        elem.innerHTML = Math.floor(width / 10);
      }
    }
  }
  return id;
}

function onClickTable(event) {
  var who = player();
  clearInterval(id);
  id = startTimer();
  if (who === 1) {
    document.getElementById(event.target.id).innerHTML = "X";
    var element = document.getElementById(event.target.id);
    element.className = "cell_x";
    var cell = event.target.id;
    cell = cell.replace("C", "");
    var rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "X";
    checkWinner("X");
  } else {
    document.getElementById(event.target.id).innerHTML = "Y";
    var element1 = document.getElementById(event.target.id);
    element1.className = "cell_y";
    cell = event.target.id;
    cell = cell.replace("C", "");
    rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "Y";
    checkWinner("Y");
  }
  console.log(event.target.id);
}

function player() {
  if (playerTurn % 2 === 0) {
    playerTurn = playerTurn + 1;
    return 1;
  } else {
    playerTurn = playerTurn + 1;
    return 2;
  }
}

function checkWinner(player) {
  var winningCombos = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [20, 16, 12, 8, 4]
  ];
  for (var win of winningCombos) {
    console.log(win);
    var count = 0;
    for (var index of win) {
      console.log(index);
      if (playArray[index] !== player) {
        break;
      } else {
        count++;
        console.log("count: " + count);
      }
    }
    if (count === 5) {
      if (player === "X") {
        alert("Player 1 won!");
      } else {
        alert("Player 2 won!");
      }
    }
  }
}

div.innerHTML =
  '<table id="board">\
<tr class="row" id="row1">\
 <td id="C0"></td>\
  <td id="C1"></td>\
  <td id="C2"></td>\
  <td id="C3"></td>\
  <td id="C4"></td>\
</tr>\
<tr class="row" id="row2">\
<td id="C5"></td>\
  <td id="C6"></td>\
  <td id="C7"></td>\
  <td id="C8"></td>\
  <td id="C9"></td>\
</tr>\
<tr class="row" id="row3">\
<td id="C10"></td>\
  <td id="C11"></td>\
  <td id="C12"></td>\
  <td id="C13"></td>\
  <td id="C14"></td>\
</tr>\
<tr class="row" id="row4">\
<td id="C15"></td>\
  <td id="C16"></td>\
  <td id="C17"></td>\
  <td id="C18"></td>\
  <td id="C19"></td>\
</tr>\
<tr class="row" id="row5">\
<td id="C20"></td>\
  <td id="C21"></td>\
  <td id="C22"></td>\
  <td id="C23"></td>\
  <td id="C24"></td>\
</tr>\
</table>';

var rows = document.getElementsByClassName("row");
for (var i = 0; i < rows.length; i++) {
  rows[i].addEventListener(
    "click",
    function (e) {
      onClickTable(e);
    },
    false
  );
}
