/* ========================================================================
 * github.com/wearecolours/biginjapan
 * ========================================================================
 * Copyright 2015 Ivar Borthen.
 * No dependencies needed.
 * ======================================================================== */

/* Usage

Required:
data-biginjapan=true : inits biginjapan. (Autostarts)

Optional:
data-biginjapan-isincontainer : use true if respect container - default uses browser viewport
data-biginjapan-percentage : (0-1) % of height of biginjapan - default is 1 (100%)
data-biginjapan-exclude : false / CSS selector

Pause it:
BigInJapan.pause();

Update it:
BigInJapan.start();

*/

var BigInJapan = (function () {

  function biginjapan() {
    this.wrappers = [];
    this.paused = true;
  }

  biginjapan.prototype.start = function(){

    this.getElements();
    if (window.addEventListener && this.paused === true) {
      window.addEventListener('resize', this.calculateHeights.bind(this), false);
    }
    this.paused = false;
    this.calculateHeights();

  };

  biginjapan.prototype.pause = function(){
    this.paused = true;
  };

  biginjapan.prototype.getElements = function(){

    var _el = document.querySelectorAll('[data-biginjapan]');
    this.wrappers = [];
    for(var i=0, l=_el.length; i<l; i++){
      this.wrappers[i] = {
        el : _el[i],
        isincontainer : _el[i].dataset.biginjapanIsincontainer,
        exclude : _el[i].dataset.biginjapanExclude,
        percentage : _el[i].dataset.biginjapanPercentage === undefined ? 1 : Number(_el[i].dataset.biginjapanPercentage)
      }
      if(this.wrappers[i].isincontainer){
        this.wrappers[i].myparent = this.wrappers[i].el.parentNode;
      }
    }

  };

  biginjapan.prototype.calculateHeights = function(){

    if(this.paused) return false;

    var myWidth, myHeight;
    if (document.compatMode === 'BackCompat') {
        myHeight = document.body.clientHeight;
        myWidth = document.body.clientWidth;
    } else {
        myHeight = document.documentElement.clientHeight;
        myWidth = document.documentElement.clientWidth;
    }
    for(var i=0;i<this.wrappers.length;i++){
      var e = this.wrappers[i];
      var c = this.excludeitemfromheight(e.exclude);
      if(e.isincontainer){
        console.log(this.returnWidthOfSingleElement(e.myparent));
        e.el.style.width = (this.returnWidthOfSingleElement(e.myparent)) + 'px';
        e.el.style.height = ((this.returnHeightOfSingleElement(e.myparent)-c)*e.percentage) + 'px';
      } else {
        e.el.style.width = (myWidth) + 'px';
        e.el.style.height = ((myHeight-c)*e.percentage) + 'px';
      }
    }
  }

  biginjapan.prototype.excludeitemfromheight = function(_elements){

    if(!_elements){
      return 0;
    }
    var _excludeheight = 0,
    _el = [];
    // should we improve on this?
    if(_elements.indexOf('#')===0){
      _el = document.getElementById(_elements.slice(1)) !== null ? [document.getElementById(_elements.slice(1))] : []; // return empty if no such #ID elements in DOM.
    } else if(_elements.indexOf('.')===0){
      _el = document.getElementsByClassName(_elements.slice(1));
    } else if(_elements.indexOf('<')===0){
      _el = document.getElementsByTagName((_elements.slice(1)).slice(0, -1));
    } else {
      _el = document.querySelectorAll(_elements);
    }
    for(var i=0; i<_el.length; i++){
      _excludeheight += this.returnHeightOfSingleElement(_el[i]);
    }
    return _excludeheight;

  }

  biginjapan.prototype.returnHeightOfSingleElement = function(_element) {

    var elmHeight, elmMargin;
    if(document.all) {// IE
        elmHeight = parseInt(_element.currentStyle.height);
        elmMargin = parseInt(_element.currentStyle.marginTop, 10) + parseInt(_element.currentStyle.marginBottom, 10);
    } else {// Mozilla
        elmHeight = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('height'));
        elmMargin = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-bottom'));
    }
    return (elmHeight+elmMargin);

  }

  biginjapan.prototype.returnWidthOfSingleElement = function(_element) {

    var elmWidth, elmMargin;
    if(document.all) { // IE
        elmWidth = parseInt(_element.currentStyle.width);
        elmMargin = parseInt(_element.currentStyle.marginLeft, 10) + parseInt(_element.currentStyle.marginRight, 10);
    } else { // Mozilla
        elmWidth = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('width'));
        elmMargin = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-left')) + parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-right'));
    }
    return (elmWidth+elmMargin);

  }

  biginjapan.prototype.start();
  return biginjapan.prototype;

}());
