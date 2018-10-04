import { Injectable } from '@angular/core';
import { LocalFactory } from '../storage.utils';
import { userSessionKey } from '../../common/constant.common';

@Injectable()
export class AuthService {

    constructor() { }

    public getToken() {
        return LocalFactory.getItem(userSessionKey).token;
    }

    public getUserID() {
        return LocalFactory.getItem(userSessionKey).user_info.id;
    }

    public getUserInfo() {
        return LocalFactory.getItem(userSessionKey).user_info;
    }

    public setToken(token) {
        localStorage.setItem('token', token);
    }

    public authorize(token): boolean {
        return false;
    }
}