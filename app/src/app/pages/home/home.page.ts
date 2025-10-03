import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonInput, IonList, IonButton } from '@ionic/angular/standalone';
import { ToastController, ModalController } from '@ionic/angular';

import { DictionaryService } from 'src/app/i18n';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { BarcodeComponent } from 'src/app/components/barcode/barcode.component';
import { SendEmailComponent } from 'src/app/components/send-email/send-email.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton, IonList, IonItem, IonInput, IonContent,
    CommonModule, FormsModule, 
    FooterComponent, BarcodeComponent
  ],
  providers: [
    ModalController, 
    ToastController  
  ]
})
export class HomePage implements OnInit {
  @ViewChild('boxInput', { static: false }) boxInput!: IonInput;

  boxes: { box: string; products: string[] }[] = [];
  currentBox: string | null = null;
  isBoxLocked = false;

  constructor(
    public dictionary: DictionaryService,
    private toastController: ToastController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.boxInput.ionFocus.subscribe(() => {
      this.boxInput.setFocus();
    });
  }

  onBoxChange(event: any) {
    if (event && event.target && event.target.value) {
      this.currentBox = event.target.value.toUpperCase();
    }
  }

  confirmBox() {
    if (this.currentBox && this.currentBox.trim() !== '') {
      // Cria nova caixa só se ainda não existir
      const exists = this.boxes.find(b => b.box === this.currentBox);
      if (!exists) {
        this.boxes.push({ box: this.currentBox, products: [] });
      }
      this.isBoxLocked = true;
    }
  }

  async onProductScanned(code: string) {
    if (this.isBoxLocked && this.currentBox) {
      const current = this.boxes.find(b => b.box === this.currentBox);
      if (!current) return;

      if (current.products.includes(code)) {
        this.showToast(`⚠️ O produto ${code} já foi adicionado nesta caixa`);
        return;
      }

      current.products.push(code);
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'warning'
    });
    await toast.present();
  }

  newBox() {
    this.currentBox = null;
    this.isBoxLocked = false;
  }

  async finish() {
    console.log('Finalizar conferência:', this.boxes);

    // garante que não abre modal vazio
    if (!this.boxes || this.boxes.length === 0) {
      this.showToast('⚠️ Nenhuma caixa registrada');
      return;
    }

    const modal = await this.modalCtrl.create({
      component: SendEmailComponent,
      componentProps: {
        boxes: this.boxes
      }
    });
    await modal.present();
  }

  get totalProducts(): number {
    if (!this.currentBox) return 0;
    const current = this.boxes.find(b => b.box === this.currentBox);
    return current ? current.products.length : 0;
  }

  get lastProducts(): string[] {
    if (!this.currentBox) return [];
    const current = this.boxes.find(b => b.box === this.currentBox);
    return current ? current.products.slice(-3) : [];
  }
}
