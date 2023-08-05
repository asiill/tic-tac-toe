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

    const switchCurrentPlayer = () => {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
    };

    const playRound = (index) => {
        gameBoard.setSign(index, currentPlayer.getSign());
        switchCurrentPlayer();
        screenController.setCurrentPlayer(currentPlayer);
    };

    return {playRound};
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
    }

    screenCells.forEach(cell => cell.addEventListener("click", (e) => {
        if (e.target.textContent !== "") return;
        gameController.playRound(parseInt(e.target.id));
        updateScreen();
    }));

    resetBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        updateScreen();
    });

    return {setCurrentPlayer};
})();