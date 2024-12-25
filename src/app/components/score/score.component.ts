import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  template: `
    <div class="score-container">
      <div class="score-item">
        <span class="label">Score:</span>
        <span class="value">{{ score }}</span>
      </div>
      <div class="score-item">
        <span class="label">Niveau:</span>
        <span class="value">{{ level }}</span>
      </div>
    </div>
  `,
  styles: [`
    .score-container {
      display: flex;
      gap: 2rem;
      padding: 1rem;
      background-color: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .score-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .label {
      font-size: 1.2rem;
      color: #666;
    }

    .value {
      font-size: 2rem;
      font-weight: bold;
      color: #2196F3;
    }
  `]
})
export class ScoreComponent {
  @Input() score: number = 0;
  @Input() level: number = 1;
}