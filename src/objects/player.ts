import { ArrayUtils } from "src/utils/array-utils";
import { Bank } from "./bank";
import { DevCardEnum } from "./development-card";
import { MaterialEnum } from "./material-enum";
import { PieceColorEnum } from "./piece-color";
import { PieceEnum } from "./piece-enum";
import { MaterialBundle } from "./material-bundle";

export class Player {
    color: PieceColorEnum;
    longestRoadLength = 0;
    knights = 0;

    hasRoadAward = false;
    hasArmyAward = false;

    private victoryPoints = 0;

    private devCardInventory = new Map<DevCardEnum, number>([
        [DevCardEnum.Knight, 0],
        [DevCardEnum.VictoryPoint, 0],
        [DevCardEnum.RoadBuilder, 0],
        [DevCardEnum.YearOfPlenty, 0],
        [DevCardEnum.Monopoly, 0]
    ]);

    private invMaterials = new MaterialBundle();

    private pieceInventory = new Map<PieceEnum, number>([
        [PieceEnum.Road, 15],
        [PieceEnum.Settlement, 5],
        [PieceEnum.City, 4]
    ]);

    private bankCosts = new Map<MaterialEnum, number>([
        [MaterialEnum.Wood, 4],
        [MaterialEnum.Brick, 4],
        [MaterialEnum.Stone, 4],
        [MaterialEnum.Sheep, 4],
        [MaterialEnum.Wheat, 4]
    ]);

    constructor(color: PieceColorEnum) {
        this.color = color;
    }

    /**
     * Removes the required materials from this player's inventory and obtains the requested piece.
     * 
     * @param piece Piece to buy
     * @param bank The reference of the bank to return materials to
     */
    buyPiece(piece: PieceEnum, bank: Bank): void {
        const roadsLeft = this.pieceInventory.get(PieceEnum.Road)!;
        const settlementsLeft = this.pieceInventory.get(PieceEnum.Settlement)!;
        const citiesLeft = this.pieceInventory.get(PieceEnum.City)!;

        switch (piece) {
            case PieceEnum.Road:
                this.giveMaterial(MaterialEnum.Wood, 1, bank);
                this.giveMaterial(MaterialEnum.Brick, 1, bank);
                this.pieceInventory.set(PieceEnum.Road, roadsLeft - 1);
                console.log(`${this.color} placed a road.`);
                // TODO: Determine if the road is long
                console.warn("No check has been implemented to check for road award!");
                break;
            case PieceEnum.Settlement:
                this.giveMaterial(MaterialEnum.Wood, 1, bank);
                this.giveMaterial(MaterialEnum.Brick, 1, bank);
                this.giveMaterial(MaterialEnum.Sheep, 1, bank);
                this.giveMaterial(MaterialEnum.Wheat, 1, bank);
                this.pieceInventory.set(PieceEnum.Settlement, settlementsLeft - 1);
                this.victoryPoints += 1;
                console.log(`${this.color} placed a settlement.`);
                break;
            case PieceEnum.City:
                this.giveMaterial(MaterialEnum.Wheat, 2, bank);
                this.giveMaterial(MaterialEnum.Stone, 3, bank);
                this.pieceInventory.set(PieceEnum.City, citiesLeft - 1);
                this.pieceInventory.set(PieceEnum.Settlement, settlementsLeft + 1);
                this.victoryPoints += 1;
                console.log(`${this.color} placed a city.`);
                break;
            case PieceEnum.DevCard:
                this.giveMaterial(MaterialEnum.Stone, 1, bank);
                this.giveMaterial(MaterialEnum.Wheat, 1, bank);
                this.giveMaterial(MaterialEnum.Sheep, 1, bank);
                bank.giveRandomDevCard(this);
                console.log(`${this.color} bought a development card.`);
                break;
            default:
                throw new Error(`Unexpected piece being bought: ${piece}`);
        }
    }

    getDevCard(devcard: DevCardEnum): number {
        return this.devCardInventory.get(devcard)!;
    }

