import React from 'react'
import {onCatch} from 'c2-error'

function PackageComponent () {
  undefined.test()
  return (
    <h3>Package Component</h3>
  )
}

export default onCatch({
  placeholder: 'Error :(',
  message: (props) => `PackageComponent Error. Foo: ${props.foo}`
})(PackageComponent)
