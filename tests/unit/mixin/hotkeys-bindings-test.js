//(c) 2014 Indexia, Inc.
import Ember from 'ember';
import HotkeysBindingsMixin from "ember-tree-utils/mixins/hotkeys-bindings";
import { module, test } from 'qunit';

let trigger = function(type, keyCode, someKey) {
  var e = Ember.$.Event(type);
  e.which = keyCode;

  if (someKey) {
    e[someKey + "Key"] = true;
  }
  return e;
};

let TextComponent = Ember.Component.extend(HotkeysBindingsMixin, {
});

module('Testing Hotkeys Bindings Mixin', {
  beforeEach() {
    Ember.run(function() {
      //without initializing app events won't be fired when triggering events on views such as
      //keypress
      let App = Ember.Application.create();
      App.injectTestHelpers();
    });
  },
});

test('basic', function(assert) {
  let comp = TextComponent.extend({
    hotkeysBindings: ['ctrl-a'],

    actions: {
      'ctrl+a': function() {
        this.set('last', 'ctrl+a');
      },

      'shift+r': function() {
        this.set('last', 'shift+r');
      },

      'alt+f10': function() {
        this.set('last', 'alt+f10');
      },

      'alt+b': function() {
        this.set('last', 'alt+b');
      },

      'meta+f12': function() {
        this.set('last', 'meta+f12');
      }
    }
  });

  let view = comp.create();

  Ember.run(function() {
    view.append();
  });

  let e = trigger("keypress", 65, "ctrl");
  view.$().trigger(e);
  assert.equal(view.get('last'), "ctrl+a");

  e = trigger("keypress", 82, "shift");
  view.$().trigger(e);
  assert.equal(view.get('last'), "shift+r");

  e = trigger("keypress", 121, "alt");
  view.$().trigger(e);
  assert.equal(view.get('last'), 'alt+f10');

  e = trigger("keydown", 66, "alt");
  view.$().trigger(e);
  assert.equal(view.get('last'), 'alt+b');

  e = trigger("keyup", 123, "meta");
  view.$().trigger(e);
  assert.equal(view.get('last'), "meta+f12");
});
