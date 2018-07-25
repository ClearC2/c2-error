/* eslint-disable react/prop-types */
import React from 'react'
import {expect} from 'chai'
import {render} from 'react-testing-library'
import sinon from 'sinon'
import * as reactToastify from 'react-toastify'
import onCatch from '../src/onCatch'

function Greeting ({name, causeError}) {
  if (causeError) undefined.test()
  return <div>Hello, {name}</div>
}

const name = 'Joe'
const placeholderText = 'BROKEN'
const placeholderEl = <div>{placeholderText}</div>

describe('onCatch', () => {
  let toastFake
  beforeEach(() => {
    // error boundaries output the errors in the console. Ignore for clean test output
    sinon.replace(console, 'error', sinon.fake())
    toastFake = sinon.spy()
    const toastFunc = () => {}
    toastFunc.error = toastFake
    sinon.replace(reactToastify, 'toast', toastFunc)
  })
  afterEach(() => {
    sinon.restore()
  })
  it('should render underlying component if no errors', () => {
    const WrappedGreeting = onCatch({placeholder: placeholderEl})(Greeting)
    const {container} = render(<WrappedGreeting name={name} />)
    expect(container.innerHTML).to.include(name)
  })

  it('should render placeholder component if errors', () => {
    const WrappedGreeting = onCatch({placeholder: placeholderEl})(Greeting)
    const {container} = render(<WrappedGreeting name={name} causeError />)
    expect(container.innerHTML).to.not.include(name)
    expect(container.innerHTML).to.include(placeholderText)
  })

  it('should support placeholder function with component props', () => {
    const foo = 'foo'
    const placeholderFunc = ({foo}) => <div>{foo}</div>
    const WrappedGreeting = onCatch({placeholder: placeholderFunc})(Greeting)
    const {container} = render(<WrappedGreeting name={name} foo={foo} causeError />)
    expect(container.innerHTML).to.not.include(name)
    expect(container.innerHTML).to.include(foo)
  })

  it('should toast on error', () => {
    const message = 'Oops!'
    const WrappedGreeting = onCatch({message})(Greeting)
    const {container} = render(<WrappedGreeting name={name} causeError />)
    expect(container.innerHTML).to.not.include(name)
    const toastComponentProps = toastFake.getCall(0).args[0].props
    expect(toastFake.callCount).to.equal(1)
    expect(toastComponentProps.message).to.equal(message)
  })

  it('should toast on error with message func', () => {
    const message = () => 'Oops!'
    const WrappedGreeting = onCatch({message})(Greeting)
    const {container} = render(<WrappedGreeting name={name} causeError />)
    expect(container.innerHTML).to.not.include(name)
    const toastComponentProps = toastFake.getCall(0).args[0].props
    expect(toastFake.callCount).to.equal(1)
    expect(toastComponentProps.message).to.equal(message())
  })

  it('should allow toast options', () => {
    const WrappedGreeting = onCatch({message: 'Oops', options: {foo: 'bar'}})(Greeting)
    const {container} = render(<WrappedGreeting name={name} causeError />)
    expect(container.innerHTML).to.not.include(name)
    const toastOptions = toastFake.getCall(0).args[1]
    expect(toastFake.callCount).to.equal(1)
    expect(toastOptions.foo).to.equal('bar')
  })

  it('should not toast if no message', () => {
    const WrappedGreeting = onCatch({})(Greeting)
    const {container} = render(<WrappedGreeting name={name} causeError />)
    expect(container.innerHTML).to.not.include(name)
    expect(toastFake.callCount).to.equal(0)
  })
})
