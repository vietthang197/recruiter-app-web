import {Component, OnInit} from '@angular/core';
import {NotificationServices} from "../services/NotificationServices";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import KeycloakAuthorization from "keycloak-js/dist/keycloak-authz";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'recruiter-app-web';
  isCollapsed = false
  keycloakService: KeycloakService;
  keycloakAuthz: KeycloakAuthorization;
  userInfo: any = null;

  constructor(keycloakService: KeycloakService) {
    this.keycloakService = keycloakService;
    this.keycloakAuthz = new KeycloakAuthorization(this.keycloakService.getKeycloakInstance());
  }

  async ngOnInit(): Promise<void> {
    // @ts-ignore
    await this.keycloakAuthz.ready;
    const mykeycloak = this.keycloakService;
    mykeycloak.keycloakEvents$.subscribe({
      next(event) {
        if (event.type == KeycloakEventType.OnTokenExpired) {
          mykeycloak.updateToken(20);
        }
      }
    });
  }

  oauth2Test() {
    this.keycloakService.login()
  }

  async getUserInfo() {
    let userInfo = this.keycloakService.loadUserProfile(true)
    this.keycloakService.getToken().then(value => {
      console.log(value)
    })

    let authorizationRequest = {
      permissions: [
        {
          id: 'FILE_RESOURCES',
          scopes: [
            'edit', 'view', 'edit', 'delete'
          ]
        }
      ],
      metadata: {
        responseIncludeResourceName: true
      }
    }
    // @ts-ignore
    this.keycloakAuthz.entitlement('file', authorizationRequest).then((rpt) => {
      console.log(rpt)
    }, () => {
      console.log('deny')
    }, () => {
      console.log('error')
    })
  }
}
