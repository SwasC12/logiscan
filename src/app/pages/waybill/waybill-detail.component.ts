import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { SupabaseService, Waybill, WAYBILL_STATUSES } from '../../supabase.service';

@Component({
  selector: 'app-waybill-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule],
  templateUrl: './waybill-detail.component.html',
  styleUrl: './waybill-detail.component.scss'
})
export class WaybillDetailComponent implements OnInit {
  waybill: Waybill | null = null;
  loading = true;
  updating = false;

  readonly statuses = WAYBILL_STATUSES;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabase: SupabaseService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.waybill = await this.supabase.getWaybill(id);
    this.loading = false;
  }

  async setStatus(status: Waybill['status']) {
    if (!this.waybill?.id || this.waybill.status === status) return;
    this.updating = true;
    const success = await this.supabase.updateWaybillStatus(this.waybill.id, status);
    if (success) this.waybill.status = status;
    this.updating = false;
  }

  getStatusInfo(status: Waybill['status']) {
    return this.statuses.find(s => s.value === status) ?? this.statuses[0];
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleString();
  }

  goBack() {
    this.router.navigate(['/waybill']);
  }
}
