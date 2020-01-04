import * as http from 'http';
import * as https from 'https';

import { URL } from 'url';

export class RequestHelper {

    static async get(requestUrl: string, isHttps: boolean = RequestHelper.isHttps(requestUrl)) {
        return await RequestHelper.request(new URL(requestUrl), null, isHttps);
    }

    static async post(requestUrl: string, data: any, isHttps: boolean = RequestHelper.isHttps(requestUrl)) {
        return await RequestHelper.request(new URL(requestUrl), data, isHttps);
    }

    static async request(option: string | URL | https.RequestOptions, data: any, isHttps: boolean): Promise<string> {
        var module = isHttps ? https : http;

        return await new Promise((resolve, reject) => {
            var req = module.request(option,(res) => {
                var data = '';
                res.on('data', (chunk) => data += chunk);
    
                res.on('end', () => resolve(data));
            });

            if (data)
                req.write(data);
            req.end();
        });
    }

    static isHttps(requestUrl: string): boolean {
        return requestUrl.startsWith('https');
    }
}