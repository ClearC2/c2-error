import React, {Component, Fragment} from 'react'
import {toast} from 'react-toastify'
import ComponentToast from './ComponentToast'
import {getConfig} from './config'
import getDisplayName from './getDisplayName'

export default ({placeholder, message, type = 'error', options, componentName}) => (WrappedComponent) => {
  return class extends Component {
    static displayName = `onError(${getDisplayName(WrappedComponent)})`
    state = {
      error: false
    }
    componentDidCatch (error, errorInfo) {
      this.setState({error: true})
      if (typeof message === 'function') {
        message = message(this.props, error, errorInfo)
      }
      if (!message) return
      if (typeof toast[type] !== 'function') {
        type = 'error'
      }
      componentName = typeof componentName === 'function'
        ? componentName(this.props)
        : componentName
      if (componentName) {
        message = `${componentName}: ${message}`
      }
      const toastOptions = {...getConfig().toastOptions, ...options}
      toast[type]((
        <ComponentToast
          message={message}
          error={error}
          errorInfo={errorInfo}
          componentProps={this.props}
        />
      ), toastOptions)
    }
    render () {
      return this.state.error
        ? (placeholder || <Fragment>Error</Fragment>)
        : <WrappedComponent {...this.props} />
    }
  }
}
