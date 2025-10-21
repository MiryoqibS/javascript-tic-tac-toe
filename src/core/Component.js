export class Component {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }

    render() {
        if (!this.$el) throw new Error(`Элемент ${selector} не найден`);
        this.$el.innerHTML = this.template();
        this.initListeners();
    }

    template() { return "" }
    initListeners() { }
}