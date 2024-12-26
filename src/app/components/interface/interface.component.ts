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
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css'],
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
