import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperAuthenthicationServiceService {

  userProfile = new Subject<User>()
  
  constructor(private readonly oauthService : OAuthService) { 
    const oatuh2Config = new AuthConfig({
      issuer: environment.issuer,
      redirectUri: environment.redirect,
      clientId: environment.clientId,
      scope: environment.scope,
      strictDiscoveryDocumentValidation : false,      
    })

    oauthService.configure(oatuh2Config)
    oauthService.setupAutomaticSilentRefresh()

    oauthService.loadDiscoveryDocument().then(() => {
      oauthService.tryLoginImplicitFlow().then(() => {
        if (!oauthService.hasValidAccessToken()) {
          oauthService.initLoginFlow()
        } else {
          oauthService.loadUserProfile().then((userProfile) => {
            this.userProfile.next(userProfile as User)
          })
        }
      })
    })

  }


  isLoggedIn() {
    return this.oauthService.hasValidAccessToken()
  }

  signOut() {
    this.oauthService.revokeTokenAndLogout()    
  }

  forceRefreshToken() {
    this.oauthService.silentRefresh()
  }

  getToken() {
    return this.oauthService.getAccessToken()
  }
}
