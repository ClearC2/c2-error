import React, {Component} from 'react'
import getDisplayName from './getDisplayName'

export default  (WrappedComponent) => {
  return class extends Component {
    static displayName = `throwIfErrors(${getDisplayName(WrappedComponent)})`
    componentDidMount () {
      if (this.props.errors) {
        throw this.props.errors
      }
    }
    componentDidUpdate (prevProps) {
      if (this.props.errors && this.props.errors !== prevProps.errors) {
        throw this.props.errors
      }
    }
    render () {
      return <WrappedComponent {...this.props} />
    }
  }
}
