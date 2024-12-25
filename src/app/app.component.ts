import { Component } from '@angular/core';
import { GameComponent } from './components/game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Memory Game</h1>
      </header>
      
      <main>
        <app-game></app-game>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h1 {
      color: #2196F3;
      font-size: 2.5rem;
    }
  `]
})
export class AppComponent {}