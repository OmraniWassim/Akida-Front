import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { StompService } from '../administration/services/stomp.service';
import { Order } from '../administration/models/Order';
import { OrderService } from '../administration/services/order.service';

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

    sampleNotifications = [
        {
            id: 1,
            title: 'Nouvelle commande reçue',
            message: 'Le client #1234 a passé une nouvelle commande',
            time: new Date(),
            read: false
        },
        {
            id: 2,
            title: 'Commande expédiée',
            message: 'La commande #5678 a été expédiée',
            time: new Date(Date.now() - 3600000),
            read: false
        }
    ];


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

                });

            }

        });
    }

    loadNotifications() {
        // TODO: Replace with actual API call to get notifications
        this.notifications = [...this.sampleNotifications];
        this.updateUnreadCount();
    }

    toggleNotifications() {
        this.showNotificationPanel = !this.showNotificationPanel;
        if (this.showNotificationPanel) {
            // Mark as read when opened (optional)
            // this.markAllAsRead();
        }
    }

    markAsRead(notification: any) {
        notification.read = true;
        //remove item from notifications array
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
        this.updateUnreadCount();
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.updateUnreadCount();
    }

    updateUnreadCount() {
        this.unreadNotifications = this.notifications.filter(n => !n.read).length;
    }

    // Call this method when you receive a new notification (from WebSocket or API)
    addNewNotification(notification: any) {
        this.notifications.unshift(notification);
        this.updateUnreadCount();
    }

    getSubtotal(): number {
        if (!this.commandeToDisplay?.items) return 0;
        return this.commandeToDisplay.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }

    acceptOrder() {
        // this.orderService.updateOrderStatus(this.commandeToDisplay.id, 'ACCEPTED')
        //     .subscribe({
        //         next: () => {
        //             this.messageService.add({
        //                 severity: 'success',
        //                 summary: 'Order Accepted',
        //                 detail: `Order #${this.commandeToDisplay.id} has been accepted`
        //             });
        //             this.commandeDialog = false;
        //         },
        //         error: (err) => {
        //             this.messageService.add({
        //                 severity: 'error',
        //                 summary: 'Error',
        //                 detail: 'Failed to accept order'
        //             });
        //         }
        //     });
    }

    rejectOrder() {
        //     this.orderService.updateOrderStatus(this.commandeToDisplay.id, 'REJECTED')
        //         .subscribe({
        //             next: () => {
        //                 this.messageService.add({
        //                     severity: 'warn',
        //                     summary: 'Order Rejected',
        //                     detail: `Order #${this.commandeToDisplay.id} has been rejected`
        //                 });
        //                 this.commandeDialog = false;
        //             },
        //             error: (err) => {
        //                 this.messageService.add({
        //                     severity: 'error',
        //                     summary: 'Error',
        //                     detail: 'Failed to reject order'
        //                 });
        //             }
        //         });
        // }
    }
}


interface Notif {
    timestamp: string | number | Date;
    id: number;
    message: string;
    fromUser: string;
}