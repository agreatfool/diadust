import * as WS from 'ws';

export class Socket {

    private address: string = 'ws://127.0.0.1:13000/ws';
    private client: WS;

    private isAlive: boolean;
    private pingInterval: number = 30 * 1000; // 30s

    async init() {
        return new Promise((resolve) => {
            this.client = new WS(this.address);

            // Event: ping
            this.client.on('ping', () => {
                console.log('ping');
                this.client.pong();
            });

            // Event: pong
            this.client.on('pong', () => {
                console.log('pong');
                this.isAlive = true;
            });

            // Event: open, connected
            this.client.on('open', () => {
                this.isAlive = true;
                resolve();
            });

            // heartbeat
            setInterval(() => {
                if (this.isAlive === false) {
                    return this.client.terminate();
                }

                this.isAlive = false; // set to false, then ping
                this.client.ping();
            }, this.pingInterval);
        });
    }

}