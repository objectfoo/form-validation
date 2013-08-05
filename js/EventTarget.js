var EventTarget = (function () {
  'use strict';

  function EventTarget() {
    this.handlers = {};
  }

  EventTarget.prototype = {
    constructor: EventTarget,

    subscribe: function (type, handler) {

      if (typeof this.handlers[type] === "undefined") {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
    },

    fire: function (event) {
      var i = 0, len, handlers;

      if (!event.target) {
        event.target = this;
      }

      if (this.handlers[event.type] instanceof Array) {
        handlers = this.handlers[event.type];
        for (len = handlers.length; i < len; i++) {
          handlers[i](event);
        }
      }
    },

    unsubscribe: function (type, handler) {
      var i = 0, len, handlers;

      if (this.handlers[type] instanceof Array) {
        handlers = this.handlers[type];
        for (len = handlers.length; i < len; i++) {
          if (handlers[i] === handler) {
            break;
          }
        }
        handlers.splice(i, 1);
      }
    }
  };
  return EventTarget;
})();
