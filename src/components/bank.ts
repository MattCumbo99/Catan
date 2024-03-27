import { ArrayUtils } from "src/utils/array-utils";
import { DevCardEnum } from "./development-card";
import { MaterialEnum } from "./material-enum";
import { PieceColorEnum } from "./piece-color";
import { PieceEnum } from "./piece-enum";
import { Player } from "./player";
import { MaterialBundle } from "./material-bundle";

export class Bank extends Player {

    devCards = new Array<DevCardEnum>();

    constructor() {
        super(PieceColorEnum.Bank);

        this.initializeMaterials();
        this.initializePieces();
        this.initializeDevCards();
    }

    /**
     * Checks if this bank has enough of a material to distribute.
     * 
     * @param material Material to check
     * @param amountNeeded The amount needed to distribute
     * @returns true if the bank has enough
     */
    hasEnoughMaterials(material: MaterialEnum, amountNeeded: number): boolean {
        const currentAmount = this.getMaterialInventory().get(material)!;
        return currentAmount >= amountNeeded;
    }

    /**
     * Checks if this bank has at least one development card left.
     * 
     * @returns true if devcards is not empty
     */
    hasDevCards(): boolean {
        return this.devCards.length > 0;
    }

    /**
     * Removes a development card from this bank and gives it to a specified player.
     * 
     * @param player Player to give the development card
     */
    giveRandomDevCard(player: Player): void {
        player.addDevCard(this.devCards.pop()!);
    }

    /**
     * > METHOD UNAVAILABLE TO THE BANK
     * 
     * Throws an error.
     */
    override obtainPort(material: MaterialEnum): void {
        throw new Error("The bank attempted to obtain a port for itself.");
    }

    /**
     * > METHOD UNAVAILABLE TO THE BANK
     * 
     * Throws an error.
     */
    override buyPiece(piece: PieceEnum, bank: Bank): void {
        throw new Error("The bank cannot purchase from itself!");
    }

    /**
     * > METHOD UNAVAILABLE TO THE BANK
     * 
     * Throws an error.
     */
    override robRandomMaterial(player: Player): void {
        throw new Error("The bank cannot rob a player!");
    }

    /**
     * > METHOD UNAVAILABLE TO THE BANK
     * 
     * Throws an error.
     */
    override monopolize(material: MaterialEnum, players: Player[]): void {
        throw new Error("The bank cannot monopilize!");
    }

    private initializeMaterials(): void {
        const materials = new MaterialBundle(
            {
                "wood": 19,
                "brick": 19,
                "sheep": 19,
                "wheat": 19,
                "stone": 19
            }
        );

        super.setMaterialInventory(materials);
    }

    private initializePieces(): void {
        const pieceInventory = new Map<PieceEnum, number>([
            [PieceEnum.Road, 0],
            [PieceEnum.Settlement, 0],
            [PieceEnum.City, 0]
        ]);

        super.setPieceInventory(pieceInventory);
    }

    private initializeDevCards(): void {
        this.addDevCards(DevCardEnum.Knight, 14);
        this.addDevCards(DevCardEnum.VictoryPoint, 5);
        this.addDevCards(DevCardEnum.RoadBuilder, 2);
        this.addDevCards(DevCardEnum.Monopoly, 2);
        this.addDevCards(DevCardEnum.YearOfPlenty, 2);

        ArrayUtils.shuffle(this.devCards);
    }

    private addDevCards(devCard: DevCardEnum, amount: number): void {
        for (let i = amount; i > 0; i--) {
            this.devCards.push(devCard);
        }
    }
}