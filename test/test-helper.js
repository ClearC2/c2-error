import 'babel-polyfill'
import chai from 'chai'
import dirtyChai from 'dirty-chai'
import jsdom from 'jsdom'

const dom = new jsdom.JSDOM('<!doctype html><html><body></body></html>')

global.window = dom.window
global.document = dom.window.document
global.navigator = dom.window.navigator

chai.use(dirtyChai)
