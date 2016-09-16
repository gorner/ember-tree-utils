//#(c) 2014 Indexia, Inc.
import Ember from "ember";
import { module, test } from 'qunit';

var View, view;

module('Testing Style Bindings Mixin', {
    setup: function() {
        View = Ember.View.extend(Ember.Eu.StyleBindingsMixin, {
        });
    },

    teardown: function() {
        Ember.run(function() {
            if (!view.isDestroyed) { view.destroy(); }
        });
    }
});



test('basic', function(assert) {
    view = View.create({
        styleBindings: ['color', 'width', 'height'],
        color: 'blue',
        width: 400,
        height: '100',
    });

    Ember.run(function() {
        view.append();
    });

    assert.equal(view.$().attr('style'), 'color:blue;width:400px;height:100;', 'Style property should be rendered properly.');
});
