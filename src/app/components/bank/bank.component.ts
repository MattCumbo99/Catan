import { Component, Input } from '@angular/core';
import { Bank } from 'src/objects/bank';
import { MaterialEnum } from 'src/objects/material-enum';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent {

    @Input() bank = new Bank();
    
    getWood(): number {
      return this.bank.getMaterialAmount(MaterialEnum.Wood);
    }

    getBrick(): number {
      return this.bank.getMaterialAmount(MaterialEnum.Brick);
    }

    getSheep(): number {
      return this.bank.getMaterialAmount(MaterialEnum.Sheep);
    }

    getWheat(): number {
      return this.bank.getMaterialAmount(MaterialEnum.Wheat);
    }

    getStone(): number {
      return this.bank.getMaterialAmount(MaterialEnum.Stone);
    }

    getDevCards(): number {
      return this.bank.getTotalDevCards();
    }
}
