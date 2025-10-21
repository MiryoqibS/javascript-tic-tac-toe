import { Board } from "./components/Board.js";
import { Scoreboard } from "./components/Scoreboard.js";
import { ScorePlayer } from "./components/ScorePlayer.js";
import { Component } from "./core/Component.js";
import { Store } from "./core/Store.js";

export class App extends Component {
    constructor(selector) {
        super(selector);
        this.store = new Store({
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
            playerCrossCount: 0,
            playerNoughtCount: 0,
        })

        this.store.subscribe(() => this.render())
        this.render();
    }

    handleCellClick(index) {
        const { board, currentPlayer, winner, playerCrossCount, playerNoughtCount } = this.store.getState();
        let newCrossCount = playerCrossCount;
        let newNoughtCount = playerNoughtCount;

        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        const newWinner = this.checkWinner(newBoard);

        if (newWinner === "X") newCrossCount++;
        if (newWinner === "O") newNoughtCount++;

        this.store.setState({
            board: newBoard,
            currentPlayer: currentPlayer === "X" ? "O" : "X",
            winner: newWinner,
            playerCrossCount: newCrossCount,
            playerNoughtCount: newNoughtCount,
        });
    }

    checkWinner(board) {
        const combos = [
            [0, 4, 8],
            [2, 4, 6],
            [1, 4, 7],
            [0, 3, 6],
            [2, 5, 8],
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ];

        for (const [a, b, c] of combos) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            };
        };

        return null
    }

    resetGame() {
        const clearStore = {
            board: Array(9).fill(null),
            currentPlayer: "X",
            winner: null,
        };

        this.store.setState(clearStore);
    }

    render() {
        this.$el.innerHTML = this.template();
        const state = this.store.getState();

        new Board("#board", {
            board: state.board,
            onCellClick: this.handleCellClick.bind(this),
        }).render();

        new Scoreboard("#scoreboard", {
            currentPlayer: state.currentPlayer,
            winner: state.winner,
        }).render();

        new ScorePlayer("#playerCrossScore", {
            playerCount: state.playerCrossCount,
            player: "cross",
        }).render();

        new ScorePlayer("#playerNoughtScore", {
            playerCount: state.playerNoughtCount,
            player: "nought",
        }).render();
    }

    template() {
        return `
            <div class="container">
                <div id="playerCrossScore"></div>
                <div class="container__body">
                    <div id="scoreboard" class="board__score"></div>
                    <div id="board" class="board"></div>
                </div>
                <div id="playerNoughtScore"></div>
            </div>
        `
    }
}