    /**
     * Gets the total amount of victory points this player possesses.
     * 
     * @param showHidden If the total should include points from victory point development cards
     * @returns Total victory point amount
     */
    getTotalVictoryPoints(showHidden: boolean = true): number {
        if (showHidden) {
            return this.victoryPoints + this.getTotalHiddenVictoryPoints();
        } else {
            return this.victoryPoints;
        }
    }

    /**
     * Checks if the player can purchase a piece item.
     * 
     * @param piece Piece to check
     * @param bank Bank reference which is used to check for development cards
     * @returns true if this player can buy the item
     */
    canBuyItem(piece: PieceEnum, bank: Bank): boolean {
        switch (piece) {
            case PieceEnum.Road:
                return (this.pieceInventory.get(PieceEnum.Road)! > 0 
                    && this.invMaterials.wood >= 1 && this.invMaterials.brick >= 1);
            case PieceEnum.Settlement:
                return (this.pieceInventory.get(PieceEnum.Settlement)! > 0 
                    && this.invMaterials.wood >= 1 && this.invMaterials.brick >= 1 && this.invMaterials.sheep >= 1 && this.invMaterials.wheat >= 1);
            case PieceEnum.City:
                return (this.pieceInventory.get(PieceEnum.City)! > 0 
                    && this.invMaterials.wheat >= 2 && this.invMaterials.stone >= 3);
            case PieceEnum.DevCard:
                return (bank.hasDevCards() && this.invMaterials.wheat >= 1 
                    && this.invMaterials.sheep >= 1 && this.invMaterials.stone >= 1);
            default:
                throw new Error(`Unknown piece being checked: ${piece}`);
        }
    }

    /**
     * Gets a reference to this player's material inventory.
     * 
     * @returns Map of materials
     */
    getMaterialInventory(): MaterialBundle {
        return this.invMaterials;
    }

    tradeMaterials(
        otherPlayer: Player,
        giveMaterials: MaterialBundle, 
        receiveMaterials: MaterialBundle
    ): void {
        this.assertValidTradeBundle(this, giveMaterials);
        this.assertValidTradeBundle(otherPlayer, receiveMaterials);

        // Give materials to receiver
        const giveMap = giveMaterials.toMap();
        giveMap.forEach((amount: number, material: MaterialEnum) => {
            if (amount > 0) {
                this.giveMaterial(material, amount, otherPlayer);
            }
        });

        // Take materials from receiver
        const receiveMap = receiveMaterials.toMap();
        receiveMap.forEach((amount: number, material: MaterialEnum) => {
            if (amount > 0) {
                otherPlayer.giveMaterial(material, amount, this);
            }
        });
    }

    private assertValidTradeBundle(player: Player, bundle: MaterialBundle): void {
        const bundleMap = bundle.toMap();

        for (let [material, amount] of bundleMap) {
            if (amount > 0 && player.getMaterialAmount(material) < amount) {
                throw new Error(`${player.color} does not have ${amount} ${material} to trade!`);
            }
        }
    }

    /**
     * Takes ALL of a specified material from a list of players.
     * 
     * @param material Material to take
     * @param players Players to take from
     */
    monopolize(material: MaterialEnum, players: Array<Player>): void {
        console.log(`${this.color} monopolized ${material}`);
        players.forEach((plr: Player) => {
            const materialAmount = plr.getMaterialAmount(material);
            if (materialAmount > 0) {
                plr.giveMaterial(material, materialAmount, this);
                console.log(`${this.color} stole ${materialAmount} ${material} from ${plr.color}`);
            }
        });
    }

    /**
     * Robs a random material from a player.
     * 
     * @param player Player to take from
     */
    robRandomMaterial(player: Player): void {
        if (player.getTotalMaterials() == 0) {
            throw new Error(`${this.color} attempted to rob empty inventory from ${player.color}`);
        }

        // Convert the player's inventory to an array to grab an evenly spread material
        const plrArray = ArrayUtils.materialsToArray(this.invMaterials);
        ArrayUtils.shuffle(plrArray);
        const stolenMaterial = plrArray.pop()!;
        player.giveMaterial(stolenMaterial, 1, this);

        console.log(`${this.color} stole 1 ${stolenMaterial} from ${player.color}`);
    }

