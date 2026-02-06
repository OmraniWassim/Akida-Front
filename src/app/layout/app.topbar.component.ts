import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { StompService } from '../administration/services/stomp.service';
import { Order } from '../administration/models/Order';
import { OrderService } from '../administration/services/order.service';
import { OrderStatus } from '../administration/enum/OrderStatus.enum';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];
    // Add to your component class
    showNotificationPanel = false;
    unreadNotifications = 0;
    notifications: any[] = [];
    newCommandId: number = 0;
    commandeDialog: boolean = false;
    commandeToDisplay: Order = {} as Order;
    audio: HTMLAudioElement;
    deliveryFee: number = 7;



    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
        private stompService: StompService,
        private orderService: OrderService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.loadNotifications();
        this.updateUnreadCount();
    }

    ngAfterViewInit() {
        this.stompService.subscribe('/topic/commande', (data: any): void => {
            if (data.body != this.newCommandId) {
                console.log('data', data);
                this.newCommandId = data.body;
                this.orderService.getOrderById(this.newCommandId).subscribe((commande: Order) => {
                    this.commandeToDisplay = commande;
                    this.commandeDialog = true;
                    this.playNotificationSound();
                    this.addNewOrderNotification(commande);


                });

            }

        });
    }

    addNewOrderNotification(order: Order): void {
        const newNotification: Notification = {
            id: order.id,
            title: 'Nouvelle commande reçue',
            message: `Commande #${order.id} - ${order.appUser?.firstName} ${order.appUser?.lastName}`,
            time: new Date(),
            read: false,
            order: order
        };

        this.notifications.unshift(newNotification);
        this.updateUnreadCount();
    }

    // Modify the markAsRead to handle order notifications
    markAsRead(notification: Notification): void {
        notification.read = true;
        this.updateUnreadCount();

        // Optional: Open order details when clicked
        if (notification.order) {
            this.commandeToDisplay = notification.order;
            this.commandeDialog = true;
        }
    }

    playNotificationSound(): void {
        this.audio = new Audio();
        this.audio.src = 'assets/notification-sound.mp3';
        this.audio.load();
        this.audio.play();
    }

    loadNotifications() {
        this.updateUnreadCount();
    }

    toggleNotifications() {
        this.showNotificationPanel = !this.showNotificationPanel;
        if (this.showNotificationPanel) {
            // Mark as read when opened (optional)
            // this.markAllAsRead();
        }
    }



    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateUnreadCount();
    }

    updateUnreadCount() {
        this.unreadNotifications = this.notifications.filter(n => !n.read).length;
    }

    addNewNotification(notification: any) {
        this.notifications.unshift(notification);
        this.updateUnreadCount();
    }

    getSubtotal(): number {
        if (!this.commandeToDisplay?.items) return 0;
        return this.commandeToDisplay.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }

    acceptOrder() {
        this.orderService.updateOrderStatus(this.commandeToDisplay.id, OrderStatus.PENDING).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Commande acceptée',
                    detail: `Commande #${this.commandeToDisplay.id} a été acceptée`,
                    life: 3000
                });

                this.commandeDialog = false;

                this.removeOrderNotification(this.commandeToDisplay.id);
            }, error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Impossible d'accepter la commande #${this.commandeToDisplay.id}`,
                    life: 3000
                });
            }
        });


    }

    rejectOrder() {
        this.orderService.updateOrderStatus(this.commandeToDisplay.id, OrderStatus.CANCELLED).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Commande rejetée',
                    detail: `Commande #${this.commandeToDisplay.id} a été rejetée`,
                    life: 3000
                });

                this.commandeDialog = false;

                this.removeOrderNotification(this.commandeToDisplay.id);

            }, error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Impossible de rejeter la commande #${this.commandeToDisplay.id}`,
                    life: 3000
                });
            }
        });
    }

    removeOrderNotification(orderId: number) {
        this.notifications = this.notifications.filter(n => n.id !== orderId);

        this.updateUnreadCount();
    }
}


interface Notification {
    id: number;
    title: string;
    message: string;
    time: Date;
    read: boolean;
    order?: Order; // Add order reference
}