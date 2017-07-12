import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { GameComponent } from './components/gameArea/game.component';
import { TitleComponent } from './components/title.component';
import { BoardComponent } from './components/gameArea/board.component';
import { TileComponent } from './components/gameArea/tile.component';
import { PieceComponent } from './components/gameArea/piece.component';
import { ScoreBoardComponent } from './components/gameArea/scoreBoard.component';
import { ScoreBoardPlayerPresentationComponent } from './components/gameArea/scoreBoardPlayerPresentation.component';
import { StatusAlertComponent } from './components/gameArea/statusAlert.component';
import { PlayersFormComponent } from './components/playersForm.component';
import { PlayerSubformComponent } from './components/playerSubform.component';
import { InstructionsComponent } from './components/instructions.component';
import { GameService } from './services/game.service';
import { TileInteractionService } from './services/tileInteraction.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TitleComponent,
    BoardComponent,
    TileComponent,
    PieceComponent,
    ScoreBoardComponent,
    ScoreBoardPlayerPresentationComponent,
    StatusAlertComponent,
    PlayersFormComponent,
    PlayerSubformComponent,
    InstructionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [GameService, TileInteractionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
