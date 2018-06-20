import React from 'react'
import {onError} from 'c2-error'

function PackageComponent () {
  undefined.test()
  return (
    <h3>Package Component</h3>
  )
}

export default onError({
  placeholder: 'Error :(',
  message: (props) => `PackageComponent Error. Foo: ${props.foo}`
})(PackageComponent)