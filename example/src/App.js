/* eslint-disable no-console */
import React from 'react'
import PackageComponent from './PackageComponent'
import PackageSubcomponent from './PackageSubcomponent'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {addErrorInterceptor, setConfig} from 'c2-error'

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

axios.get('/foobadglkjsgljgdg', {
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
