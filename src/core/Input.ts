class InputHandler {
    private keys: Set<string> = new Set();

    constructor() {
        window.addEventListener('keydown', this.keyDown.bind(this));
        window.addEventListener('keyup', this.keyUp.bind(this));
    }

    private keyDown(event: KeyboardEvent) {
        this.keys.add(event.key);
    }

    private keyUp(event: KeyboardEvent) {
        this.keys.delete(event.key);
    }

    isKeyPressed(key: string): boolean {
        return this.keys.has(key);
    }
}

export default InputHandler;