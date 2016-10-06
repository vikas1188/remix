'use strict'
var DropdownPanel = require('./DropdownPanel')
var util = require('../helpers/ui')
var yo = require('yo-yo')

function MemoryPanel (_parent, _traceManager) {
  this.parent = _parent
  this.traceManager = _traceManager
  this.basicPanel = new DropdownPanel('Memory')
  this.init()
}

MemoryPanel.prototype.render = function () {
  return yo`<div id='memorypanel' >${this.basicPanel.render()}</div>`
}

MemoryPanel.prototype.init = function () {
  var self = this
  this.parent.register('indexChanged', this, function (index) {
    if (index < 0) return
    if (self.parent.currentStepIndex !== index) return

    self.traceManager.getMemoryAt(index, function (error, memory) {
      if (error) {
        console.log(error)
        self.basicPanel.data = {}
      } else if (self.parent.currentStepIndex === index) {
        self.basicPanel.data = util.formatMemory(memory, 16)
      }
      self.basicPanel.update()
    })
  })
}

module.exports = MemoryPanel