    /**
     * Gives material(s) to another player.
     * 
     * @param material Material to give
     * @param amount Amount to give
     * @param receiver The player that obtains the item
     */
    giveMaterial(material: MaterialEnum, amount: number, receiver: Player): void {
        const currentAmount = this.getMaterialAmount(material);
        const newAmount = currentAmount - amount;

        if (newAmount < 0) {
            throw new Error(`${this.color} attemmpted to give unavailable resource ${material} (has: ${currentAmount}, gave: ${newAmount})`);
        }

        this.invMaterials.set(material, newAmount);

        receiver.addMaterial(material, amount);
    }

    /**
     * Gets the total amount of development cards held by this player.
     * 
     * @returns total development cards
     */
    getTotalDevCards(): number {
        let cardTotals = 0;
        this.devCardInventory.forEach((total: number, devcard: DevCardEnum) => {
            cardTotals += total;
        });
        return cardTotals;
    }

    /**
     * Gets the total amount of a specified material this player has.
     * 
     * @param material Material to count
     * @returns Total amount of the material
     */
    getMaterialAmount(material: MaterialEnum): number {
        return this.invMaterials.get(material);
    }

    /**
     * Gets the total amount of material cards held by this player.
     * 
     * @returns total material cards
     */
    getTotalMaterials(): number {
        return this.invMaterials.totalAmount();
    }

    /**
     * Adds a material of a specified amount to this player's inventory.
     * 
     * @param material Material to add
     * @param amount Amount to add
     */
    addMaterial(material: MaterialEnum, amount: number): void {
        const addedAmount = this.invMaterials.get(material)! + amount;
        this.invMaterials.set(material, addedAmount);
    }

    /**
     * Gets the total amount of victory point development cards held by this player.
     * 
     * @returns total points from development cards
     */
    getTotalHiddenVictoryPoints(): number {
        return this.devCardInventory.get(DevCardEnum.VictoryPoint)!;
    }

    /**
     * Adds a development card to this player's inventory.
     * 
     * @param devCard Development card to add
     */
    addDevCard(devCard: DevCardEnum): void {
        const currentAmount = this.devCardInventory.get(devCard)!;
        this.devCardInventory.set(devCard, currentAmount + 1);
    }

    /**
     * Updates the bank costs for a material when this player has a port. Using 
     * the 'Any' material updates the costs for a three to one port.
     * 
     * @param material Material of the port
     */
    obtainPort(material: MaterialEnum): void {
        switch (material) {
            case MaterialEnum.Any:
                // Player has a three to one port
                this.bankCosts.forEach((cost: number, material: MaterialEnum) => {
                    if (cost == 4) {
                        this.bankCosts.set(material, 3);
                    }
                });
                break;
            case MaterialEnum.None:
                throw new Error("Using 'None' as a port option is not valid!");
            default:
                // Resource port
                this.bankCosts.set(material, 2);
                break;
        }
    }

    /**
     * Changes the required amount of a specified material needed to trade with the bank.
     * 
     * @param material Material to update
     * @param newCost The new amount required
     */
    updateBankCost(material: MaterialEnum, newCost: number): void {
        if (!this.bankCosts.has(material)) {
            throw new Error(`Cannot update bank cost of material ${material}`);
        }

        this.bankCosts.set(material, newCost);
    }

    /**
     * Gets the cost of a specified material to trade with the bank.
     * 
     * @param material Material to check
     * @returns Cost of material
     */
    getBankCost(material: MaterialEnum): number {
        return this.bankCosts.get(material)!;
    }

    protected setMaterialInventory(inventory: MaterialBundle): void {
        this.invMaterials = inventory;
    }

    protected setPieceInventory(pieceInventory: Map<PieceEnum, number>): void {
        this.pieceInventory = pieceInventory;
    }
}

