import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService, Waybill, WAYBILL_STATUSES } from '../../supabase.service';

@Component({
  selector: 'app-waybill-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './waybill-list.component.html',
  styleUrl: './waybill-list.component.scss'
})
export class WaybillListComponent implements OnInit {
  waybills: Waybill[] = [];
  loading = true;

  constructor(private supabase: SupabaseService, private router: Router) {}

  async ngOnInit() {
    this.waybills = await this.supabase.getWaybills();
    this.loading = false;
  }

  openWaybill(id: string) {
    this.router.navigate(['/waybill', id]);
  }

  createNew() {
    this.router.navigate(['/waybill/new']);
  }

  getStatusInfo(status: Waybill['status']) {
    return WAYBILL_STATUSES.find(s => s.value === status) ?? WAYBILL_STATUSES[0];
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString();
  }
}
