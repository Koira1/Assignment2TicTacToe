import "./styles.css";
luoPoyta();
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
  console.log("What the fuck");
  if (who === 1) {
    document.getElementById(event.target.id).innerHTML = "x";
    var element = document.getElementById(event.target.id);
    element.className = "cell_x";
    var cell = event.target.id;
    cell = cell.replace("C", "");
    var rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "X";
    checkWinner("X");
  } else {
    document.getElementById(event.target.id).innerHTML = "o";
    var element1 = document.getElementById(event.target.id);
    element1.className = "cell_y";
    cell = event.target.id;
    cell = cell.replace("C", "");
    rowcolumn = parseInt(cell, 10);
    playArray[rowcolumn] = "Y";
    checkWinner("Y");
  }
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
    var count = 0;
    for (var index of win) {
      if (playArray[index] !== player) {
        break;
      } else {
        count++;
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
function luoPoyta() {
  var size = 5;
  var counter = 0;
  var poyta = document.getElementById("board");
  //poyta.setAttribute("border", "1");
  //poyta.setAttribute("width", "500");
  //poyta.setAttribute("height", "500");
  var tpoyta = document.createElement("tbody");
  for (var i = 0; i < size; i++) {
    var rivi = document.createElement("tr");
    rivi.className = "row";
    for (var j = 0; j < size; j++) {
      var lokero = document.createElement("td");
      lokero.id = "C" + counter;
      counter++;
      rivi.appendChild(lokero);
    }
    tpoyta.appendChild(rivi);
  }
  poyta.appendChild(tpoyta);
}

var rows = document.getElementsByClassName("row");
console.log(rows);
for (var i = 0; i < rows.length; i++) {
  rows[i].addEventListener(
    "click",
    function (e) {
      onClickTable(e);
    },
    false
  );
}
