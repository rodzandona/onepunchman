import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonIcon } from "@ionic/angular/standalone";
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonIcon, IonBackButton, IonButtons, IonHeader, IonToolbar, IonTitle],
})
export class HeaderComponent  implements OnInit {
  title: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
    .pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let currentRoute = this.route.root;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        return currentRoute.snapshot.data['title'] || '';
      })
    )
    .subscribe((title: string) => {
      console.log("Title: ", title);
      this.title = title;
    });
  }

  ngOnInit() {}

}
