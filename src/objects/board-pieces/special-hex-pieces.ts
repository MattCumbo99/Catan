import { HexPiece } from "./hex-piece";
import { MaterialEnum } from "../material-enum";

export class DesertHexPiece extends HexPiece {
    override hexType = MaterialEnum.None;
    override defaultNumber = 0;
    override allowNumbers = [0];
}

export class GoldHexPiece extends HexPiece {
    override hexType = MaterialEnum.Any;
    override defaultNumber = 6;
    override allowNumbers = [6, 8];
}

export class WaterHexPiece extends HexPiece {
    override hexType = MaterialEnum.None;
    override defaultNumber = 0;
    override allowNumbers = [0];
}
