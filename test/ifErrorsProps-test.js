/* eslint-disable react/prop-types */
import React from 'react'
import {expect} from 'chai'
import {render} from 'react-testing-library'
import ifErrorsProps from '../src/ifErrorsProp'

function Greeting ({name}) {
  return <div>Hello, {name}</div>
}

const id = 456
const name = 'Joe'
const error = 'This is an error'
const placeholderText = 'BROKEN'
const placeholderEl = <div>{placeholderText}</div>

describe('ifErrorsProps', () => {
  it('should render underlying component if no errors', () => {
    const WrappedGreeting = ifErrorsProps({placeholder: placeholderEl})(Greeting)
    const {container} = render(<WrappedGreeting name={name} />)
    expect(container.innerHTML).to.include(name)
  })

  it('should render placeholder component if errors', () => {
    const WrappedGreeting = ifErrorsProps({placeholder: placeholderEl})(Greeting)
    const {container} = render(<WrappedGreeting name={name} errors={['This is an error']} />)
    expect(container.innerHTML).to.not.include(name)
    expect(container.innerHTML).to.include(placeholderText)
  })

  it('should support placeholder function', () => {
    const placeholderFunc = ({errors}) => <div>{errors.join(', ')}</div>
    const WrappedGreeting = ifErrorsProps({placeholder: placeholderFunc})(Greeting)
    const {container} = render(<WrappedGreeting name={name} errors={[error]} />)
    expect(container.innerHTML).to.not.include(name)
    expect(container.innerHTML).to.include(error)
  })

  it('should support placeholder function with component props', () => {
    const placeholderFunc = ({id}) => <div>{id}</div>
    const WrappedGreeting = ifErrorsProps({placeholder: placeholderFunc})(Greeting)
    const {container} = render(<WrappedGreeting name={name} id={id} errors />)
    expect(container.innerHTML).to.not.include(name)
    expect(container.innerHTML).to.include(id)
  })
})
