import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpService } from '../../app/x/http/http.service';
import { OrderInfo, Proccess } from '../../app/models/order-info.model';
import { apiURL } from '../../app/common/api.common';
import { OrderHistory } from '../../app/models/order-history.model';
import { LocalFactory } from '../../app/x/storage.utils';
import { userSessionKey } from '../../app/common/constant.common';

/**
 * Generated class for the OrderInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-info',
  templateUrl: 'order-info.html',
})
export class OrderInfoPage implements OnInit {

  orderInfo = <OrderInfo>{}
  orderHistories = <OrderHistory[]>[]
  orderID = ''
  productID = ''
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: HttpService,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderInfoPage');
  }

  ngOnInit(): void {
    const hash = <string>this.navParams.get('hash')
    const temp = hash.split("$$")
    this.orderID = temp[0]
    this.productID = temp[1]
    this.http.Get(apiURL.getOrderHistory, { product_id: this.productID }).subscribe(orderHistory => {
      if (orderHistory) {
        this.orderHistories = orderHistory
      }
      this.http.Get(apiURL.getOrderInfo, { order_id: this.orderID }).subscribe(orderInfo => {
        this.orderInfo = orderInfo
      })
    })
  }

  isDone(p: Proccess) {
    return this.orderHistories.find(oh => {
      return oh.process_id == p.id
    })
  }

  onDone(process: Proccess) {
    if (this.isDone(process)) {
      this.alertCtrl.create({
        title: 'Thông báo',
        message: 'Công đoạn đã được hoàn thành'
      }).present()
    } else {
      this.alertCtrl.create({
        title: 'Xác nhận?',
        message: 'Bạn đã hoàn thành công đoạn sản phẩm?',
        buttons: [
          {
            text: 'Hủy',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Xác nhận',
            handler: () => {
              this.doneProcess(process)
            }
          }
        ]
      }).present();
    }

  }

  doneProcess(process: Proccess) {
    const userInfo = LocalFactory.getItem(userSessionKey).user_info
    const orh = <OrderHistory>{
      employee_id: userInfo.id,
      employee_name: userInfo.name,
      process_id: process.id,
      process_name: process.name,
      product_id: this.productID,
      order_id: this.orderID
    }
    this.http.Post(apiURL.createOrderHistory, orh).subscribe(_ => {
      this.orderHistories.push(orh)
    })
  }
}
