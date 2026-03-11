import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.barcode.scanner',
  appName: 'Barcode Scanner',
  webDir: 'dist/barcode-app/browser',
  android: {
    allowMixedContent: true
  }
};

export default config;
