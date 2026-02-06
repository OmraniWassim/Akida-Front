import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrderStatus } from '../enum/OrderStatus.enum';
import { Order } from '../models/Order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-gestion-commands',
  standalone: false,
  templateUrl: './gestion-commands.component.html',
  styleUrl: './gestion-commands.component.scss'
})
export class GestionCommandsComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrders: Order[] = [];
  selectedOrder: Order;
  orderDialog: boolean = false;
  loading: boolean = true;
  searchText: string = '';
  deliveryFee: number = 7;

  statusOptions = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'PENDING' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Shipped', value: 'SHIPPED' },
    { label: 'Delivered', value: 'DELIVERED' }
  ];
  selectedStatus: OrderStatus = null;

  constructor(
    private orderService: OrderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.filteredOrders = [...orders];
        this.loading = false;
      },
      error: (err) => {
        this.showError('Failed to load orders');
        this.loading = false;
      }
    });
  }

  applyFilter() {
    this.filteredOrders = this.orders.filter(order => 
      order.id.toString().includes(this.searchText) ||
      order.appUser?.firstName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      order.appUser?.lastName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
      order.deliveryAddress.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  filterByStatus() {
    if (!this.selectedStatus) {
      this.filteredOrders = [...this.orders];
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    }
  }

  viewOrderDetails(order: Order) {
    this.selectedOrder = order;
    this.orderDialog = true;
  }

  updateOrderStatus(orderId: number, status: OrderStatus) {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        const order = this.orders.find(o => o.id === orderId);
        if (order) {
          order.status = status;
        }
        this.showSuccess(`Order #${orderId} has been ${status.toLowerCase()}`);
        this.orderDialog = false;
      },
      error: (err) => {
        this.showError(`Failed to update order status`);
      }
    });
  }

  confirmDeleteSelected() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected orders?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteSelectedOrders();
      }
    });
  }

  deleteSelectedOrders() {
    const ids = this.selectedOrders.map(o => o.id);
    // this.orderService.deleteOrders(ids).subscribe({
    //   next: () => {
    //     this.orders = this.orders.filter(order => !ids.includes(order.id));
    //     this.filteredOrders = this.filteredOrders.filter(order => !ids.includes(order.id));
    //     this.selectedOrders = [];
    //     this.showSuccess('Selected orders deleted successfully');
    //   },
    //   error: (err) => {
    //     this.showError('Failed to delete selected orders');
    //   }
    // });
  }

  getSubtotal(order: Order): number {
    if (!order?.items) return 0;
    return order.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  getStatusSeverity(status: OrderStatus): string {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'PROCESSING': return 'help';
      case 'CANCELLED': return 'danger';
      case 'SHIPPED': return 'info';
      case 'DELIVERED': return 'success';
      default: return '';
    }
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  printOrder() {
    window.print();
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }
}
