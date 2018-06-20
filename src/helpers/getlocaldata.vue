export default class localStorageService {
  getlocaldata() {
      return this.$localstorage.get('canvas')
    // Use vue-resource or any other http library to send your request
  }

}