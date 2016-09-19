//#(c) 2014 Indexia, Inc.
import Ember from "ember";
import { module, test } from 'qunit';
import Config from "ember-tree-utils/config";
import WithConfigMixin from "ember-tree-utils/mixins/with-config";

let TestComponent = Ember.Component.extend(WithConfigMixin, {
});

module('Testing WithConfigMixin', {
    beforeEach() {
        Ember.Config = Config.create();
        Ember.Config.addConfig('default', {
            baseClass: 'foo',
            tabs: {
                inherited: "true"
            }
        });
    },
});

test('default config', function(assert) {
    assert.ok(Ember.Config.getConfig('default'));
    assert.equal(Ember.Config.getConfig('default.baseClass'), 'foo');
    let view = TestComponent.create({
        classNameBindings: ['config.baseClass'],
    });

    assert.equal(view.get('configName'), 'default');
    assert.strictEqual(view.get('config'), Ember.Config.getConfig('default'));

    Ember.run(function() {
        view.append();
    });

    assert.ok(view.$().hasClass('foo'));
});


test('New Config', function(assert) {
    Ember.Config.addConfig('new', {
        advancedClass: 'bar',
        tabs: {
            extended: "now"
        }
    });

    assert.equal(Ember.Config.getConfig('default.tabs.inherited'), 'true', 'Ensure deep default properties.');
    assert.equal(Ember.Config.getConfig('new.tabs.inherited'), 'true', 'Should deeply inherit from default.');
    assert.equal(Ember.Config.getConfig('new.tabs.extended'), 'now', 'Should extend default.');
    assert.ok(!Ember.Config.getConfig('default.tabs.extended'), 'Should not extend default config');
    assert.equal(Ember.Config.getConfig('new.baseClass'), 'foo', 'Should inherit from default.');
});
