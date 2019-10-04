import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-localmultiplayer",
  templateUrl: "./localmultiplayer.component.html",
  styleUrls: ["./localmultiplayer.component.css"]
})
export class LocalmultiplayerComponent implements OnInit {
  constructor(private toastrService: ToastrService) {}

  ngOnInit() {}

  /*Code of Minmax here*/

  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  PLAYER1 = -1;
  PLAYER2 = +1;
  restartDisable = false;
  restartText = "Opponent First !";
  CurrentPlayer = "Player1";
  StartingPlayer = "Player1";

  justice = "./assets/libra.png";
  win = "./assets/trophy.png";
  loss = "./assets/game-over.png";

  status(currentPlayer) {
    if (currentPlayer == "Player1") this.CurrentPlayer = "Player2";
    else this.CurrentPlayer = "Player1";
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
    return (
      this.gameOver(state, this.PLAYER1) || this.gameOver(state, this.PLAYER2)
    );
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
        console.log("INVALID MOVE");
        this.toastrService.error("Invalid Move", "GameBot:");
        return false;
      }
    } catch (e) {
      console.log("INVALID MOVE");
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
      console.log("INVALID MOVE");
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

  /* main */
  clickedCell(x, y) {
    cell = document.getElementById(String(x) + String(y));
    console.log(this.board);
    this.restartDisable = true;
    var conditionToContinue =
      this.gameOverAll(this.board) == false &&
      this.emptyCells(this.board).length > 0;

    if (conditionToContinue == true) {
      this.gameinprogress(true);
      console.log("this is x : " + x, " y : " + y);
      var move = this.setMove(x, y, this.PLAYER1);
      if (move == true && this.CurrentPlayer == "Player1") {
        cell.className = "X animated pulse";
        cell.innerHTML = "X";
        this.board[x][y] = -1;
        this.status(this.StartingPlayer);
        console.log("X" + this.CurrentPlayer);
      } else if (move == true && this.CurrentPlayer == "Player2") {
        cell.className = "O animated pulse";
        cell.innerHTML = "O";
        this.board[x][y] = 1;
        this.status(this.CurrentPlayer);
      }
    }
    var lines;
    var cell;
    var msg;
    // If computer is played
    if (this.gameOver(this.board, this.PLAYER2)) {
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
      if (this.gameOver(this.board, this.PLAYER1)) {
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
    if (this.gameOver(this.board, this.PLAYER1)) {
      if (
        this.board[0][0] == -1 &&
        this.board[0][1] == -1 &&
        this.board[0][2] == -1
      )
        lines = [[0, 0], [0, 1], [0, 2]];
      else if (
        this.board[1][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[1][2] == -1
      )
        lines = [[1, 0], [1, 1], [1, 2]];
      else if (
        this.board[2][0] == -1 &&
        this.board[2][1] == -1 &&
        this.board[2][2] == -1
      )
        lines = [[2, 0], [2, 1], [2, 2]];
      else if (
        this.board[0][0] == -1 &&
        this.board[1][0] == -1 &&
        this.board[2][0] == -1
      )
        lines = [[0, 0], [1, 0], [2, 0]];
      else if (
        this.board[0][1] == -1 &&
        this.board[1][1] == -1 &&
        this.board[2][1] == -1
      )
        lines = [[0, 1], [1, 1], [2, 1]];
      else if (
        this.board[0][2] == -1 &&
        this.board[1][2] == -1 &&
        this.board[2][2] == -1
      )
        lines = [[0, 2], [1, 2], [2, 2]];
      else if (
        this.board[0][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[2][2] == -1
      )
        lines = [[0, 0], [1, 1], [2, 2]];
      else if (
        this.board[2][0] == -1 &&
        this.board[1][1] == -1 &&
        this.board[0][2] == -1
      )
        lines = [[2, 0], [1, 1], [0, 2]];
      if (this.gameOver(this.board, this.PLAYER1)) {
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
    if (this.gameOver(this.board, this.PLAYER2)) {
      this.toastrService.success("O Wins!!", "GameBot:");
    } else if (this.gameOver(this.board, this.PLAYER1)) {
      this.toastrService.success("X Wins!!", "GameBot:");
    }
    // Display DRAW
    if (
      this.emptyCells(this.board).length == 0 &&
      !this.gameOverAll(this.board)
    ) {
      this.toastrService.info("DRAW !", "GameBot:");
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
    if (this.restartText === "Opponent First !") {
      console.log("Okay AI will play");
      this.restartDisable = false;
      this.restartText = "Restart";
      this.CurrentPlayer = "Player2";
      this.toastrService.warning("Switched to O , Start Playing !", "GameBot:");
    } else if (this.restartText === "Restart") {
      var htmlBoard;
      var msg;
      this.CurrentPlayer = "Player1";
      this.toastrService.warning("Switched to X , Start Playing !", "GameBot:");
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          this.board[x][y] = 0;
          htmlBoard = document.getElementById(String(x) + String(y));
          htmlBoard.innerHTML = "";
        }
      }
      this.restartText = "Opponent First !";
      this.restartDisable = true;
      msg = document.getElementById("message");
      msg.innerHTML = "";
    }
  }
  restartOnly() {
    location.reload();
  }
}
