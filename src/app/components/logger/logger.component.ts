import { Component, Input } from '@angular/core';
import { GameLogger } from 'src/objects/game-logger';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.scss']
})
export class LoggerComponent {

  @Input() logger = new GameLogger();

  
}
