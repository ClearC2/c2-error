import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {getConfig} from './config'
import DebugText from './DebugText'
import ReportButton from './ReportButton'

export default class ComponentToast extends Component {
  static propTypes = {
    message: PropTypes.string,
    error: PropTypes.object,
    errorInfo: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      reporting: false,
      reported: false,
      info: getConfig().getInfo()
    }
  }
  render() {
    const {message, error, errorInfo} = this.props
    const {reportComponentError} = getConfig()
    const stack = errorInfo.componentStack.split('\n').filter(line => !!line)
    const {info} = this.state
    return (
      <Fragment>
        {message}<br/>
        {reportComponentError && (
          <ReportButton
            {...this.props}
            report={reportComponentError}
            info={info}
          />
        )}
        {getConfig().debug && (
          <DebugText>
            {String(error)}
            <hr />
            {stack.map((line, i) => (
              <Fragment key={i}>
                {line}{stack.length !== 0 && <br />}
              </Fragment>
            ))}
          </DebugText>
        )}
      </Fragment>
    )
  }
}
