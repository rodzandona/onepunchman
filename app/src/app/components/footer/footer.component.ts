import { Component, OnInit } from '@angular/core';
import { IonFooter, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { listOutline, settingsOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [IonFooter, IonIcon, RouterModule]
})
export class FooterComponent  implements OnInit {

  constructor() {
    addIcons({ listOutline, settingsOutline });
  }

  ngOnInit() {}

}
