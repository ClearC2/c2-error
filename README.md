# @clearc2/c2-error [![CircleCI](https://circleci.com/gh/ClearC2/c2-error.svg?style=svg)](https://circleci.com/gh/ClearC2/c2-error)

Provides a method to handle react component and ajax errors.

## Install

```
# for yarn
yarn add @clearc2/c2-error

# for npm
npm install @clearc2/c2-error
```

Configure the package by:
- setting the debug mode
- returning any app related information at the time of error
- supplying how errors should be reported(if at all)
- add the ajax error interceptor

```js
// src/c2-error-config.js
import {addErrorInterceptor, setConfig} from '@clearc2/c2-error'
import ajax from '../ajax'
import store from '../store'

setConfig({
  debug: ['staging', 'development'].includes(global.NODE_ENV),
  getInfo: () => {
    return {
      url: window.location.href,
      date: new Date(),
      loginId: store.getState().getIn(['Users', 'currentLoginId']),
      env: global.NODE_ENV
    }
  },
  reportAjaxError: (props) => {
    const {closeToast, ...error} = props
    return ajax.post('/api-error', {error}).then(closeToast)
  },
  reportComponentError: (props) => {
    const {closeToast, ...error} = props
    return new Promise(resolve => {
        window.location.href =
          `mailto:${global.errorEmail}` +
          `&subject=Runtime Error <project-name>` +
          `&body=${JSON.stringify(error, null, 4)}`
        closeToast()
        resolve()
    })
  }
})

addErrorInterceptor(ajax)
```

### `<ToastContainer />` and css
`c2-error` uses [react-toastify](https://github.com/fkhadra/react-toastify) to display error notifications. To display
toasts, a `<ToastContainer />` needs to be added to a root component that is always rendered regardless of route.

```jsx
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App () {
  return (
    <div className='main-content'>
      <ToastContainer />
      {/* other app stuff */}
    </div>
  )
}
```

## Config
All fields are optional.

### `debug: bool`
Determines whether or not to display debug information in the toast. Defaults to `false`.

### `getInfo: func`
This should return any arbitrary information collected at the time the error occurs. Defaults to function that returns
`{url: window.location.href, date: new Date()}`.

### `toastOptions: object`
Default [toast options](https://github.com/fkhadra/react-toastify#toast). Defaults to `{autoClose: false, closeOnClick: false}`.

### `reportAjaxError: func`
Must return a `Promise`. This function gets an object with the following keys: `message`, `closeToast`, `info`, `error`.
`closeToast` is the function to programtically close the toast. `error` is the axios error object.

### `reportComponentError: func`
Must return a `Promise`. This function gets an object with the following keys: `message`, `closeToast`, `info`, `error`,
`errorInfo`, `componentProps`.
`error` and `errorInfo` are what the error boundary catches.
[Read about these objects here](https://reactjs.org/docs/error-boundaries.html#componentdidcatch-parameters). `componentProps`
are the props that the underlying component received.

## Usage

`c2-error` can handle two types of errors: component and ajax.

### Component Errors

Use the `onCatch` higher-order component to provide a placeholder and toast message.

```jsx
import React from 'react'
import {onCatch} from '@clearc2/c2-error'

function UserTable () {
  undefined.test() // intentional error
  return (
    <span>UserTable</span>
  )
}

export default onCatch({
  placeholder: 'Error :(',
  message: 'User table error'
})(UserTable)

// or customize the toast
export default onCatch({
  placeholder: 'Error :(',
  message: 'User table error',
  type: 'warn',
  options: {autoClose: true}
})(UserTable)

// or customize the message based on props or the error
export default onCatch({
  placeholder: 'Error :(',
  message: (props, error, errorInfo) => `User table error. User: ${props.loginId}`
})(UserTable)

```

The `onCatch` wraps the component in an [error boundary](https://reactjs.org/docs/error-boundaries.html). It does two
things.

1. Displays the placeholder instead of the component if it errors(`UserTable` in the example above)
2. Creates a toast

Use the `ifErrorsProp` HOC to display a placeholder if the component receives an `errors` prop.

```jsx
import {onCatch, ifErrorsProp} from '@clearc2/c2-error'

const enhance = compose(
  onCatch({placeholder: 'Error', message: 'User table error.'}),
  connect(userTableSelector, {fetchUsers}),
  ifErrorsProp({placeholder: 'Error'})
)

export default enhance(UserTable)
```

The `onCatch` HOC is meant to catch thrown javascript runtime errors using a React error boundary. The `ifErrorsProp` HOC displays a placeholder if errors are passed as a prop. For example, your component's redux selector can map in errors from a request(s).

The `ifErrorsProp` HOC is not meant to be used if the component is expecting errors to be passed to it. For example, with a form, it is very likely that users will enter invalid data and the api will respond with validation errors. Rather than replacing the whole form with a placeholder, the form will most likely want to render those errors above the inputs to allow the user to correct their input.

### Ajax Errors
`c2-error` uses [axios's `config` object](https://github.com/axios/axios#request-method-aliases) to display errors if
the request promise is rejected.

```js
// use a simple error message
axios.get('/sites/123/tickets', {onError: `Error fetching site 123's tickets.`})

// or return a string based on the axios error
axios.get('/sites/123/tickets', {
  onError: (error) => {
    if (error.response.status === 404) {
      return `Couldn't find site 123's tickets.`
    }
    return `Error fetching site 123's tickets.`
  }
})

// or customize the toast by returning an object
axios.get('/sites/123/tickets', {
  onError: (error) => {
    return {
      message: `${error.response.status} - Error fetching site 123's tickets.`,
      type: 'warn',
      options: {
        autoClose: true
      }
    }
  }
})
```

## Tips
Higher-order components can become awkward if several are used on the same component. Redux comes with a `compose`
function that makes this less awkward.


```jsx
import React from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {onCatch, ifErrorsProp} from '@clearc2/c2-error'
import SitesTable from './SitesTable'
import selector from './selector'
import {fetchSites} from '../actions'

const enhance = compose(
  onCatch({placeholder: <BrokenIcon />, message: 'Sites table error'}),
  connect(selector, {fetchSites}),
  ifErrorsProp({placeholder: <BrokenIcon />})
)

export default enhance(SitesTable)

// the above is the same as this:
export default onCatch({placeholder: <BrokenIcon />, message: 'Sites table error'})(connect(selector, {fetchSites})(ifErrorsProp({placeholder: <BrokenIcon />})(UserTable)))
```
