import { MaterialBundle } from "src/objects/material-bundle";
import { MaterialEnum } from "src/objects/material-enum";

export class ArrayUtils {

    private constructor() {
        throw new Error("Cannot instantiate static class!");
    }
    
    /**
     * Randomizes elements in an array.
     * 
     * @param array Array to randomize
     */
    static shuffle(array: Array<Object>): void {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }

    /**
     * Converts a map with quantity values to an array with the amounts specified.
     * 
     * @param inventory Map to reference
     * @returns Array with quantified items
     */
    static inventoryToArray<T>(inventory: Map<T, number>): Array<T> {
        const array = new Array<T>();
        inventory.forEach((amount: number, item: T) => {
            for (let i = amount; i > 0; i--) {
                array.push(item);
            }
        });
        return array;
    }

    static materialsToArray(bundle: MaterialBundle): Array<MaterialEnum> {
        return this.inventoryToArray<MaterialEnum>(bundle.toMap());
    } 
}