Yang  = require 'yang-js'
React = require 'react'

module.exports = (require './yang-react.yang').bind {

  'extension(component)': ->
    global: true
    scope:
      action:      '0..n'
      anydata:     '0..n'
      leaf:        '0..n'
      'leaf-list': '0..n'
      list:        '0..n'
    resolve: ->
      required = [ 'constructor', 'render' ]
      @extends required.map (x) =>
        unless @locate("action(#{x})")?
          @constructor.parse "action #{x};"
    construct: (data, ctx) ->
      @debug "making React.Component class"
      self = this
      component = class extends React.Component
        constructor: (props) -> super self.apply(props)
      @debug component
      return component

}
