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
    saveProject (payload) {
        return new Promise((resolve, reject)=> {
            console.log('pay:', payload)
            axios.post(API_URL + 'projects', payload).then(response => {
                resolve(response)
            })
         })
    },
    saveCanvas (payload) {
        return new Promise((resolve, reject)=> {
            axios.post(API_URL + 'canvas', payload).then(response => {
                resolve(response)
            })
         })
    },
    saveRatio (payload, id) {
        return new Promise((resolve, reject) => {
            axios.post(API_URL + 'canvas/' + id + '/ratios',payload).then(response =>{
                resolve(response)
            })
        })
    },
    saveLayer (payload) {
        return new Promise((resolve ,reject)=> {
            axios.post(API_URL+ 'layers',payload).then(response =>{
                resolve(response)
            }).catch(error =>{
                reject(error)
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
    },
    
}