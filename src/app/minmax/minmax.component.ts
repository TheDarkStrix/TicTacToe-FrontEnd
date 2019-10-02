import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-minmax",
  templateUrl: "./minmax.component.html",
  styleUrls: ["./minmax.component.css"]
})
export class MinmaxComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  /*Code of Minmax here*/

  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  HUMAN = -1;
  COMP = +1;

  /* Function to heuristic evaluation of state. */
  evalute(state) {
    var score = 0;

    if (this.gameOver(state, this.COMP)) {
      score = +1;
    } else if (this.gameOver(state, this.HUMAN)) {
      score = -1;
    } else {
      score = 0;
    }

    return score;
  }

  /* This  tests if a specific player wins */
  gameOver(state, player) {
    var win_state = [
      [state[0][0], state[0][1], state[0][2]],
      [state[1][0], state[1][1], state[1][2]],
      [state[2][0], state[2][1], state[2][2]],
      [state[0][0], state[1][0], state[2][0]],
      [state[0][1], state[1][1], state[2][1]],
      [state[0][2], state[1][2], state[2][2]],
      [state[0][0], state[1][1], state[2][2]],
      [state[2][0], state[1][1], state[0][2]]
    ];

    for (var i = 0; i < 8; i++) {
      var line = win_state[i];
      var filled = 0;
      for (var j = 0; j < 3; j++) {
        if (line[j] == player) filled++;
      }
      if (filled == 3) return true;
    }
    return false;
  }

  /* This  test if the human or computer wins */
  gameOverAll(state) {
    return this.gameOver(state, this.HUMAN) || this.gameOver(state, this.COMP);
  }

  emptyCells(state) {
    var cells = [];
    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        if (state[x][y] == 0) cells.push([x, y]);
      }
    }

    return cells;
  }

  /* A move is valid if the chosen cell is empty */
  validMove(x, y) {
    var empties = this.emptyCells(this.board);
    try {
      if (this.board[x][y] == 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  /* Set the move on board, if the coordinates are valid */
  setMove(x, y, player) {
    if (this.validMove(x, y)) {
      this.board[x][y] = player;
      return true;
    } else {
      return false;
    }
  }

  /* *** AI function that choice the best move *** */
  minimax(state, depth, player) {
    var best;

    if (player == this.COMP) {
      best = [-1, -1, -1000];
    } else {
      best = [-1, -1, +1000];
    }

    if (depth == 0 || this.gameOverAll(state)) {
      var score = this.evalute(state);
      return [-1, -1, score];
    }

    this.emptyCells(state).forEach(function(cell) {
      var x = cell[0];
      var y = cell[1];
      state[x][y] = player;
      var score = this.minimax(state, depth - 1, -player);
      state[x][y] = 0;
      score[0] = x;
      score[1] = y;

      if (player == this.COMP) {
        if (score[2] > best[2]) best = score;
      } else {
        if (score[2] < best[2]) best = score;
      }
    });

    return best;
  }

  /* It calls the minimax function */
  aiTurn() {
    var x, y;
    var move;
    var cell;

    if (this.emptyCells(this.board).length == 9) {
      x = Math.round(Math.random() * 3);
      y = Math.round(Math.random() * 3);
    } else {
      move = this.minimax(
        this.board,
        this.emptyCells(this.board).length,
        this.COMP
      );
      x = move[0];
      y = move[1];
    }

    if (this.setMove(x, y, this.COMP)) {
      cell = document.getElementById(String(x) + String(y));
      cell.innerHTML = "O";
    }
  }

  /* main */
  clickedCell(cell) {
    var button = document.getElementById("bnt-restart");
    //button.disabled = true;
    var conditionToContinue =
      this.gameOverAll(this.board) == false &&
      this.emptyCells(this.board).length > 0;

    if (conditionToContinue == true) {
      var x = cell.split("")[0];
      var y = cell.split("")[1];
      console.log("this is x : " + x, "this is y : " + y);
      var move = this.setMove(x, y, this.HUMAN);
      if (move == true) {
        cell.innerHTML = "X";
        if (conditionToContinue) this.aiTurn();
      }
    }
    if (this.gameOver(this.board, this.COMP)) {
      var lines;
      var cell;
      var msg;

      if (
        this.board[0][0] == 1 &&
        this.board[0][1] == 1 &&
        this.board[0][2] == 1
      )
        lines = [[0, 0], [0, 1], [0, 2]];
      else if (
        this.board[1][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[1][2] == 1
      )
        lines = [[1, 0], [1, 1], [1, 2]];
      else if (
        this.board[2][0] == 1 &&
        this.board[2][1] == 1 &&
        this.board[2][2] == 1
      )
        lines = [[2, 0], [2, 1], [2, 2]];
      else if (
        this.board[0][0] == 1 &&
        this.board[1][0] == 1 &&
        this.board[2][0] == 1
      )
        lines = [[0, 0], [1, 0], [2, 0]];
      else if (
        this.board[0][1] == 1 &&
        this.board[1][1] == 1 &&
        this.board[2][1] == 1
      )
        lines = [[0, 1], [1, 1], [2, 1]];
      else if (
        this.board[0][2] == 1 &&
        this.board[1][2] == 1 &&
        this.board[2][2] == 1
      )
        lines = [[0, 2], [1, 2], [2, 2]];
      else if (
        this.board[0][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[2][2] == 1
      )
        lines = [[0, 0], [1, 1], [2, 2]];
      else if (
        this.board[2][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[0][2] == 1
      )
        lines = [[2, 0], [1, 1], [0, 2]];

      for (var i = 0; i < lines.length; i++) {
        cell = document.getElementById(
          String(lines[i][0]) + String(lines[i][1])
        );
        cell.style.color = "red";
      }

      msg = document.getElementById("message");
      msg.innerHTML = "You lose!";
    }
    if (
      this.emptyCells(this.board).length == 0 &&
      !this.gameOverAll(this.board)
    ) {
      //var msg = document.getElementById("message");
      //msg.innerHTML = "Draw!";
    }
    if (
      this.gameOverAll(this.board) == true ||
      this.emptyCells(this.board).length == 0
    ) {
      //button.value = "Restart";
      //button.disabled = false;
    }
  }

  /* Restart the game*/
  restartBnt(button) {
    if (button.value == "Start AI") {
      this.aiTurn();
      button.disabled = true;
    } else if (button.value == "Restart") {
      var htmlBoard;
      var msg;

      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          this.board[x][y] = 0;
          htmlBoard = document.getElementById(String(x) + String(y));
          htmlBoard.style.color = "#444";
          htmlBoard.innerHTML = "";
        }
      }
      button.value = "Start AI";
      msg = document.getElementById("message");
      msg.innerHTML = "";
    }
  }
}
