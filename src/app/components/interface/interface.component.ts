import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-interface',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interface-container">
      <div class="colors-grid" [class]="getGridClass()">
        <button
          *ngFor="let color of availableColors"
          class="color-button"
          [style.background-color]="color"
          [class.active]="isColorActive(color)"
          [@highlight]="isColorActive(color) ? 'active' : 'inactive'"
          (click)="onColorClick(color)"
          [disabled]="isShowingSequence"
        ></button>
      </div>

      <div class="sequence-display">
        <div class="sequence-label">
          Séquence actuelle: {{ sequence.length }} couleurs
        </div>
        <div class="sequence-progress">
          <div
            class="sequence-dot"
            *ngFor="let color of sequence; let i = index"
            [style.background-color]="
              i < playerSequence.length ? playerSequence[i] : '#ddd'
            "
            [class.filled]="i < playerSequence.length"
            [class.correct]="isCorrectAtIndex(i)"
            [class.wrong]="isWrongAtIndex(i)"
          ></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .interface-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      .colors-grid {
        display: grid;
        gap: 1rem;
        padding: 1rem;
        max-width: 800px;
        justify-content: center;
      }

      .grid-2 {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-4 {
        grid-template-columns: repeat(2, 1fr);
      }
      .grid-6 {
        grid-template-columns: repeat(3, 1fr);
      }
      .grid-8 {
        grid-template-columns: repeat(4, 1fr);
      }
      .grid-10 {
        grid-template-columns: repeat(5, 1fr);
      }
      .grid-12 {
        grid-template-columns: repeat(4, 1fr);
      }
      .grid-more {
        grid-template-columns: repeat(6, 1fr);
      }

      .color-button {
        width: 80px;
        height: 80px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .color-button:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }

      .color-button.active {
        transform: scale(0.95);
        filter: brightness(1.5);
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
      }

      .sequence-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }

      .sequence-label {
        font-size: 1.2rem;
        color: #666;
      }

      .sequence-progress {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 20px;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 600px;
      }

      .sequence-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        transition: all 0.3s ease;
      }

      .sequence-dot.filled {
        filter: brightness(1.2);
      }

      .sequence-dot.correct {
        box-shadow: 0 0 5px #4caf50;
      }

      .sequence-dot.wrong {
        box-shadow: 0 0 5px #f44336;
      }
    `,
  ],
  animations: [
    trigger('highlight', [
      state(
        'inactive',
        style({
          transform: 'scale(1)',
          filter: 'brightness(1)',
        })
      ),
      state(
        'active',
        style({
          transform: 'scale(0.95)',
          filter: 'brightness(1.5)',
        })
      ),
      transition('inactive => active', [animate('0.1s')]),
      transition('active => inactive', [animate('0.3s')]),
    ]),
  ],
})
export class InterfaceComponent {
  @Input() sequence: string[] = [];
  @Input() playerSequence: string[] = [];
  @Input() isShowingSequence: boolean = false;
  @Input() availableColors: string[] = [];
  @Output() colorClick = new EventEmitter<string>();

  getGridClass(): string {
    const count = this.availableColors.length;
    if (count <= 2) return 'grid-2';
    if (count <= 4) return 'grid-4';
    if (count <= 6) return 'grid-6';
    if (count <= 8) return 'grid-8';
    if (count <= 10) return 'grid-10';
    if (count <= 12) return 'grid-12';
    return 'grid-more';
  }

  isColorActive(color: string): boolean {
    if (this.isShowingSequence) {
      const currentIndex =
        this.playerSequence.length > 0
          ? this.sequence.indexOf(this.playerSequence[0])
          : -1;
      return currentIndex >= 0 && this.sequence[currentIndex] === color;
    }
    return this.playerSequence[this.playerSequence.length - 1] === color;
  }

  isCorrectAtIndex(index: number): boolean {
    return this.playerSequence[index] === this.sequence[index];
  }

  isWrongAtIndex(index: number): boolean {
    return (
      this.playerSequence[index] !== undefined &&
      this.playerSequence[index] !== this.sequence[index]
    );
  }

  onColorClick(color: string) {
    if (!this.isShowingSequence) {
      this.colorClick.emit(color);
    }
  }
}
