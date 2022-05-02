var grid = document.getElementById("grid");

var mineNum = 20;



createGrid();


function createGrid() {


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

function clickCell(cell) {




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
  } else {
    cell.style.color = "#"+(50*mineCount).toString(16)+(50).toString(16)+(50).toString(16);
    cell.innerHTML = mineCount;

  }

  if (mineCount == 0) {
    for (var i=cellRow-1;i<=cellRow+1;i++) {
      for (var j=cellCol-1;j<=cellCol+1;j++) {
        if (grid.rows[i].cells[j].innerHTML=="") {

          clickCell(grid.rows[i].cells[j]);

        }
      }
    }
  }


}
