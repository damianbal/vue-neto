/**
 * VueNeto (0.1.0)
 * 
 * @author Damian Balandowski 
 */

import axios from "axios";

const VueNeto = {
  install(Vue, options) {

    if (typeof options === "undefined") {
      Vue.prototype.neto_token = true
      Vue.prototype.neto_baseURL = "http://localhost/"
      Vue.prototype.neto_tokenName = "token"
      Vue.prototype.neto_tokenPrefix = "Bearer"
    } else {
      Vue.prototype.neto_token = typeof options['token'] != "undefined" ? options['token'] : true
      Vue.prototype.neto_baseURL = typeof options['baseURL'] != "undefined" ? options['baseURL'] : ""
      Vue.prototype.neto_tokenName = typeof options['tokenName'] != "undefined" ? options['tokenName'] : true
      Vue.prototype.neto_tokenPrefix = typeof options['tokenPrefix'] != "undefined" ? options['tokenPrefix'] : true
    }


    /**
     * Mixin
     */
    Vue.mixin({
      mounted() {
        this.$neto.updateAuthorizationToken()
      }
    })

    Vue.prototype.$neto = {};

    /**
     * Update axios header with token information
     */
    Vue.prototype.$neto.updateAuthorizationToken = function () {
      if (localStorage.getItem(Vue.prototype.neto_tokenName) != null && Vue.prototype.neto_token == true) {
        axios.defaults.headers.common['Authorization'] = Vue.prototype.neto_tokenPrefix + " " + localStorage.getItem(Vue.prototype.neto_tokenName)
        this.authorized = false;
      } else {
        this.authorized = false;
      }
    }

    /**
     * Get object from response without all additional meta info
     * 
     * @param {string} url 
     */
    Vue.prototype.$neto.getObject = async (url) => {
      return new Promise((resolve, reject) => {
        axios.get(Vue.prototype.neto_baseURL + url).then(resp => {
          resolve(resp.data)
        }).catch(err => reject(err))
      })
    }

    /**
     * Returns object by index 
     * 
     * @param {string} url 
     * @param {index|string} index 
     */
    Vue.prototype.$neto.getObjectByIndex = async (url, index = 0) => {
      return new Promise((resolve, reject) => {
        axios.get(Vue.prototype.neto_baseURL + url).then(resp => {
          resolve(resp.data[index])
        }).catch(err => reject(err))
      })
    }

    /**
     * Get request
     * 
     * @param {string} url 
     */
    Vue.prototype.$neto.get = async (url) => {
      return new Promise((resolve, reject) => {
        axios.get(Vue.prototype.neto_baseURL + url).then(resp => {
          resolve(resp)
        }).catch(err => reject(err))
      })
    }

    /**
     * Post request
     * 
     * @param {string} url 
     * @param {object} data 
     */
    Vue.prototype.$neto.post = async (url, data = {}) => {
      axios.post(Vue.prototype.neto_baseURL + url, data).then(resp => {
        resolve(resp)
      }).catch(err => reject(err))
    }

    /**
     * Put request
     * 
     * @param {string} url 
     * @param {object} data 
     */
    Vue.prototype.$neto.post = async (url, data = {}) => {
      axios.put(Vue.prototype.neto_baseURL + url, data).then(resp => {
        resolve(resp)
      }).catch(err => reject(err))
    }

    /**
     * Patch request
     * 
     * @param {string} url 
     * @param {object} data 
     */
    Vue.prototype.$neto.patch = async (url, data = {}) => {
      axios.patch(Vue.prototype.neto_baseURL + url, data).then(resp => {
        resolve(resp)
      }).catch(err => reject(err))
    }

    /**
     * Delete request
     * 
     * @param {string} url 
     * @param {object} data 
     */
    Vue.prototype.$neto.delete = async (url) => {
      axios.delete(Vue.prototype.neto_baseURL + url, data).then(resp => {
        resolve(resp)
      }).catch(err => reject(err))
    }
  }
}

export default VueNeto
