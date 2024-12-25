import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-game-over',
  template: `
    <div class="game-over-container" [@fadeIn]>
      <h2>Game Over!</h2>
      <div class="final-score">
        <span>Score Final:</span>
        <span class="score">{{ score }}</span>
      </div>
      <button class="restart-btn" (click)="onRestart()">
        Recommencer
      </button>
    </div>
  `,
  styles: [`
    .game-over-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.9);
      border-radius: 12px;
      color: white;
    }

    h2 {
      font-size: 2.5rem;
      margin: 0;
      color: #ff4444;
    }

    .final-score {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.2rem;
    }

    .score {
      font-size: 3rem;
      font-weight: bold;
      color: #4CAF50;
    }

    .restart-btn {
      padding: 1rem 2rem;
      font-size: 1.2rem;
      background-color: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .restart-btn:hover {
      background-color: #1976D2;
    }
  `],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0,
        transform: 'scale(0.7)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('void => *', [
        animate('0.3s ease-out')
      ])
    ])
  ]
})
export class GameOverComponent {
  @Input() score: number = 0;
  @Output() restart = new EventEmitter<void>();

  onRestart() {
    this.restart.emit();
  }
}