//#(c) 2014 Indexia, Inc.
import Ember from "ember";
import { module, test } from 'qunit';

var View, view;

module('Testing WithConfigMixin', {
    beforeEach() {
        Ember.Config = Ember.Eu.Config.create();
        Ember.Config.addConfig('default', {
            baseClass: 'foo',
            tabs: {
                inherited: "true"
            }
        });

        View = Ember.View.extend(Ember.Eu.WithConfigMixin, {
        });
    },

    afterEach() {
        Ember.run(function() {
            if (view && !view.isDestroyed) { view.destroy(); }
        });
    }
});

test('default config', function(assert) {
    assert.ok(Ember.Config.getConfig('default'));
    assert.equal(Ember.Config.getConfig('default.baseClass'), 'foo');
    view = View.create({
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
