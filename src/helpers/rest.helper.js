import axios from 'axios'
export default {
    cancelTokens: [], // cancel tokens, use for cancelling a request
    config: {
        baseUrl: 'http://206.189.153.177',
        port: 4000,
        isSecure: false,
    },
    get(url, param = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((response) => {
                    console.log('success', response)
                    resolve(response)
                })
                .catch((err) => {
                    console.log('catch', err)
                    reject(err)
                })
        });
    },
    delete() {

    },
    post(url, param, contentType = 'application/json') {
        var formBox = new FormData();
        if (contentType == "multipart/form-data") {
            formBox.append('file', param);
        }
        return new Promise((resolve, reject) => {
            return axios({
                    method: 'post',
                    url: this.getCompleteUrl(url),
                    data: contentType == "multipart/form-data" ? formBox : param,
                    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': contentType }
                })
                .then((response) => {
                    resolve(this.$_getReponseData(response));
                })
                .catch((error) => {
                    reject(error)
                });
        });
    },
    put() {

    },
    $getValidateUrl(url) {
        if (!url) {
            throw new Error('Invalid URL');
        }
    },
    $_getUrlAndParam(url, param) {
        return $_combineUrlAndUrlParams(url, $_convertParamToUrl(param));
    },
    $_convertParamToUrl(param) {
        // check if valid param
        // param should be an object
        if (typeof param !== 'object') {
            throw new Error("Object is required as param");
        }
        var urlParams = '';

        for (var key in param) {
            urlParams += key + '=' + param[key] + '&';
        }
        // additional checking
        if (urlParams && urlParams.charAt(urlParams.length - 1).toString() === '&') {
            urlParams.slice(urlParams.length - 2, urlParams.length - 1);
        }

        return urlParams;
    },
    $_combineUrlAndUrlParams(url, urlParams) {
        // check if invalid url
        if (!url) {
            throw new Error('Invalid URL');
        }
        //notifs
        if (typeof urlParams !== 'string') {
            console.warn('Invalid url params');
        }
        // make sure url ends with '?'
        if (url.charAt(url.length - 1).toString() !== '?') {
            url = url + '?';
        }
        // combine all
        return this.config.baseUrl + ':' + this.config.port + '/'
        url + urlParams;
    },
    getCompleteUrl(url) {
        if (!url) {
            throw new Error('Invalid URL');
        }
        var cu = this.config.baseUrl + ':' + this.config.port;
        if (url[0].toString() !== '/') {
            cu += '/'
        }
        return cu + url;
    },
    $_getReponseData(response) {
        return response.data.response;
    }
}