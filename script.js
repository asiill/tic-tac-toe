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

})();

const screenController = (() => {

})();