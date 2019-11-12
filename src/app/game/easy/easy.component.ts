import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-easy",
  templateUrl: "./easy.component.html",
  styleUrls: ["./easy.component.css"]
})
export class EasyComponent implements OnInit {
  constructor(private toastrService: ToastrService) {}

  ngOnInit() {}
  /*Code of Minmax here*/

  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  HUMAN = -1;
  COMP = +1;

  Hscore = 0;
  Cscore = 0;
  DRAW = 0;

  justice = "./assets/libra.png";
  win = "./assets/trophy.png";
  loss = "./assets/game-over.png";

  restartDisable = false;
  restartText = "Start AI";

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
        this.toastrService.error("Invalid Move", "GameBot:");
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
      best = [-1, 0, -1000];
    } else {
      best = [0, 0, +1000];
    }

    if (depth == 0 || this.gameOverAll(state)) {
      var score = this.evalute(state);
      return [-1, -1, score];
    }

    // var scsore: number = this.minimax(state, depth - 1, -player);

    this.emptyCells(state).forEach(cell => {
      var x = cell[0];
      var y = cell[1];
      state[x][y] = player;
      var score = this.minimax(state, depth - 3, -player);
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

  // Get Random Number from 0 to 2
  getRandomNumber(min, max) {
    return Math.round(Number(Math.random() * (max - min) + min));
  }

  /* It calls the minimax function */
  aiTurn() {
    var x, y;
    var move;
    var cell;

    if (this.emptyCells(this.board).length === 9) {
      console.log(this.emptyCells(this.board).length);
      x = this.getRandomNumber(0, 2);
      y = this.getRandomNumber(0, 2);
      console.log("x+y for empty : " + x + y);
    } else {
      move = this.minimax(
        this.board,
        this.emptyCells(this.board).length,
        this.COMP
      );
      x = move[0];
      y = move[1];
    }
    this.placethepointer(x, y, this.COMP);
    console.log(this.COMP);
  }

  placethepointer(x, y, player) {
    var cell;
    if (this.setMove(x, y, player)) {
      cell = document.getElementById(String(x) + String(y));
      if (player === 1) {
        cell.className = "O animated pulse";
        cell.innerHTML = "O";
      } else if (player === -1) {
        cell.className = "X animated pulse";
        cell.innerHTML = "X";
      }
      console.log("O" + " is placed at " + x + y);
    }
  }

  gameinprogress(valid) {
    if (valid === true) {
      this.restartText = "Restart";
      this.restartDisable = false;
    } else {
      this.restartText = "";
      this.restartDisable = false;
    }
  }

  calculatescore(won) {
    if (won == this.HUMAN) {
      this.Hscore++;
    } else if (won == this.COMP) {
      this.Cscore++;
    } else {
      this.DRAW++;
    }
  }

  /* main */
  clickedCell(x, y) {
    cell = document.getElementById(String(x) + String(y));

    this.restartDisable = true;
    var conditionToContinue =
      this.gameOverAll(this.board) == false &&
      this.emptyCells(this.board).length > 0;

    if (conditionToContinue == true) {
      this.gameinprogress(true);
      console.log("this is x : " + x, " y : " + y);
      this.placethepointer(x, y, this.HUMAN);
      if (conditionToContinue) this.aiTurn();
    }
    var lines;
    var cell;

    // If computer is played
    if (this.gameOver(this.board, this.COMP)) {
      if (
        this.board[0][0] == 1 &&
        this.board[0][1] == 1 &&
        this.board[0][2] == 1
      )
        lines = [
          [0, 0],
          [0, 1],
          [0, 2]
        ];
      else if (
        this.board[1][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[1][2] == 1
      )
        lines = [
          [1, 0],
          [1, 1],
          [1, 2]
        ];
      else if (
        this.board[2][0] == 1 &&
        this.board[2][1] == 1 &&
        this.board[2][2] == 1
      )
        lines = [
          [2, 0],
          [2, 1],
          [2, 2]
        ];
      else if (
        this.board[0][0] == 1 &&
        this.board[1][0] == 1 &&
        this.board[2][0] == 1
      )
        lines = [
          [0, 0],
          [1, 0],
          [2, 0]
        ];
      else if (
        this.board[0][1] == 1 &&
        this.board[1][1] == 1 &&
        this.board[2][1] == 1
      )
        lines = [
          [0, 1],
          [1, 1],
          [2, 1]
        ];
      else if (
        this.board[0][2] == 1 &&
        this.board[1][2] == 1 &&
        this.board[2][2] == 1
      )
        lines = [
          [0, 2],
          [1, 2],
          [2, 2]
        ];
      else if (
        this.board[0][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[2][2] == 1
      )
        lines = [
          [0, 0],
          [1, 1],
          [2, 2]
        ];
      else if (
        this.board[2][0] == 1 &&
        this.board[1][1] == 1 &&
        this.board[0][2] == 1
      )
        lines = [
          [2, 0],
          [1, 1],
          [0, 2]
        ];
      if (this.gameOver(this.board, this.HUMAN)) {
        console.log("human win!");
      }
      console.log("LINES : " + lines);
      for (var i = 0; i < lines.length; i++) {
        cell = document.getElementById(
          String(lines[i][0]) + String(lines[i][1])
        );
        cell.className = "red";
      }
    }
    // If Human is played
    if (this.gameOver(this.board, this.HUMAN)) {
      if (
        this.board[0][0] == -1 &&
        this.board[0][1] == -1 &&
        this.board[0][2] == -1
      )
        lines = [
          [0, 0],
          [0, 1],
          [0, 2]
        ];
      else if (
        this.board[1][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[1][2] == -1
      )
        lines = [
          [1, 0],
          [1, 1],
          [1, 2]
        ];
      else if (
        this.board[2][0] == -1 &&
        this.board[2][1] == -1 &&
        this.board[2][2] == -1
      )
        lines = [
          [2, 0],
          [2, 1],
          [2, 2]
        ];
      else if (
        this.board[0][0] == -1 &&
        this.board[1][0] == -1 &&
        this.board[2][0] == -1
      )
        lines = [
          [0, 0],
          [1, 0],
          [2, 0]
        ];
      else if (
        this.board[0][1] == -1 &&
        this.board[1][1] == -1 &&
        this.board[2][1] == -1
      )
        lines = [
          [0, 1],
          [1, 1],
          [2, 1]
        ];
      else if (
        this.board[0][2] == -1 &&
        this.board[1][2] == -1 &&
        this.board[2][2] == -1
      )
        lines = [
          [0, 2],
          [1, 2],
          [2, 2]
        ];
      else if (
        this.board[0][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[2][2] == -1
      )
        lines = [
          [0, 0],
          [1, 1],
          [2, 2]
        ];
      else if (
        this.board[2][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[0][2] == -1
      )
        lines = [
          [2, 0],
          [1, 1],
          [0, 2]
        ];
      if (this.gameOver(this.board, this.HUMAN)) {
        console.log("human win!");
      }
      console.log("LINES : " + lines);
      for (var i = 0; i < lines.length; i++) {
        cell = document.getElementById(
          String(lines[i][0]) + String(lines[i][1])
        );
        cell.className = "red";
      }
    }
    // Display message according to who won the match
    if (this.gameOver(this.board, this.COMP)) {
      this.calculatescore(this.COMP);
      this.toastrService.success("You Lose!", "GameBot:");
    } else if (this.gameOver(this.board, this.HUMAN)) {
      this.calculatescore(this.HUMAN);
      this.toastrService.success("You Win!", "GameBot:");
    }
    // Display DRAW
    if (
      this.emptyCells(this.board).length == 0 &&
      !this.gameOverAll(this.board)
    ) {
      this.calculatescore("DRAW");
      this.toastrService.warning("Game DRAW!", "GameBot:");
    }
    if (
      this.gameOverAll(this.board) == true ||
      this.emptyCells(this.board).length == 0
    ) {
      this.restartText = "Restart";
      this.restartDisable = false;
    }
  }

  /* Restart the game*/
  restartBnt() {
    if (this.restartText === "Start AI") {
      this.toastrService.warning("Sure , AI will play first !", "GameBot:");
      this.aiTurn();
      console.log("Okay AI will play");
      this.restartDisable = false;
      this.restartText = "Restart";
    } else if (this.restartText === "Restart") {
      var htmlBoard;
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          this.board[x][y] = 0;
          htmlBoard = document.getElementById(String(x) + String(y));
          htmlBoard.innerHTML = "";
        }
      }
      this.restartText = "Start AI";
      this.restartDisable = false;
    }
  }
}
