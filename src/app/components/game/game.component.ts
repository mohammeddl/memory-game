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
  template: `
    <div class="game-container">
      <div class="game-board" *ngIf="(gameService.gameState$ | async) as gameState">
        <app-score [score]="gameState.score" [level]="gameState.level"></app-score>
        
        <app-interface
          [sequence]="gameState.sequence"
          [playerSequence]="gameState.playerSequence"
          [isShowingSequence]="gameState.isShowingSequence"
          [availableColors]="gameState.availableColors"
          (colorClick)="onColorClick($event)">
        </app-interface>

        <div class="controls" *ngIf="!gameState.gameOver">
          <button 
            class="start-btn"
            *ngIf="!gameState.isPlaying" 
            (click)="startGame()">
            Commencer
          </button>
          
          <div class="game-buttons" *ngIf="gameState.isPlaying && !gameState.isShowingSequence">
            <button class="validate-btn" (click)="submitSequence()">Valider</button>
            <button class="reset-btn" (click)="resetSequence()">Réinitialiser</button>
          </div>
        </div>

        <app-game-over 
          *ngIf="gameState.gameOver"
          [score]="gameState.score"
          (restart)="startGame()">
        </app-game-over>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    
    .game-board {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .controls {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.5rem 1rem;
      font-size: 1.2rem;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .start-btn {
      background-color: #4CAF50;
      color: white;
    }

    .validate-btn {
      background-color: #2196F3;
      color: white;
    }

    .reset-btn {
      background-color: #f44336;
      color: white;
    }

    button:hover {
      opacity: 0.8;
    }
  `]
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