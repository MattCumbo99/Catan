import { HexPiece } from "./hex-piece";
import { MaterialEnum } from "../material-enum";

export class WoodHexPiece extends HexPiece {
    override hexType = MaterialEnum.Wood;
    override defaultNumber = 8;
}

export class StoneHexPiece extends HexPiece {
    override hexType = MaterialEnum.Stone;
    override defaultNumber = 8;
}

export class WheatHexPiece extends HexPiece {
    override hexType = MaterialEnum.Wheat;
    override defaultNumber = 8;
}

export class SheepHexPiece extends HexPiece {
    override hexType = MaterialEnum.Sheep;
    override defaultNumber = 8;
}

export class BrickHexPiece extends HexPiece {
    override hexType = MaterialEnum.Brick;
    override defaultNumber = 8;
}
