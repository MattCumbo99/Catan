import { MaterialEnum } from "../material-enum";
import { PieceColorEnum } from "../piece-color";

export abstract class HexPiece {
    /*  
     * EXAMPLE BOARD:
     *    __        __
     *  / 12 \ __ /    \
     *  \ __ / 10 \ __ /
     *  / 8  \ __ / 5  \
     *  \ __ / 4  \ __ /
     *       \ __ /
     */

    hidden = false;
    hasRobber = false;
    allowNumbers = new Array<number>();

    pointTop = new HexPoint();
    pointUpperLeft = new HexPoint();
    pointUpperRight = new HexPoint();
    pointLowerLeft = new HexPoint();
    pointLowerRight = new HexPoint();
    pointBottom = new HexPoint();

    roadUpperLeft = new HexRoad();
    roadUpperRight = new HexRoad();
    roadLeft = new HexRoad();
    roadRight = new HexRoad();
    roadLowerLeft = new HexRoad();
    roadLowerRight = new HexRoad();
    
    abstract defaultNumber: number;
    abstract hexType: MaterialEnum;
}

export class HexPoint {
    owner = PieceColorEnum.None;
    profit = 0;
}

export class HexRoad {
    owner = PieceColorEnum.None;
}
