import { Component } from "../core/Component.js";
import { Cell } from "./Cell.js";

export class Board extends Component {
    constructor(selector, { board, onCellClick }) {
        super(selector);
        this.board = board;
        this.onCellClick = onCellClick;
    }

    template() {
        return `${this.board.map((value, i) => `<div id="cell-${i}"></div>`).join("")}`;
    }

    initListeners() {
        this.board.forEach((cell, i) => {
            new Cell(`#cell-${i}`, {
                index: i,
                value: cell,
                onClick: this.onCellClick,
            }).render();
        });
    }
}