import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DoctorGetPage} from "../doctor-get/doctor-get";
import { BarcodeScanner, BarcodeScanResult} from "@ionic-native/barcode-scanner";
import { Http} from "@angular/http";
import { AuthServiceProvider} from "../../providers/auth-service/auth-service";

/**
 * Generated class for the SettingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  info: {};
  qr_result: BarcodeScanResult;
  constructor(public navCtrl: NavController,
      private barcodeScanner: BarcodeScanner,
      private http: Http,
      private Auth: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  async scanBarcode(){
    this.qr_result = await this.barcodeScanner.scan();
    await this.http.get(this.Auth.API_URL+'patient?token='+this.qr_result.text)
      .toPromise().then(res => {
        this.info = res.json();
        console.log(this.info);
      });
    await this.navCtrl.push(DoctorGetPage, { info: this.info[0] });
  }
  // saveBack(){
  //   this.http.post(this.Auth.API_URL+'save',this.Auth.userInfo).subscribe();
  // }

}
