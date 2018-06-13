import axios from 'axios'

const API_URL = 'http://206.189.153.177:4000/'
export default {
    getCanvas () {
        return new Promise((resolve, reject) => {
            axios.get(API_URL + 'canvas').then(response => {
                resolve(response)
            })
        })
    },
    getImages() {
        var medias = []
        return new Promise((resolve, reject) => {
            axios.get(API_URL + 'media').then(response => {
                medias = response.data.response.data.media
                for (let i = 0; i < medias.length; i++) {
                var index = medias[i].media_path.lastIndexOf('/')+1
                medias[i].name = medias[i].media_path.substr(index)
                medias[i].media_path = API_URL + medias[i].media_path
                }
                resolve(medias)
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}