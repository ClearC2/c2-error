import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import getDisplayName from './getDisplayName'

export default ({placeholder}) => (WrappedComponent) => {
  return class extends Component {
    static propTypes = {errors: PropTypes.any}
    static displayName = `ifErrorsProp(${getDisplayName(WrappedComponent)})`
    render () {
      placeholder = typeof placeholder === 'function'
        ? placeholder(this.props)
        : placeholder
      return this.props.errors
        ? (placeholder || <Fragment>Error</Fragment>)
        : <WrappedComponent {...this.props} />
    }
  }
}
