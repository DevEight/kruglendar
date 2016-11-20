'use strict';

var Likely = require('./widget');
var config = require('./config');
var utils = require('./utils');
var dom = require('./dom');

/**
 * @param {Node} node
 * @param {Object} options
 * @returns {Likely}
 */
var likely = function (node, options) {
    var fullOptions = options || {};
    var defaults = {
        counters: true,
        timeout: 1e3,
        zeroes: false,
        title: document.title,
        wait: 0.5e3,
        url: utils.getDefaultUrl(),
    };
    var widget = node[config.name];

    if (widget) {
        widget.update(fullOptions);
    }
    else {
        node[config.name] = new Likely(node, utils.merge(
            {}, defaults,
            fullOptions, utils.bools(node)
        ));
    }

    return widget;
};

/**
 * Initiate Likely buttons on load
 * @param {Object} [options] additional options for each widget
 */
likely.initiate = likely.initate = function (options) {
    var widgets = dom.findAll('.' + config.name);

    utils.toArray(widgets)
        .forEach(function (widget) {
            likely(widget, options);
        });
};

module.exports = likely;
