import { Component } from "../core/Component.js";

export class Cell extends Component {
    constructor(selector, { index, value, onClick }) {
        super(selector);
        this.index = index;
        this.value = value;
        this.onClick = onClick;
    }

    template() {
        return `
        <div class="cell" data-index="${this.index}">
            ${this.value || ""}
        </div>
        `;
    }

    initListeners() {
        this.$el.querySelector(`[data-index="${this.index}"]`).addEventListener("click", () => {
            this.onClick(this.index);
        });
    }
}