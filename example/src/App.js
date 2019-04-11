/* eslint-disable no-console */
import React from 'react'
import PackageComponent from './PackageComponent'
import PackageSubcomponent from './PackageSubcomponent'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {addErrorInterceptor, setConfig} from '@clearc2/c2-error'

setConfig({
  debug: true,
  reportAjaxError: (props) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const {closeToast, ...rest} = props
        window.alert('Reported!')
        console.info(rest)
        resolve()
        closeToast()
      }, 1000)
    })
  },
  reportComponentError: (props) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const {closeToast, ...rest} = props
        window.alert('Reported!')
        console.info(rest)
        resolve()
        closeToast()
      }, 1000)
    })
  }
})

addErrorInterceptor(axios)

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/foobadglkjsgljgdg', {
  cancelToken: source.token,
  // onError: () => 'BORKED!',
  onError: `Couldn't fetch something!`
  // onError: {
  //   message: `Couldn't fetch blah blah`,
  //   type: 'warn',
  //   options: {
  //     position: 'top-center'
  //   }
  // }
})
source.cancel('foobar')

export default function App () {
  return (
    <div>
      <ToastContainer />
      <h1>C2 Error</h1>
      <PackageComponent foo={'bar'} />
      <PackageSubcomponent />
    </div>
  )
}
