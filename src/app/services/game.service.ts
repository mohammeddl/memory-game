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
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private colors: string[] = ['red', 'blue', 'green', 'yellow'];
  private initialState: GameState = {
    sequence: [],
    playerSequence: [],
    score: 0,
    level: 1,
    isPlaying: false,
    isShowingSequence: false,
    gameOver: false
  };

  private gameState = new BehaviorSubject<GameState>({...this.initialState});
  gameState$ = this.gameState.asObservable();

  constructor() { }

  private get currentState(): GameState {
    return this.gameState.getValue();
  }

  private updateState(newState: Partial<GameState>) {
    this.gameState.next({
      ...this.currentState,
      ...newState
    });
  }

  startGame() {
    this.updateState({
      ...this.initialState,
      isPlaying: true,
      sequence: this.generateSequence(2) // Start with 2 colors
    });
    this.showSequence();
  }

  generateSequence(length: number): string[] {
    const sequence: string[] = [];
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.colors.length);
      sequence.push(this.colors[randomIndex]);
    }
    return sequence;
  }

  addColor() {
    const newSequence = [...this.currentState.sequence];
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    newSequence.push(this.colors[randomIndex]);
    this.updateState({ sequence: newSequence });
  }

  async showSequence() {
    this.updateState({ isShowingSequence: true, playerSequence: [] });
    
    for (const color of this.currentState.sequence) {
      await this.highlightColor(color);
    }

    this.updateState({ isShowingSequence: false });
  }

  private async highlightColor(color: string) {
    // Simulating the highlight effect with a delay
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  addPlayerInput(color: string) {
    if (this.currentState.isShowingSequence) return;
    
    const newPlayerSequence = [...this.currentState.playerSequence, color];
    this.updateState({ playerSequence: newPlayerSequence });
  }

  validateSequence() {
    const { sequence, playerSequence } = this.currentState;
    
    if (sequence.length !== playerSequence.length) {
      return false;
    }

    return sequence.every((color, index) => color === playerSequence[index]);
  }

  submitSequence() {
    if (this.validateSequence()) {
      const newScore = this.calculateScore();
      this.updateState({
        score: newScore,
        level: this.currentState.level + 1,
        playerSequence: []
      });
      this.addColor();
      this.showSequence();
    } else {
      this.updateState({ gameOver: true });
    }
  }

  resetGame() {
    this.updateState(this.initialState);
  }

  private calculateScore(): number {
    // Basic score calculation - can be made more complex
    return this.currentState.score + (this.currentState.level * 100);
  }

  resetPlayerSequence() {
    this.updateState({ playerSequence: [] });
  }
}