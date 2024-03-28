import { MaterialEnum } from 'src/objects/material-enum';
import * as rulesJson from '../assets/rules.json';
import { DevCardEnum } from 'src/objects/development-card';

/**
 * A static class that reads information from `rules.json`.
 */
export class RuleReader {

    private static rules = rulesJson;

    private constructor() {
        throw new Error("Cannot instantiate static class!");
    }

    /**
     * Checks if the friendly robber rule is enabled.
     * 
     * @returns true if friendly robber is on
     */
    static friendlyRobber(): boolean {
        return this.rules['gameSettings']['friendlyRobber'];
    }

    /**
     * Gets the maximum amount of cards players can have when a robber gets rolled.
     * 
     * @returns Discard amount
     */
    static discardAmount(): number {
        return this.rules['gameSettings']['discardAmount'];
    }

    /**
     * Gets the amount of victory points required to win the game.
     * 
     * @returns Total victory points needed
     */
    static winScore(): number {
        return this.rules['gameSettings']['winScore'];
    }

    /**
     * Gets the amount of material cards for a specific resource.
     * 
     * @param material Material to check
     * @returns Total amount available
     */
    static resourceAmount(material: MaterialEnum): number {
        const materials = this.rules['cardTotals']['materials'];
        switch (material) {
            case MaterialEnum.Wood:
                return materials['wood'];
            case MaterialEnum.Brick:
                return materials['brick'];
            case MaterialEnum.Sheep:
                return materials['sheep'];
            case MaterialEnum.Stone:
                return materials['stone'];
            case MaterialEnum.Wheat:
                return materials['wheat'];
            default:
                throw new Error(`Invalid material specified: ${material}`);
        }
    }

    /**
     * Gets the amount of a specified development card in the bank.
     * 
     * @param devcard Development card
     * @returns Total amount available
     */
    static devCardAmount(devcard: DevCardEnum): number {
        const devCards = this.rules['cardTotals']['devCards'];
        switch (devcard) {
            case DevCardEnum.Knight:
                return devCards['knight'];
            case DevCardEnum.VictoryPoint:
                return devCards['victoryPoint'];
            case DevCardEnum.RoadBuilder:
                return devCards['roadBuilder'];
            case DevCardEnum.YearOfPlenty:
                return devCards['yearOfPlenty'];
            case DevCardEnum.Monopoly:
                return devCards['monopoly'];
            default:
                throw new Error(`Invalid development card specified: ${devcard}`);
        }
    }
}