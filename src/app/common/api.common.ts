
const baseURL = 'http://qrcode-log.herokuapp.com/api/'
function getUrl(endPoint: string) {
    return baseURL + endPoint;
}

export const apiURL = {
    //category api
    login: getUrl('employee/login'),
    getOrderInfo: getUrl('employee/order/get'),
    getOrderHistory: getUrl('employee/order/history/get'),
    createOrderHistory: getUrl('employee/order/history/create'),
    // login: 'http://localhost:8081/api/employee/login',
    //employee
}
