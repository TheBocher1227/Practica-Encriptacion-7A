import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../Interfaces/user-interface';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-sensores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent implements OnInit, OnDestroy {
  user: User | null = null;
  mensajes: { texto: string, esMio: boolean, desencriptado?: boolean }[] = [];
  nuevoMensaje: string = '';
  key: string = 'mysecretkey'; // Clave simple para XOR

  echo: Echo;

  constructor(private us: UserService, private cs: ChatService) {
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: 'cf215e348d8c753eb210', // Asegúrate de usar la clave correcta
      cluster: 'us3',
      wsHost: 'localhost',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });
  }

  ngOnInit() {
    this.getUserData();
    this.websocket();
  }

  websocket() {
    (window as any).Pusher = Pusher;
    this.echo.channel('chat').listen('.new-chat', (e: any) => {
      console.log('Nuevo mensaje recibido:', e.chat);
      if (e.chat.user_id !== this.user?.id) {
        this.mensajes.push({ texto: e.chat.mensaje, esMio: false, desencriptado: false });
      }
    });
  }

  ngOnDestroy() {
    this.echo.disconnect();
  }

  getUserData() {
    this.us.getData().subscribe({
      next: (response) => {
        this.user = response;
        console.log(response.id);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  async enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      const encryptedMessage = this.encryptMessage(this.nuevoMensaje);
      this.mensajes.push({ texto: this.nuevoMensaje, esMio: true });
      const userId = this.user?.id ? this.user.id.toString() : '';
      this.cs.guardarmensaje(userId, encryptedMessage).subscribe({
        next: (response) => {
          console.log('Mensaje guardado:', response);
        },
        error: (error) => {
          console.error('Error al guardar el mensaje:', error);
        }
      });

      this.nuevoMensaje = '';
    }
  }

  encryptMessage(message: string): string {
    return btoa(message.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length))
    ).join(''));
  }

  decryptMessage(index: number) {
    const mensaje = this.mensajes[index];
    const encryptedMessage = atob(mensaje.texto);
    const decryptedMessage = encryptedMessage.split('').map((char, i) => 
      String.fromCharCode(char.charCodeAt(0) ^ this.key.charCodeAt(i % this.key.length))
    ).join('');

    mensaje.texto = decryptedMessage;
    mensaje.desencriptado = true;
  }
}