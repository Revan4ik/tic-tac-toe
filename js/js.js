
    var cells = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var playerX = [];
    var playerO = [];
    var comb = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["1", "5", "9"],
      ["3", "5", "7"],
    ];
    var gameover = false;
    var turnCount = 1;
   var container = document.querySelector(".container");
   var body = document.querySelector('body')
  
  function createField() {
    var field = document.createElement("div");
    field.className = "field";
    container.prepend(field);
  }
  createField();
  
  function createBtn(text) {
    var btn = document.createElement("button");
    btn.className = "btn";
    btn.setAttribute("id", text);
    var field = document.querySelector(".field");
    field.append(btn);
  }
  
  for (var i = 0; i < cells.length; i++) {
    createBtn(cells[i]);
  }
  
  var buttons = document.querySelectorAll(".btn");
  var result = document.querySelector(".result");
  
  function WinnerIs(e) {
    var elem = e.target;
    if (turnCount % 2 === 0) {
      elem.innerHTML = "O";
      playerO.push(elem.id);
    } else {
      elem.innerHTML = "X";
      playerX.push(elem.id);
    }
    turnCount++;
  
    comb.forEach(function (combination) {
      if (compare(playerX, combination)) {
        result.textContent = "Победил Х";
        gameover = true;
      } else if (compare(playerO, combination)) {
        result.textContent = "Победил О";
        gameover = true;
      }
    });
  
    if (gameover) {
      buttons.forEach(function (button) {
        button.removeEventListener("click", WinnerIs);
      });
      return;
    }
  
    if (turnCount === 10) {
      result.textContent = "Ничья";
      gameover = true;
    }
  }
  
  buttons.forEach(function (button) {
    button.addEventListener("click", WinnerIs, { once: true });
  });
  
  function compare(arr, combination) {
    return combination.every(function (elem) {
      return arr.includes(elem);
    });
  }
  
  var resetBtn = document.createElement("button");
  resetBtn.className = "reset-game";
  resetBtn.textContent = "Перезапустить";
  body.append(resetBtn);
  
  resetBtn.addEventListener("click", function () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].innerHTML = "";
      buttons[i].addEventListener("click", WinnerIs, { once: true });
    }
    playerX = [];
    playerO = [];
    turnCount = 1;
    gameover = false;
    result.textContent = "Ходите";
  });
