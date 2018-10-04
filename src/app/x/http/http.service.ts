import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpInterceptor } from '@angular/common/http/src/interceptor';
import { HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { AlertController, LoadingController } from 'ionic-angular';

// import { SpinnerService } from '../../app/core/spinner/spinner.service';

@Injectable()
export class HttpService {
    constructor(
        private http: HttpClient,
        private loadingCtrl: LoadingController,
    ) { }

    Get<T>(url: string, params?: any) {
        // this.spinnerService.show();
        const loading = this.loadingCtrl.create({
            content: 'Vui lòng đợi'
        })
        loading.present()
        return this.http.get<T>(url, { params: params }).map(res => {
            return res['data'];
        }).finally(() => {
            // this.spinnerService.hide() 
            loading.dismiss()
        });
    }

    Post<T>(url: string, body: any) {
        const loading = this.loadingCtrl.create({
            content: 'Vui lòng đợi'
        })
        loading.present()
        return this.http.post(url, body).map(res => {
            return res['data'];
        }).finally(() => {
            loading.dismiss()
        });
    }
}

@Injectable()
export class AuthHttpService implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getToken()}`
            },
        });
        return next.handle(req);
    }
}


@Injectable()
export class HttpErrorService implements HttpInterceptor {

    constructor(
        private alertCtrl: AlertController,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).do((event: HttpEvent<any>) => { }, (err: any) => {
            // if (err instanceof HttpErrorResponse) {

            // }
            if (err instanceof Error) {
                console.error('An error accured', err.message);
            } else {
                switch (err.status) {
                    case 0:
                        // this.toastService.error('');
                        this.alertCtrl.create({
                            title: 'Rất xin lỗi!!!',
                            message: 'Server đang bảo trì. Vui lòng quay lại vào lúc khác'
                        }).present()
                        break;
                    default:
                        // this.toastService.error(err.error['error']);
                        this.alertCtrl.create({
                            title: 'Có lỗi xảy ra',
                            message: err.error['error']
                        }).present()
                        break;
                }
            }
        });
    }
}
