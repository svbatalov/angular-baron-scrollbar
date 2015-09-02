var angular = require('angular');
var qwery = require('qwery');
var xtend = require('xtend');
var insertcss = require('insert-css');

var css = require('fs').readFileSync(__dirname + '/baron.css', 'utf8');
insertcss(css, {prepend: true});

require('./baron.min.js');  // creates window.baron object

module.exports = 'angular-baron-scrollbar';

var template =
' <div class="scroller_wrapper" > ' +
'   <div class="scroller" ng-transclude></div>                              ' +
'   <div class="scroller__track_v">                                         ' +
'     <div class="scroller__bar_v"></div>                                   ' +
'   </div>                                                                  ' +
'   <div class="scroller__track_h">                                         ' +
'     <div class="scroller__bar_h"></div>                                   ' +
'   </div>                                                                  ' +
' </div>                                                                    ' ;

var defaultOpts = {
  scroller: '.scroller',
  bar: '.scroller__bar_v',
  barOnCls: 'baron',

  // Local copy of jQuery-like utility
  // Default: window.jQuery
  $: function(selector, context) {
    return angular.element(qwery(selector, context));
  },
};

angular.module(module.exports, [])
.directive('baronScrollbar', ['$parse', function ($parse) {
  return {
    restrict: 'EA',
    transclude: true,
    template: template,
    replace: true,
    link: function (scope, elem, attr) {
      var hscroll, vscroll;
      var el = elem[0];
      var opts = $parse(attr['opts'])(scope);
      var hopts = $parse(attr['hopts'])(scope);
      var direction = attr['direction'] || 'y';
      opts = xtend(defaultOpts, {root: el}, opts);

      if (direction.indexOf('x') !== -1) {
        hscroll = baron(xtend(opts, {
          barOnCls: 'baron_h',
          bar: '.scroller__bar_h',
          direction: 'h'
        }, hopts));
      }
      if (direction.indexOf('y') !== -1) {
        vscroll = baron(opts);
      }

      scope.$watch('update', function (n, o) {
        if (n) {
          hscroll && hscroll.update();
          vscroll && vscroll.update();
          scope.update = false;
        }
      });

      scope.$on('destroy', function () {
        hscroll && hscroll.dispose();
        vscroll && vscroll.dispose();
      });
    }
  };
}]);
