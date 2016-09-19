//#(c) 2014 Indexia, Inc.
import Ember from "ember";
import { module, test } from 'qunit';
import StyleBindingsMixin from "ember-tree-utils/mixins/style-bindings";

let TextComponent = Ember.Component.extend(StyleBindingsMixin, {
});

module('Testing Style Bindings Mixin', {
});



test('basic', function(assert) {
    let view = TextComponent.create({
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
