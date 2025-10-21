import { Component } from "../core/Component.js";

export class Scoreboard extends Component {
    constructor(selector, { currentPlayer, winner }) {
        super(selector);
        this.currentPlayer = currentPlayer;
        this.winner = winner;
    }

    template() {
        if (this.winner) {
            return `<h2>Победил игрок: ${this.winner}</h2>`
        };
        return `<h2>Ход игрока: <span>${this.currentPlayer}</span></h2>`;
    }
}