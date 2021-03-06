// Generated by CoffeeScript 1.10.0
(function() {
  var React, Yang,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  Yang = require('yang-js');

  React = require('react');

  module.exports = (require('./yang-react.yang')).bind({
    'extension(component)': function() {
      return {
        global: true,
        scope: {
          action: '0..n',
          container: '0..n'
        },
        resolve: function() {
          this["extends"](['render'].map((function(_this) {
            return function(x) {
              if (_this.locate("action(" + x + ")") == null) {
                return _this.constructor.parse("action " + x + ";");
              }
            };
          })(this)));
          return this["extends"](['props', 'state'].map((function(_this) {
            return function(x) {
              if (_this.locate("container(" + x + ")") == null) {
                return _this.constructor.parse("container " + x + ";");
              }
            };
          })(this)));
        },
        construct: function(data, ctx) {
          var component, k, ref, schema, v;
          this.debug("making React.Component class");
          schema = this;
          component = (function(superClass) {
            extend(_Class, superClass);

            function _Class(props) {
              var k, v;
              _Class.__super__.constructor.apply(this, arguments);
              this.state = {};
              schema.apply(this);
              for (k in this) {
                if (!hasProp.call(this, k)) continue;
                v = this[k];
                if (v instanceof Function) {
                  this[k] = v.bind(this);
                }
              }
            }

            return _Class;

          })(React.Component);
          ref = this.apply(data);
          for (k in ref) {
            v = ref[k];
            component.prototype[k] = v;
          }
          return component;
        }
      };
    }
  });

}).call(this);
