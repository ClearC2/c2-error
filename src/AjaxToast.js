import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import DebugText from './DebugText'
import {getConfig} from './config'
import ReportButton from './ReportButton'

export default class AjaxToast extends Component {
  static propTypes = {
    message: PropTypes.string,
    error: PropTypes.object
  }
  state = {
    info: {}
  }
  constructor (props) {
    super(props)
    this.state = {
      info: getConfig().getInfo()
    }
  }
  getResponseData = () => {
    const data = this.props.error.response.data
    if (typeof data === 'object') {
      try {
        return JSON.stringify(data, null, 4)
      } catch (e) {
        return data
      }
    }
    return data
  }
  render () {
    const {message, error} = this.props
    const {config} = error
    const {reportAjaxError} = getConfig()
    const {info} = this.state
    return (
      <Fragment>
        {message}<br />
        {reportAjaxError && (
          <ReportButton
            {...this.props}
            report={reportAjaxError}
            info={info}
          />
        )}
        {getConfig().debug && (
          <DebugText>
            {error.response.status} - {config.method.toUpperCase()} {config.url}
            <hr />
            {this.getResponseData()}
          </DebugText>
        )}
      </Fragment>
    )
  }
}
