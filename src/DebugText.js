import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class DebugText extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    return (
      <div
        style={{
          fontSize: '.75rem',
          border: '1px solid #000',
          backgroundColor: '#fff',
          color: '#000',
          padding: '1rem',
          marginTop: '1rem'
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
