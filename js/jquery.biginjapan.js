/* ========================================================================
 * [githublink here] [docs are here too!]
 * ========================================================================
 * Copyright 2014 Ivar Borthen.
 * Requires jQuery.
 * ======================================================================== */

/* Usage

Required:
data-biginjapan=true : inits biginjapan.

Optional:
data-biginjapan-isincontainer : use true if respect container - default uses browser viewport
data-biginjapan-percentheight : (0-1) % of height of biginjapan - default is 1 (100%)
data-biginjapan-excludeitemfromheight : false / jquery selector

*/

+function ($) { "use strict";


  // Utility
  if ( typeof Object.create !== 'function' ) {
    Object.create = function( obj ) {
      function F() {}
      F.prototype = obj;
      return new F();
    };
  }

  // init GLOBAL nailPluginCollection, used across all .nail plugins.
  if (typeof window.nailPluginCollection !== 'object'){
  window.nailPluginCollection = Object.create({
    'update' : function(){},
    'resize' : function(){}
  });
  window.nailPluginCollectionResize = function(){
    window.nailPluginCollection.resize();
  }
  $(window).on('resize', window.nailPluginCollectionResize);
  }

  // BIGINJAPAN PLUGIN
  // =====================

  $.fn.biginjapan = function () {
    $.fn.biginjapan.wrappers = []; // reset
    var i = 0;
    $('[data-biginjapan]').each(function(){
      var $this = $(this),
      isincontainer = $this.data('biginjapan-isincontainer');
      $.fn.biginjapan.wrappers[i] = {
       el : $this,
       isincontainer : isincontainer,
       excludeitemsfromheight : $this.data('biginjapan-excludeitemsfromheight'),
       percentheight : $this.data('biginjapan-percentheight') === undefined ? 1 : Number($this.data('biginjapan-percentheight'))
      }
      if(isincontainer==true){
        $.fn.biginjapan.wrappers[i].myparent = $this.parent();
      }
      i++;
    });

  }

  $.fn.biginjapan.excludeitemfromheight = function(excludeitemfromheight){
    var _excludeheight = 0;
    $(excludeitemfromheight).each(function(){
     _excludeheight += $(this).outerHeight();
    });
    return _excludeheight;

  }

  $.fn.biginjapan.wrappers = [];

  $.fn.biginjapan.resize = function(){

    if (typeof window.innerWidth != 'undefined') {
      var _w = window.innerWidth,
      _h = window.innerHeight;
    } else {
      var _w = document.documentElement.clientWidth,
      _h = document.documentElement.clientHeight;
    }

    for(var i=0;i<$.fn.biginjapan.wrappers.length;i++){
      var e = $.fn.biginjapan.wrappers[i];
      var c = $.fn.biginjapan.excludeitemfromheight(e.excludeitemsfromheight);
      if(e.isincontainer==true){
        e.el.css({ 'width':e.myparent.width(), 'height':(e.myparent.height()-c)*e.percentheight });
      } else {
        e.el.css({ 'width':_w, 'height':(_h-c)*e.percentheight });
      }
    }
  }

  $.fn.biginjapan();

  // EVENT LISTENER
  // =====================

  // extend nailPluginCollection object with functions from biginjapan
  window.nailPluginCollection.resize = (function(_super) {
    // return event. Note, this added function is the first event we run on a window resize event
    return function() {
        $.fn.biginjapan.resize();
        return _super.apply(this, arguments);
    };
    // Pass control back to the original window.nailPluginCollection.resize
    // by using .apply on `_super`
  })(window.nailPluginCollection.resize);

  $(document).on('biginjapan', $.fn.biginjapan);
  window.nailPluginCollection.resize(); // important that we resize all element incase some are rendered before big in japan

}(jQuery);
