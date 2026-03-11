import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SupabaseService } from '../../supabase.service';

@Component({
  selector: 'app-waybill-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './waybill-new.component.html',
  styleUrl: './waybill-new.component.scss'
})
export class WaybillNewComponent {
  saving = false;

  form = {
    reference: '',
    sender: '',
    receiver: '',
    description: ''
  };

  get isValid(): boolean {
    return !!(this.form.reference && this.form.sender && this.form.receiver);
  }

  constructor(private supabase: SupabaseService, private router: Router) {}

  async submit() {
    if (!this.isValid) return;
    this.saving = true;
    const success = await this.supabase.createWaybill(this.form);
    this.saving = false;
    if (success) this.router.navigate(['/waybill']);
  }

  cancel() {
    this.router.navigate(['/waybill']);
  }
}
