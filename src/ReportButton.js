import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default class ReportButton extends PureComponent {
  static propTypes = {
    report: PropTypes.func
  }
  state = {
    reporting: false,
    reported: false
  }
  render () {
    const {report, ...props} = this.props
    return (
      <button
        className='btn btn-sm'
        disabled={this.state.reporting || this.state.reported}
        onClick={() => {
          this.setState({reporting: true})
          report({...props})
            .then(() => {
              this.setState({reporting: false, reported: true})
            })
            .catch(() => {
              this.setState({reporting: false})
            })
        }}
      >
        {this.state.reported ? 'Reported' : this.state.reporting ? 'Reporting...' : 'Report'}
      </button>
    )
  }
}
