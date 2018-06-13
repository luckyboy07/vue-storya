import * as axios from 'axios';

const BASE_URL = 'http://206.189.153.177:4000';

function upload(formData) {
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
        // add url field
        console.log('x:',x)
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload }