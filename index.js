const TicTac = {
    cPlayer: "X",                                   // tracks current player (X and O)
    state: Array(9).fill(null),                         // board state (null for empty)
    gameOver: false,                                     // indicate if the game is over
    
    // Initialize the game
    init() {                                                   //method
      this.cBoard();                                           //dynamically generate and display the board
      document
        .getElementById("reset")
        .addEventListener("click", () => this.reset());       //in this reset buttton to call and when clicked
    },
  
    // Create the game board dynamically
    cBoard() {                                         //method
      const board = document.getElementById("board");      //atrget board which exist in HTML
      board.innerHTML = "";                               // clear previous board,existing content
      this.state.forEach((_, i) => {                     //array representing the board
        const cell = document.createElement("div");      //creat a div element
        cell.classList.add("cell");                      //class of cell
        cell.dataset.index = i;                         //it assign data index
        board.appendChild(cell);
      });
      board.addEventListener("click", (e) => this.handleClick(e));//eventlistner indentify the action of event and call this.handleClick(e)
      this.uMessage(`Player ${this.cPlayer}'s turn`);      //display a message by its calling
    },
  
    // Handle a cell click
    handleClick(e) {                                   //method handle the logic 
      const cell = e.target;
      const i = cell.dataset.index;
  
      // Ignore clicks if game is over or cell is taken
      if (this.gameOver || !cell.classList.contains("cell") || this.state[i]) return;
  
      // Update board state and UI
      this.state[i] = this.cPlayer;                       //it check if element valid,and if cell empty
      cell.textContent = this.cPlayer;
      cell.classList.add("taken");
  
      // Check for winner or tie
      const winCombo = this.checkWin();                      //it check if current player is win
      if (winCombo) {
        this.Highlight(winCombo);                              //it highlite win
        this.uMessage(`Player ${this.cPlayer} wins!`);         // dislay winnner message
        this.gameOver = true;                                //set gameover
      } else if (this.state.every((cell) => cell)) {
        this.uMessage("It is a tie!");                         //if all combination false
        this.gameOver = true;
      } else {
        this.cPlayer = this.cPlayer === "X" ? "O" : "X";
        this.uMessage(`Player ${this.cPlayer}'s turn`);
      }
    },
  
    // Check if there is a winning combination
    checkWin() {
      const wins = [                                               //alll combination when win occur
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // columns
        [0, 4, 8],
        [2, 4, 6], // diagonals
      ];
      return wins.find((combo) =>
        combo.every((i) => this.state[i] === this.cPlayer)        //it check all current player fill winning combination
      );
    },
  
    // Highlight winning cells
    Highlight(combo) {                                             //it take win combination
      combo.forEach((i) => {
        document.getElementById("board").children[i].style.color = "red"; //it indicate the cell made up the winning combination with color
      });
    },
  
    // Reset the game
    reset() {                                              //method to reset the game to initial state
      this.state = Array(9).fill(null);                   //it show alll celll are empty
      this.cPlayer = "X";                                  //it set back to x player to start
      this.gameOver = false;                                //it indicate game is no longer over
      this.cBoard();                                     //again generate the board
    },
  
    // Update the message
    uMessage(msg) {                                       //method update the messagesand indicate whose turn or result
      document.getElementById("message").textContent = msg;
    },
  };
  
  // Initialize the game
  TicTac.init();                                          //calling of init; this set the and prepare everything for user
  
