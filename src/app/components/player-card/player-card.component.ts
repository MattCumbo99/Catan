import { Component, Input } from '@angular/core';
import { PieceColorEnum } from 'src/objects/piece-color';
import { Player } from 'src/objects/player';
import { MaterialEnum } from 'src/objects/material-enum';
import { DevCardEnum } from 'src/objects/development-card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MaterialBundle } from 'src/objects/material-bundle';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss']
})
export class PlayerCardComponent {

  @Input() player = new Player(PieceColorEnum.None);
  @Input() diceResult = 3;

  hidden = false;

  victoryPoints(isHidden: boolean): string {
    const hiddenVP = this.player.getTotalHiddenVictoryPoints();
    const normalVP = this.player.getTotalVictoryPoints(false);
    const totalVP = this.player.getTotalVictoryPoints(true);

    if (hiddenVP > 0 && !isHidden) {
      return `${normalVP} (${totalVP})`;
    } else {
      return `${normalVP}`;
    }
  }

  getKnights(): number {
    return this.player.getDevCard(DevCardEnum.Knight);
  }

  getVictoryPointCards(): number {
    return this.player.getDevCard(DevCardEnum.VictoryPoint);
  }

  getRoadBuilders(): number {
    return this.player.getDevCard(DevCardEnum.RoadBuilder);
  }

  getMonopolies(): number {
    return this.player.getDevCard(DevCardEnum.Monopoly);
  }

  getYearOfPlenties(): number {
    return this.player.getDevCard(DevCardEnum.YearOfPlenty);
  }
  
  getWood(): number {
    return this.player.getMaterialAmount(MaterialEnum.Wood);
  }

  getBrick(): number {
    return this.player.getMaterialAmount(MaterialEnum.Brick);
  }

  getSheep(): number {
    return this.player.getMaterialAmount(MaterialEnum.Sheep);
  }

  getWheat(): number {
    return this.player.getMaterialAmount(MaterialEnum.Wheat);
  }

  getStone(): number {
    return this.player.getMaterialAmount(MaterialEnum.Stone);
  }
}

class MaterialRoll {

  materialRolls = new Array<MaterialBundle>();

  constructor() {
    for (let i = 0; i < 12; i++) {
      this.materialRolls.push(new MaterialBundle());
    }
  }

  getRolledMaterials(roll: number): MaterialBundle {
    return this.materialRolls.at(roll-1)!;
  }

  increaseMaterial(material: MaterialEnum, roll: number, increaseBy: number): void {
    const currentAmount = this.materialRolls.at(roll-1)?.get(material)!;
    this.materialRolls.at(roll-1)?.set(material, currentAmount + increaseBy);
  }

  setMaterial(material: MaterialEnum, roll: number, value: number): void {
    this.materialRolls.at(roll-1)?.set(material, value);
  }
}
