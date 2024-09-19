import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { JuegoService } from '../../services/juego.service';
import { JuegoActivo } from '../../Interfaces/juego-activo';



@Component({
  selector: 'app-juego',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JuegoComponent implements OnInit {

  board: string[][] = [];
  oponentBoard: string[][] = [];

  echo: Echo = new Echo({
    broadcaster:'pusher',
    key:'123',
    cluster:'mt1',
    wsHost:'localhost',
    wsPort:6001,
    forceTLS:false,
    disableStatus:true,
  })

  constructor(private js:JuegoService) { }
  

  public juego: JuegoActivo = {
    game: {
      id: 0,
      next_player_id: 0,
      player1_id: 0,
      player2_id: 0,
      status: "",
      winner_id: 0,
    }
  }


  


  ngOnInit(): void {
    this.generateBoard();
    this.generateOponentBoard();
    const savedPositions = JSON.parse(localStorage.getItem('positions') || '[]');
  
    // Obtener la información del juego
    this.js.getPartida().subscribe(
      (response) => {
        // Asignar el ID del juego
        this.juego.game.id = response.game.id;

        
        // Llamar al servicio para colocar los barcos
        this.js.colocarBarcos(savedPositions, this.juego.game.id).subscribe(
          (response) => {
            // Manejar la respuesta si es necesario
          },
          (error) => {
            console.error('Error al colocar barcos:', error);
          }
        );

      },
      (error) => {
        console.error('Error al obtener información del juego:', error);
      }
    );

  
    this.websocket();
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

 
  websocket(){
    (window as any).Pusher = Pusher
    this.echo.channel('getbarcos').listen('.App\\Events\\BarcoEvents',(e:any) => {
      console.log(e);
    })
  }

  generateBoard(): void {
    const numCols = 5;
    const numRows = 8;
    const greenCells = 15; 

    this.board = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill('#13E5F7'));

    const positions = this.generateRandomPositions(numRows, numCols, greenCells);

    positions.forEach(pos => {
      this.board[pos.vertical][pos.horizontal] = '#C7C8C8';
    });
  }

  generateRandomPositions(numRows: number, numCols: number, count: number): { vertical: number, horizontal: number }[] {
    let positions: { vertical: number, horizontal: number }[] = [];
    const totalCells = numRows * numCols;
  
    while (positions.length < count) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      const vertical = Math.floor(randomIndex / numCols);
      const horizontal = randomIndex % numCols;
  
      if (!positions.some(pos => pos.vertical === vertical && pos.horizontal === horizontal)) {
        positions.push({ vertical, horizontal });
      }
    }
  
    if (!localStorage.getItem('positions')) {
      localStorage.setItem('positions', JSON.stringify(positions));
    } else {
      const savedPositions = JSON.parse(localStorage.getItem('positions') || '[]');
      positions = savedPositions;
    }
  
    return positions;
  }

  sendBoardPosition(vertical: number, horizontal: number) {
    const position = { vertical, horizontal };
    console.log(position)

    this.js.movimiento(horizontal, vertical, this.juego.game.id).subscribe(
      (response) => {
        console.log(response)
      }
    )
    
  }
  generateOponentBoard(): void {
    const numCols = 5;
    const numRows = 8;

    this.oponentBoard = Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill('#fffff'));
  }

}
