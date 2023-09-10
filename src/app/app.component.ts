import { Component } from '@angular/core';
import { SuperAuthenthicationServiceService } from './core/services/super-authenthication-service.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userInfo? : User
  isAuthenthicated : boolean = false

  constructor(private readonly superAuthenthicationService : SuperAuthenthicationServiceService) {
    superAuthenthicationService.userProfile.subscribe(user => {
     this.userInfo = user
     this.isAuthenthicated = this.userInfo != undefined

     console.log(this.userInfo)
    })
  }

  logOut() {
    this.superAuthenthicationService.signOut()
  }
}
