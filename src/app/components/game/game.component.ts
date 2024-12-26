import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { InterfaceComponent } from '../interface/interface.component';
import { ScoreComponent } from '../score/score.component';
import { GameOverComponent } from '../game-over/game-over.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    InterfaceComponent,
    ScoreComponent,
    GameOverComponent
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  constructor(public gameService: GameService) {}

  startGame() {
    this.gameService.startGame();
  }

  onColorClick(color: string) {
    this.gameService.addPlayerInput(color);
  }

  submitSequence() {
    this.gameService.submitSequence();
  }

  resetSequence() {
    this.gameService.resetPlayerSequence();
  }
}