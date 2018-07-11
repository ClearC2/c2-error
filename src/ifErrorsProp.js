import React, {Component} from 'react'
import getDisplayName from './getDisplayName'

export default ({placeholder}) => (WrappedComponent) => {
  return class extends Component {
    static displayName = `ifErrorsProp(${getDisplayName(WrappedComponent)})`
    render () {
      return this.props.errors
        ? (placeholder || <Fragment>Error</Fragment>)
        : <WrappedComponent {...this.props} />
    }
  }
}

