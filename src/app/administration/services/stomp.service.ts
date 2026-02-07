import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private connecting = false;
  private connectedOnce = false;
  private topicQueue: { topic: string; callback: any }[] = [];

  private socket = new SockJS('http://192.168.56.20:8081/sba-websocket');
  private stompClient = Stomp.over(this.socket);

  constructor() {
    // Optional: reduce log noise
    this.stompClient.debug = () => {};
  }

  subscribe(topic: string, callback: any): void {
    if (this.connecting) {
      this.topicQueue.push({ topic, callback });
      return;
    }

    const connected = this.stompClient.connected;
    if (connected) {
      this.connecting = false;
      this.subscribeToTopic(topic, callback);
      return;
    }

    this.connecting = true;

    this.stompClient.connect(
      {},

      () => {
        if (!this.connectedOnce) {
          console.log('[STOMP ✅] Connected to WebSocket server!');
          this.connectedOnce = true;
        }

        this.subscribeToTopic(topic, callback);

        this.topicQueue.forEach(item => {
          this.subscribeToTopic(item.topic, item.callback);
        });

        this.topicQueue = [];
        this.connecting = false;
      },

      (error: any) => {
        console.error('[STOMP ❌] Connection failed:', error);
        this.connecting = false;
      }
    );
  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (response?: string): any => {
      callback(response);
    });
  }
}
