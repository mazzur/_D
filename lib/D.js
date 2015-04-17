/**
 * _D javascript DOM library
 *
 * API
 *
 * Selectors
 * _D( @param {string} selector ) returns DOM object with _D methods
 * or new element created by tag name
 * current selectors: #id, .class, tag name
 *
 *
 * DOM insertion
 * .put( @param {string || node object} node) insets string or node into
 * parent element removing other children, returns new _D object
 *
 * .add( @param {string || node object} node) adds node into
 * parent element after the last child, returns new _D object
 *
 * .list( @param {array} listArray, @param {string} tag )
 * for each element of the list array creates a node by tag
 * and appends it to the parent, returns parent object
 *
 * Example:
 *  var list = ['much clever', 'so exciting', 'how thoughtful','like!'];
 *  _D('#someId')
 *      .add(_D('ul')
 *      .add(_D('li').put( _D('h1').put('WOW!') ))
 *      .list(list, 'li')
 *      );
 *
 */

(function(window){

    'use strict';

    var _D, patterns = {
        //currently id and class selectors only
        selectors: /^(#|\.)\w+/,
        word: /\w+/
        },
        getBy = {
        '#': 'getElementById',
        '.': 'getElementsByClassName',
        'tag': 'getElementsByTagName'
        };

    function put(node) {
        //put only first node selected by class
        node = (typeof(node)==='object' && node.length) ? node[0] : node;

        if (this.length) {
            Array.prototype.forEach.call(this, function (el) {
                _putChild(el,node);
            });
        } else {
            _putChild(this,node);
        }

        return this;
    }

    function _putChild(el,child) {
        if (typeof(child)==='object') {
            el.innerHTML = '';
            el.appendChild(child.cloneNode(true))
        } else {
            el.innerHTML = child;
        }
    }

    function add(node) {
        if (typeof(node) !== 'object') throw 'not a valid element';

        //add only first node selected by class
        node = (node.length) ? node[0] : node;

        if (this.length) {
            Array.prototype.forEach.call(this, function (el) {
                el.appendChild(node.cloneNode(true));
            });
        } else {
            this.appendChild(node.cloneNode(true));
        }

        return this;
    }

    function list(listArray, tag) {
        var that = this;

        listArray.forEach(function(item){
            that.add(_D(tag).put(item));
        });

        return that;

    }

    _D = function(selector) {
        var getReg = selector.match(patterns.selectors);
        var element = (getReg) ? document[getBy[getReg[1]]](selector.match(patterns.word)) :
            document[getBy['tag']](selector);

        //if node is not in DOM tree document.get methods return
        // object with zero length property
        if (element.length === 0) {
            element = document.createElement(selector);
        }

        element.put = put;
        element.add = add;
        element.list = list;

        return element;
    };

    window._D = _D;

}(window));