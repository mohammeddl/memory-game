import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css'],
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