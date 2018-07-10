import React, {Component} from 'react'
import getDisplayName from './getDisplayName'

export default  (WrappedComponent) => {
  return class extends Component {
    static displayName = `throwIfErrors(${getDisplayName(WrappedComponent)})`
    render () {
      if (this.props.errors) {
        const error = new Error('Error')
        error.errors = this.props.errors
        throw error
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
