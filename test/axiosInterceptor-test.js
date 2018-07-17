import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import addErrorInterceptor from '../src/axiosInterceptor'
import sinon from 'sinon'
import * as reactToastify from 'react-toastify'
import {expect} from 'chai'

const errorResponse = {
  errors: [
    {detail: 'Oops'}
  ]
}

const client = axios.create()
addErrorInterceptor(client)
const mock = new MockAdapter(client)

describe('axiosInterceptor', () => {
  let toastFake
  beforeEach(() => {
    toastFake = sinon.spy()
    const toastFunc = () => {}
    toastFunc.error = toastFake
    sinon.replace(reactToastify, 'toast', toastFunc)
  })

  afterEach(() => {
    mock.reset()
    sinon.restore()
  })

  it('should not toast on success', () => {
    mock.onGet('/users').reply(200, {users: []})
    return client.get('/users', {onError: 'FAIL'}).then(() => {
      expect(toastFake.callCount).to.equal(0)
    })
  })

  it('should toast with string message', () => {
    const onError = 'FAIL'
    mock.onGet('/users').reply(400, errorResponse)
    return client.get('/users', {onError}).catch(() => {
      expect(toastFake.callCount).to.equal(1)
      const toastComponentProps = toastFake.getCall(0).args[0].props
      expect(toastComponentProps.message).to.equal(onError)
    })
  })

  it('should toast with func message that returns string', () => {
    mock.onGet('/users').reply(400, errorResponse)
    const onError = () => 'FAIL!'
    return client.get('/users', {onError}).catch(() => {
      expect(toastFake.callCount).to.equal(1)
      const toastComponentProps = toastFake.getCall(0).args[0].props
      expect(toastComponentProps.message).to.equal(onError())
    })
  })

  it('should toast with func message that returns object', () => {
    mock.onGet('/users').reply(400, errorResponse)
    const onError = () => ({
      message: 'FAIL',
      options: {foo: 'bar'}
    })
    return client.get('/users', {onError}).catch(() => {
      expect(toastFake.callCount).to.equal(1)
      const toastComponentProps = toastFake.getCall(0).args[0].props
      const toastOptions = toastFake.getCall(0).args[1]
      expect(toastComponentProps.message).to.equal('FAIL')
      expect(toastOptions.foo).to.equal('bar')
    })
  })
})
