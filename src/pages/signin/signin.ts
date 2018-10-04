import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HttpService } from '../../app/x/http/http.service';
import { apiURL } from '../../app/common/api.common';
import { LocalFactory } from '../../app/x/storage.utils';
import { userSessionKey } from '../../app/common/constant.common';
import { HomePage } from '../home/home';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  authentication = {
    uname: '',
    password: ''
  }
  constructor(
    public navCtrl: NavController,
    private http: HttpService,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  onLogin() {
    this.http.Post(apiURL.login, this.authentication).subscribe(userInfo => {
      LocalFactory.setItem(userSessionKey, userInfo)
      this.navCtrl.setRoot(HomePage)
      // this.navCtrl.push(HomePage)
      
    })
  }
}
