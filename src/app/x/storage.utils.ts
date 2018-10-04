
export class LocalFactory {
    static getItem(key: string) {
        return JSON.parse(localStorage.getItem(key)?localStorage.getItem(key):'{}');
    }
    static setItem(key: string, value: Object) {
        return localStorage.setItem(key, JSON.stringify(value));
    }
}

export class SessionFactory {
    static getItem(key: string) {
        return JSON.parse(sessionStorage.getItem(key)?sessionStorage.getItem(key):'{}');
    }
    static setItem(key: string, value: Object) {
        return sessionStorage.setItem(key, JSON.stringify(value));
    }
}