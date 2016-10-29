Yang  = require 'yang-js'
React = require 'react'

module.exports = (require './yang-react.yang').bind {

  'extension(component)': ->
    global: true
    scope:
      action: '0..n'
      container: '0..n'
    resolve: ->
      @extends [ 'render' ].map (x) =>
        unless @locate("action(#{x})")?
          @constructor.parse "action #{x};"
      @extends [ 'props', 'state' ].map (x) =>
        unless @locate("container(#{x})")?
          @constructor.parse "container #{x};"
    construct: (data, ctx) ->
      @debug "making React.Component class"
      schema = this
      component = class extends React.Component
        constructor: (props) ->
          super
          @state = {}
          schema.apply this
          for own k, v of this when v instanceof Function
            @[k] = v.bind this 
      component.prototype[k] = v for k, v of @apply(data)
      return component

}
