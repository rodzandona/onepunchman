import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExportRequest, ExportService } from 'src/app/services/export/export';
import { IonContent, IonItem, IonLabel, IonInput, IonButton, IonHeader, IonButtons, IonTitle, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-send-email',
  standalone: true,
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
  imports: [
    IonToolbar, IonTitle, IonButtons, IonHeader, IonContent, IonItem, IonLabel, IonInput, IonButton,
    CommonModule, FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SendEmailComponent {
  @Input() boxes: any[] = []; 
  email: string = '';

    constructor(
    private modalCtrl: ModalController,
    private exportService: ExportService
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  send() {

    if (!this.email) {
      alert(' Por favor, insira um email válido.');
      return;
    }

    const payload: ExportRequest = {
      email: this.email,
      boxes: this.boxes
    };

    this.exportService.sendExcel(payload).subscribe({
      next: () => {
        console.log('✅ Email enviado com sucesso');
        this.modalCtrl.dismiss({ success: true });
      },
      error: (err) => {
        console.error('❌ Erro ao enviar email', err);
        this.modalCtrl.dismiss({ success: false });
      }
    });
  }
}
