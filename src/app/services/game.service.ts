import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface GameState {
  sequence: string[];
  playerSequence: string[];
  score: number;
  level: number;
  isPlaying: boolean;
  isShowingSequence: boolean;
  gameOver: boolean;
  displayTime: number;
  availableColors: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private allColors: string[] = [
    '#FF0000', // Rouge vif
    '#0000FF', // Bleu
    '#00FF00', // Vert vif
    '#FFD700', // Or
    '#FF1493', // Rose foncé
    '#00FFFF', // Cyan
    '#FF4500', // Orange rouge
    '#8A2BE2', // Bleu violet
    '#32CD32', // Vert lime
    '#FF69B4', // Rose clair
    '#4B0082', // Indigo
    '#00FF7F', // Vert printemps
    '#FF8C00', // Orange foncé
    '#9400D3', // Violet foncé
    '#7CFC00', // Vert pelouse
    '#FF1744', // Rouge corail
    '#1E88E5', // Bleu océan
    '#76FF03', // Vert citron
    '#FFB300', // Ambre
    '#E040FB', // Violet clair
    '#00BFA5', // Turquoise
    '#F50057', // Rose magenta
    '#2979FF', // Bleu brillant
    '#C51162', // Rose profond
  ];

  private initialState: GameState = {
    sequence: [],
    playerSequence: [],
    score: 0,
    level: 1,
    isPlaying: false,
    isShowingSequence: false,
    gameOver: false,
    displayTime: 15000,
    availableColors: [],
  };

  private gameState = new BehaviorSubject<GameState>({ ...this.initialState });
  gameState$ = this.gameState.asObservable();
  private sequenceTimeout: any;
  private highlightTimeout: any;

  constructor() {}

  private get currentState(): GameState {
    return this.gameState.getValue();
  }

  private updateState(newState: Partial<GameState>) {
    this.gameState.next({
      ...this.currentState,
      ...newState,
    });
  }

  private getColorsForLevel(level: number): string[] {
    const numberOfColors = Math.min(level * 2, this.allColors.length);
    return this.allColors.slice(0, numberOfColors);
  }

  startGame() {
    if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);
    if (this.highlightTimeout) clearTimeout(this.highlightTimeout);

    const initialColors = this.getColorsForLevel(1);
    const initialSequence = this.generateSequence(2, initialColors);

    this.updateState({
      ...this.initialState,
      isPlaying: true,
      sequence: initialSequence,
      level: 1,
      availableColors: initialColors,
    });

    this.showSequence();
  }

  generateSequence(length: number, availableColors: string[]): string[] {
    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      sequence.push(availableColors[randomIndex]);
    }
    return sequence;
  }

  async showSequence() {
    this.updateState({ isShowingSequence: true, playerSequence: [] });
    
    for (const color of this.currentState.sequence) {
      await new Promise(resolve => {
        this.highlightTimeout = setTimeout(() => {
          this.updateState({
            playerSequence: [color]
          });
          
          setTimeout(() => {
            this.updateState({ playerSequence: [] });
            resolve(true);
          }, 500);
        }, 1000);
      });
    }

    this.sequenceTimeout = setTimeout(() => {
      this.updateState({ 
        isShowingSequence: false,
        playerSequence: []
      });
    }, 1000);
  }

  addPlayerInput(color: string) {
    if (this.currentState.isShowingSequence) return;
    
    const newPlayerSequence = [...this.currentState.playerSequence, color];
    this.updateState({ playerSequence: newPlayerSequence });
  }

  validateSequence() {
    const { sequence, playerSequence } = this.currentState;
    return sequence.every((color, index) => color === playerSequence[index]);
  }

  submitSequence() {
    if (
      this.validateSequence() &&
      this.currentState.playerSequence.length === this.currentState.sequence.length
    ) {
      const newLevel = this.currentState.level + 1;
      const newColors = this.getColorsForLevel(newLevel);
      const newSequence = [...this.currentState.sequence];
      const randomIndex = Math.floor(Math.random() * newColors.length);
      newSequence.push(newColors[randomIndex]);

      const newScore = this.calculateScore();

      this.updateState({
        score: newScore,
        level: newLevel,
        playerSequence: [],
        sequence: newSequence,
        availableColors: newColors,
      });

      this.showSequence();
    } else {
      this.updateState({ gameOver: true });
    }
  }

  resetGame() {
    if (this.sequenceTimeout) clearTimeout(this.sequenceTimeout);
    if (this.highlightTimeout) clearTimeout(this.highlightTimeout);
    this.updateState(this.initialState);
  }

  private calculateScore(): number {
    const baseScore = 100;
    const timeBonus = Math.max(0, this.currentState.displayTime - 5000) / 1000;
    return (
      this.currentState.score +
      baseScore * this.currentState.level +
      Math.floor(timeBonus)
    );
  }

  resetPlayerSequence() {
    this.updateState({ playerSequence: [] });
  }
}