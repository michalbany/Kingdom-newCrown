class WordState {
    private static instance: WordState;
    private worldBoundaries: { left: number, right: number };

    private constructor() {
        this.worldBoundaries = { left: 0, right: 1800 };
    }

    public static getInstance(): WordState {
        if (!WordState.instance) {
            WordState.instance = new WordState();
        }
        return WordState.instance;
    }

    public get boundaries(): { left: number, right: number } {
        return this.worldBoundaries;
    }

    public get center(): number {
        return (this.worldBoundaries.right - this.worldBoundaries.left) / 2;
    }

}
export const wordState = WordState.getInstance();