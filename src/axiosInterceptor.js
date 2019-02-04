import React from 'react'
import {toast} from 'react-toastify'
import {getConfig} from './config'
import AjaxToast from './AjaxToast'

const errorInterceptor = error => {
  // cancelled requests do not have config
  if (!error.config) return Promise.reject(error)

  let toastConfig = typeof error.config.onError === 'function'
    ? error.config.onError(error)
    : error.config.onError

  if (typeof toastConfig === 'string') {
    toastConfig = {
      message: toastConfig
    }
  }

  if (typeof toastConfig === 'object') {
    const {message = 'Error', type = 'error'} = toastConfig
    const instanceToastOptions = toastConfig.options || {}
    const options = {...getConfig().toastOptions, ...instanceToastOptions}
    if (message) {
      toast[type]((
        <AjaxToast
          message={message}
          error={error}
        />
      ), options)
    }
  }
  return Promise.reject(error)
}

export default function addErrorInterceptor (ajax) {
  ajax.interceptors.response.use(null, errorInterceptor)
}
