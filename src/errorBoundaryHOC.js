import React, {Component, Fragment} from 'react'

function getDisplayName (WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

const errorBoundaryHOC = (options = {}) => (WrappedComponent) => {
  return class ErrorBoundary extends Component {
    static displayName = `errorBoundary(${getDisplayName(WrappedComponent)})`
    state = {
      error: false
    }
    componentDidCatch (error, info) {
      this.setState({error: true})
      if (typeof options.onCatch === 'function') {
        options.onCatch(error, info, this.props)
      }
    }
    render () {
      return this.state.error
        ? (options.placeholder || <Fragment>Error.</Fragment>)
        : <WrappedComponent {...this.props} />
    }
  }
}

export default errorBoundaryHOC
