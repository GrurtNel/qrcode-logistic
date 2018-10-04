import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/x/http/auth.service';
import { OrderInfoPage } from '../order-info/order-info';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthService]
})
export class HomePage implements OnInit {

  employeeName = ''
  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private alertCtrl: AlertController
  ) { }

  ngOnInit(): void {
    this.employeeName = this.authService.getUserInfo().name
  }

  onScanProduct() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.navCtrl.push(OrderInfoPage, { hash: barcodeData.text })
      console.log('Barcode data', barcodeData);
    }).catch(err => {
      this.alertCtrl.create({
        title: 'Lỗi không xác định'
      }).present()
      console.log('Error', err);
    });
  }

}
