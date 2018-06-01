import * as LibUrl from 'url';
import fetch from 'node-fetch';

export async function post(uri, data: {[key: string]: any}) {
    return new Promise((resolve, reject) => {
        fetch(LibUrl.resolve('http://127.0.0.1:13000', uri), {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Cache-Control': 'no-cache,no-store,must-revalidate',
                'Content-Type': 'application/json',
                'Content-Encoding': 'deflate,gzip',
                'Accept-Encoding': 'deflate,gzip',
            }
        }).then(_ => _.json()).then(_ => resolve(_)).catch(err => {
            if (!err) {
                reject(err);
            }
        });
    });
}