import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bank } from 'src/objects/bank';
import { PieceColorEnum } from 'src/objects/piece-color';
import { Player } from 'src/objects/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Catan';
  bank = new Bank();
  player1 = new Player(PieceColorEnum.Blue);
  player2 = new Player(PieceColorEnum.Red);
  player3 = new Player(PieceColorEnum.Green);
  player4 = new Player(PieceColorEnum.Yellow);

  resultingRoll = 3;
}
