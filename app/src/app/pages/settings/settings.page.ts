import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel, IonNote, IonIcon, IonButton } from '@ionic/angular/standalone';
import { personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { DictionaryService } from 'src/app/i18n';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonNote, IonLabel, IonItem, IonList, 
    IonContent, CommonModule, FormsModule,
    HeaderComponent,FooterComponent
  ]
})
export class SettingsPage implements OnInit {
  app_version: string = '1.0.0';
  app_compile: string = '1.0.0';

  constructor(public dictionary: DictionaryService) {
    addIcons({ personCircleOutline });
  }

  ngOnInit() {
  }

}
