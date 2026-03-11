import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-scan',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatCardModule],
  templateUrl: './scan.component.html',
  styleUrl: './scan.component.scss'
})
export class ScanComponent implements OnDestroy {
  scanning = false;
  saving = false;
  lastResult: string | null = null;

  constructor(private supabase: SupabaseService) {}

  async startScan() {
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (!permission.granted) return;

    this.scanning = true;
    document.body.classList.add('scanner-active');

    const result = await BarcodeScanner.startScan();

    document.body.classList.remove('scanner-active');
    this.scanning = false;

    if (result.hasContent) {
      this.lastResult = result.content;
      this.saving = true;
      await this.supabase.saveScan(result.content);
      this.saving = false;
    }
  }

  async stopScan() {
    BarcodeScanner.showBackground();
    await BarcodeScanner.stopScan();
    document.body.classList.remove('scanner-active');
    this.scanning = false;
  }

  ngOnDestroy() {
    this.stopScan();
  }
}
