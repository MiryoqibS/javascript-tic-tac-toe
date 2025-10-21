import { Component } from "../core/Component.js";

export class ScorePlayer extends Component {
    constructor(selector, { playerCount, player }) {
        super(selector);
        this.count = playerCount;
        this.player = player;
    }

    template() {
        return `
        <div class="board__score-player" data-player="${this.player}">
            <h3 class="board__score-player__title">Player ${this.player} </br> SCORE </h3>
            <h2 class="board__score-player__count">${this.count}</h2>
        </div>
        `
    }
}