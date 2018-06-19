import React from 'react'
import {toast} from 'react-toastify'
import errorBoundaryHOC from './errorBoundaryHOC'
import ComponentToast from './ComponentToast'
import {getConfig} from './config'

export default ({placeholder = 'Error', message, type = 'error', options}) => errorBoundaryHOC({
  placeholder,
  onCatch: (error, errorInfo, props) => {
    if (!message) return
    const toastOptions = {...getConfig().toastOptions, ...options}
    toast[type]((
      <ComponentToast
        message={message}
        error={error}
        errorInfo={errorInfo}
        componentProps={props}
      />
    ), toastOptions)
  }
})
