
export class Dice {

    private numberTotals = new Array<number>();

    constructor() {
        this.initializeTotals();
    }

    /**
     * Gets the combined result of two dice rolls.
     * 
     * @param rolls The roll tuple
     * @returns Sum of each dice roll
     */
    static rollSum(rolls: Array<number>): number {
        return rolls[0] + rolls[1];
    }

    /**
     * Gets the total amount of times a specified number has been rolled.
     * 
     * @param roll The roll result to check
     * @returns Total amount of times that number has been rolled
     */
    getTotalRolled(roll: number): number {
        return this.numberTotals[roll-1];
    }

    /**
     * Randomly rolls two dice. Records the total and returns the results.
     * 
     * @returns Tuple containing the results of each die
     */
    rollTwo(): Array<number> {
        const dice1 = this.getRandomRoll();
        const dice2 = this.getRandomRoll();
        const total = dice1 + dice2;
        this.recordRoll(total);

        return [dice1, dice2];
    }

    private recordRoll(roll: number): void {
        this.numberTotals[roll-1] += 1;
    }

    private getRandomRoll(): number {
        const min = 1;
        const max = 6;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private initializeTotals(): void {
        const possibleRolls = 11;
        for (let i = 0; i < possibleRolls; i++) {
            this.numberTotals.push(0);
        }
    }
}