import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

export interface Scan {
  id?: string;
  barcode: string;
  scanned_at?: string;
}

export interface Waybill {
  id?: string;
  reference: string;
  sender: string;
  receiver: string;
  description: string;
  status?: 'pending' | 'in_transit' | 'delivered';
  created_at?: string;
}

export const WAYBILL_STATUSES: { value: Waybill['status']; label: string; color: string }[] = [
  { value: 'pending',    label: 'Pending',    color: '#f59e0b' },
  { value: 'in_transit', label: 'In Transit', color: '#3b82f6' },
  { value: 'delivered',  label: 'Delivered',  color: '#22c55e' }
];

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabase.url, environment.supabase.key);
  }

  // ── Scans ──────────────────────────────────────────

  async saveScan(barcode: string): Promise<void> {
    const { error } = await this.client.from('scans').insert({ barcode });
    if (error) console.error('Save scan error:', error.message);
  }

  async getRecentScans(): Promise<Scan[]> {
    const { data, error } = await this.client
      .from('scans')
      .select('id, barcode, scanned_at')
      .order('scanned_at', { ascending: false })
      .limit(50);
    if (error) console.error('Fetch scans error:', error.message);
    return data ?? [];
  }

  // ── Waybills ───────────────────────────────────────

  async createWaybill(waybill: Omit<Waybill, 'id' | 'created_at' | 'status'>): Promise<boolean> {
    const { error } = await this.client.from('waybills').insert({ ...waybill, status: 'pending' });
    if (error) console.error('Create waybill error:', error.message);
    return !error;
  }

  async getWaybills(): Promise<Waybill[]> {
    const { data, error } = await this.client
      .from('waybills')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) console.error('Fetch waybills error:', error.message);
    return data ?? [];
  }

  async getWaybill(id: string): Promise<Waybill | null> {
    const { data, error } = await this.client
      .from('waybills')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.error('Fetch waybill error:', error.message);
    return data ?? null;
  }

  async updateWaybillStatus(id: string, status: Waybill['status']): Promise<boolean> {
    const { error } = await this.client
      .from('waybills')
      .update({ status })
      .eq('id', id);
    if (error) console.error('Update status error:', error.message);
    return !error;
  }
}
