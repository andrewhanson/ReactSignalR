import {HubConnectionBuilder} from '@aspnet/signalr';

const DashboardHubMessages = {
    onTickerChange: 'ReceiveTickerChange', 
    onColorChange : 'ReceiveColorChange',
    onDataChange: 'ReceiveChangeData',
   
    updateColor: 'SendColorChange',
    updateData: 'SendDataChange',
    updateTicker: 'SendTicker'
}

class DashboardHubConnectionService {

    constructor() {        

        let url  = `/dashboardHub`;
        
        this._connection =  new HubConnectionBuilder().withUrl(url).build();      
       
        this.start();

        this._connection.onclose(async () => {
            await this.start();
        });
    }

    async start(){
        try {
            await this._connection.start();
            console.log('connected');
        } catch (err) {
            console.log(err);
            setTimeout(() => this.start(), 5000);
        }
    }

    sendMessage(message, ...args){
        this._connection.invoke(message, ...args);
    }

    registerMessageHandler(message,cb){
        this._connection.on(message, (...args) => {
            cb(args);
        })
    }

    unRegisterMessageHandler(message, cb){
        this._connection.off(message, cb);
    }
}

const DashboardHubService = new DashboardHubConnectionService();

export {DashboardHubService, DashboardHubMessages};