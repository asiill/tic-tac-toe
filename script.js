const player = (sign) => {
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return {getSign};
};

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getSign = (index) => {
        return board[index];
    };

    const setSign = (index, sign) => {
        board[index] = sign;
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    };

    return {getSign, setSign, resetBoard};
})();

const gameController = (() => {
    const playerX = player("X");
    const playerY = player("Y");
    let currentPlayer = playerX;
    let round = 0;
    let gameOver = false;
    let winner = "";

    const switchCurrentPlayer = () => {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
    };

    const isGameOver = () => {
        return gameOver;
    };

    const resetGame = () => {
        currentPlayer = playerX;
        round = 0;
        gameOver = false;
        winner = "";
    };

    const playRound = (index) => {
        gameBoard.setSign(index, currentPlayer.getSign());
        
        if (checkForWinner() === true) {
            gameOver = true;
            screenController.setGameResult(winner);
            resetGame();

        } else if (round === 8) {
            gameOver = true;
            winner = "tie";
            screenController.setGameResult(winner);
            resetGame();
        } else {
            switchCurrentPlayer();
            screenController.setCurrentPlayer(currentPlayer);
            round++;
        }
    };

    const checkForWinner = () => {
        const combinations = [
            [0, 4, 8],
            [2, 4, 6],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        
        for (let i = 0; i < combinations.length; i++) {
            let [a, b, c] = combinations[i];
            if (gameBoard.getSign(a) !== "" && gameBoard.getSign(a) === gameBoard.getSign(b) && gameBoard.getSign(a) === gameBoard.getSign(c)) {
                winner = gameBoard.getSign(a);
                return true;
            }
        }

        return false;
    };

    return {isGameOver, resetGame, playRound};
})();

const screenController = (() => {
    const screenCells = document.querySelectorAll(".cell");
    const gameResult = document.getElementById("game-result");
    const currentPlayer = document.getElementById("current-player");
    const resetBtn = document.getElementById("reset-btn");

    currentPlayer.textContent = "Player X";

    const updateScreen = () => {
        for(i = 0; i < screenCells.length; i++) {
            screenCells[i].textContent = gameBoard.getSign(i);
        }
    };

    const setCurrentPlayer = (player) => {
        currentPlayer.textContent = "Player " + player.getSign();
    };

    const setGameResult = (winner) => {
        if (winner === "tie") {
            gameResult.textContent = "It's a tie";
        }
        else {
            gameResult.textContent = "Player " + winner + " wins";
        }
    }

    screenCells.forEach(cell => cell.addEventListener("click", (e) => {
        if (e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.id));
        updateScreen();
    }));

    resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        updateScreen();
        gameController.resetGame();
        currentPlayer.textContent = "Player X";
        gameResult.textContent = "";
    });

    return {setCurrentPlayer, setGameResult};
})();