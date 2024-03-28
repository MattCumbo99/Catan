import { MaterialEnum } from "./material-enum";

/**
 * A class meant as an identifier for a resource bundle.
 */
export class MaterialBundle {

    wood: number;
    brick: number;
    sheep: number;
    stone: number;
    wheat: number;

    constructor(materialInventory?: Map<MaterialEnum, number> | Record<string, number>) {
        if (materialInventory && materialInventory instanceof Map) {
            this.wood = materialInventory.get(MaterialEnum.Wood)!;
            this.brick = materialInventory.get(MaterialEnum.Brick)!;
            this.sheep = materialInventory.get(MaterialEnum.Sheep)!;
            this.stone = materialInventory.get(MaterialEnum.Stone)!;
            this.wheat = materialInventory.get(MaterialEnum.Wheat)!;
        } else if (materialInventory) {
            this.wood = materialInventory['wood'];
            this.brick = materialInventory['brick'];
            this.sheep = materialInventory['sheep'];
            this.wheat = materialInventory['wheat'];
            this.stone = materialInventory['stone'];
        } else {
            this.wood = 0;
            this.brick = 0;
            this.sheep = 0;
            this.stone = 0;
            this.wheat = 0;
        }
    }

    /**
     * Checks if this bundle has enough of a specified amount of materials.
     * 
     * @param required Required materials
     * @returns true if the materials requested can be afforded
     */
    hasRequired(required: Record<string, number>): boolean {
        for (const material in required) {
            const amountNeeded = required[material];
            if (this.get(material) < amountNeeded) {
                return false;
            }
        }

        return true;
    }

    /**
     * Gets the total number of materials in this bundle.
     * 
     * @returns Sum of each material
     */
    totalAmount(): number {
        return this.wood + this.brick + this.sheep + this.wheat + this.stone;
    }

    /**
     * Gets the amount of a material this bundle has.
     * 
     * @param material String name of the material
     * @returns Amount of material
     */
    get(material: string): number {
        switch (material.toLowerCase()) {
            case "wood":
                return this.wood;
            case "brick":
                return this.brick;
            case "sheep":
                return this.sheep;
            case "wheat":
                return this.wheat;
            case "stone":
                return this.stone;
            default:
                throw new Error(`Unknown material requested: ${material}`);
        }
    }

    set(material: MaterialEnum, amount: number): void {
        switch (material) {
            case MaterialEnum.Wood:
                this.wood = amount;
                break;
            case MaterialEnum.Brick:
                this.brick = amount;
                break;
            case MaterialEnum.Sheep:
                this.sheep = amount;
                break;
            case MaterialEnum.Wheat:
                this.wheat = amount;
                break;
            case MaterialEnum.Stone:
                this.stone = amount;
                break;
            default:
                throw new Error(`Cannot set unknown material ${material} to ${amount}`);
        }
    }

    /**
     * Gets this material bundle as an enum mapping.
     * 
     * @returns MaterialEnum mapping
     */
    toMap(): Map<MaterialEnum, number> {
        return new Map([
            [MaterialEnum.Wood, this.wood],
            [MaterialEnum.Brick, this.brick],
            [MaterialEnum.Sheep, this.sheep],
            [MaterialEnum.Stone, this.stone],
            [MaterialEnum.Wheat, this.wheat],
        ]);
    }

    toString(): string {
        let strResult = "";
        let firstStringPart = true;
        const bundleMap = this.toMap();

        bundleMap.forEach((amount: number, material: MaterialEnum) => {
            if (amount > 0) {
                if (firstStringPart) {
                    strResult = `${amount} ${material}`;
                    firstStringPart = false;
                } else {
                    strResult += `, ${amount} ${material}`;
                }
            }
        });

        return strResult;
    }
}