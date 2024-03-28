import { Component, EventEmitter, Output } from '@angular/core';
import { Dice } from 'src/objects/dice';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent {

    dice = new Dice();
    firstDice = 1;
    secondDice = 2;

    @Output() resultRoll = new EventEmitter();

    imgPath = "/assets/dice";
    firstDiceImg = `${this.imgPath}/one.png`;
    secondDiceImg = `${this.imgPath}/two.png`;
    clicked = false;
    endTurnDisabled = true;

    rollDice(): void {
      this.clicked = true;
      const results = this.dice.rollTwo();
      this.firstDice = results[0];
      this.firstDiceImg = this.getImage(this.firstDice);
      this.secondDice = results[1];
      this.secondDiceImg = this.getImage(this.secondDice);
      this.resultRoll.emit(this.getRolledNumber());
      this.endTurnDisabled = false;
    }

    endTurn(): void {
      this.clicked = false;
      this.endTurnDisabled = true;
    }

    getImage(rollNumber: number): string {
      console.log(`Updating image to ${rollNumber}`);
      switch (rollNumber) {
        case 1:
          return `${this.imgPath}/one.png`;
        case 2:
          return `${this.imgPath}/two.png`;
        case 3:
          return `${this.imgPath}/three.png`;
        case 4:
          return `${this.imgPath}/four.png`;
        case 5:
          return `${this.imgPath}/five.png`;
        case 6:
          return `${this.imgPath}/six.png`;
        default:
          throw new Error(`Illegal number rolled: ${rollNumber}`);
      }
    }

    private getRolledNumber(): number {
      return this.firstDice + this.secondDice;
    }
}
