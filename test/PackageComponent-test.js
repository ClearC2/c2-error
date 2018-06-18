import React from 'react'
import PackageComponent from '../example/src/PackageComponent'
import {shallow} from 'enzyme'
import {expect} from 'chai'

describe('PackageComponent', () => {
  it('renders shallowly', () => {
    const wrapper = shallow(<PackageComponent />)
    expect(wrapper.exists()).to.be.true()
  })
})
