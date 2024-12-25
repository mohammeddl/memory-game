import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-interface',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interface-container">
      <div class="colors-grid">
        <button
          *ngFor="let color of colors"
          class="color-button"
          [ngClass]="color"
          [class.active]="isColorActive(color)"
          [@highlight]="isColorActive(color) ? 'active' : 'inactive'"
          (click)="onColorClick(color)"
          [disabled]="isShowingSequence">
        </button>
      </div>
      
      <div class="sequence-progress">
        <div class="sequence-dot" 
          *ngFor="let _ of sequence; let i = index"
          [class.filled]="i < playerSequence.length">
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interface-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .colors-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
    }

    .color-button {
      width: 120px;
      height: 120px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .color-button:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }

    .red { background-color: #ff4444; }
    .blue { background-color: #4444ff; }
    .green { background-color: #44ff44; }
    .yellow { background-color: #ffff44; }

    .color-button.active {
      transform: scale(0.95);
      filter: brightness(1.5);
    }

    .sequence-progress {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .sequence-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: #ddd;
      transition: background-color 0.3s ease;
    }

    .sequence-dot.filled {
      background-color: #2196F3;
    }
  `],
  animations: [
    trigger('highlight', [
      state('inactive', style({
        transform: 'scale(1)',
        filter: 'brightness(1)'
      })),
      state('active', style({
        transform: 'scale(0.95)',
        filter: 'brightness(1.5)'
      })),
      transition('inactive => active', [
        animate('0.1s')
      ]),
      transition('active => inactive', [
        animate('0.3s')
      ])
    ])
  ]
})
export class InterfaceComponent {
  @Input() sequence: string[] = [];
  @Input() playerSequence: string[] = [];
  @Input() isShowingSequence: boolean = false;
  @Output() colorClick = new EventEmitter<string>();

  colors: string[] = ['red', 'blue', 'green', 'yellow'];

  isColorActive(color: string): boolean {
    if (this.isShowingSequence) {
      return this.sequence[this.playerSequence.length] === color;
    }
    return this.playerSequence[this.playerSequence.length - 1] === color;
  }

  onColorClick(color: string) {
    if (!this.isShowingSequence) {
      this.colorClick.emit(color);
    }
  }
}