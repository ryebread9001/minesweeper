var grid = document.getElementById("grid");
var button = document.getElementById("button")
var mineNum = 20;
var winCount = 0;

createGrid();

function createGrid() {

  grid.innerHTML='';
  for (var i=0;i<20;i++){
    var row = grid.insertRow(i);
    for (var j=0;j<20;j++){

      var cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
    }
  }
  addMines();
}

function addMines() {
  //Add mines randomly
  for (var i=0; i<mineNum; i++) {
    var row = Math.floor(Math.random() * 20);
    var col = Math.floor(Math.random() * 20);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("mine","true");

  }
}

function checkWin() {
  winCount = 0;
  for (var i=0;i<=19;i++) {
    for (var j=0;j<=19;j++) {
      if (grid.rows[i].cells[j].getAttribute("mine")=="true" && grid.rows[i].cells[j].innerHTML == "!") {
        winCount++;
      }
    }
  }
  if (winCount >= mineNum) {
    alert("YOU WIN");
  }
}

function clickCell(cell) {

  if (event.shiftKey) {
    cell.innerHTML = "!";
    checkWin();
  } else {
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;

    for (var i=Math.max(cellRow-1,0);i<=Math.min(cellRow+1,19);i++) {
      for (var j=Math.max(cellCol-1,0);j<=Math.min(cellCol+1,19);j++) {
        if (grid.rows[i].cells[j].getAttribute("mine")=="true") {
          mineCount++;
        }
      }
    }





    if (cell.getAttribute("mine") == "true") {
      cell.innerHTML = "X";
      alert("YOU LOSE");
      createGrid();
    } else {
      cell.style.color = "#"+(50*mineCount).toString(16)+(50).toString(16)+(50).toString(16);
      cell.innerHTML = mineCount;

    }

    if (mineCount == 0) {
      for (var i=Math.max(cellRow-1,0);i<=Math.min(cellRow+1,19);i++) {
        for (var j=Math.max(cellCol-1,0);j<=Math.min(cellCol+1,19);j++) {
          if (grid.rows[i].cells[j].innerHTML=="") {

            clickCell(grid.rows[i].cells[j]);

          }
        }
      }
    }

  }






}
