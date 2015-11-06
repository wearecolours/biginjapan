/* ========================================================================
 * github.com/wearecolours/jquery.biginjapan 
 * ========================================================================
 * Copyright 2015 Ivar Borthen.
 * No dependencies needed.
 * ======================================================================== */

/* Usage

Required:
data-biginjapan=true : inits biginjapan. (Autostarts)

Optional:
data-biginjapan-isincontainer : use true if respect container - default uses browser viewport
data-biginjapan-percentheight : (0-1) % of height of biginjapan - default is 1 (100%)
data-biginjapan-excludeitemfromheight : false / jquery selector

Pause it:
BigInJapan.pause();

Start or Update it:
BigInJapan.start();

*/

function biginjapan() {
  this.wrappers = [];
  this.start = function(){
    this.getElements();
    this.pause(); // dont make to many event
    if (window.addEventListener) {
      window.addEventListener('resize', this.calculateHeights.bind(this), false);
    }
    this.calculateHeights();
  };
  this.pause = function(){
    if (window.removeEventListener) {
        window.removeEventListener('resize', this.calculateHeights);
    }
  };
  this.getElements = function(){
    var _el = document.querySelectorAll('[data-biginjapan]');
    this.wrappers = [];
    for(var i=0, l=_el.length; i<l; i++){
      this.wrappers[i] = {
        el : _el[i],
        isincontainer : _el[i].dataset.biginjapanIsincontainer,
        excludeitemsfromheight : _el[i].dataset.biginjapanExcludeitemsfromheight,
        percentheight : _el[i].dataset.biginjapanPercentheight === undefined ? 1 : Number(_el[i].dataset.biginjapanPercentheight)
      }
      if(this.wrappers[i].isincontainer){
        this.wrappers[i].myparent = this.wrappers[i].el.parentNode;
      }
    }
  };
  this.calculateHeights = function(){
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
      var c = this.excludeitemfromheight(e.excludeitemsfromheight);
      if(e.isincontainer){
        console.log(this.returnWidthOfSingleElement(e.myparent));
        e.el.style.width = (this.returnWidthOfSingleElement(e.myparent)) + 'px';
        e.el.style.height = ((this.returnHeightOfSingleElement(e.myparent)-c)*e.percentheight) + 'px';
      } else {
        e.el.style.width = (myWidth) + 'px';
        e.el.style.height = ((myHeight-c)*e.percentheight) + 'px';
      }
    }
  }
  this.excludeitemfromheight = function(_elements){
    if(!_elements){
      return 0;
    }
    var _excludeheight = 0,
    _el = [];
    // should we improve on this?
    if(_elements.indexOf('#')===0){
      _el = document.getElementById(_elements) !== null ? document.getElementById(_elements) : []; // return empty if no such #ID elements in DOM.
    } else if(_elements.indexOf('.')===0){
      _el = document.getElementsByClassName(_elements);
    } else if(indexOf('data')===0){
      _el = document.querySelectorAll(_elements);
    } else {
      _el = document.getElementsByTagName(_elements);
    }
    for(var i=0; i<_el.length; i++){
      _excludeheight += returnHeightOfSingleElement(_el[i]);
    }
    return _excludeheight;
  }
  this.returnHeightOfSingleElement = function(_element) {
    var elmHeight, elmMargin;
    if(document.all) {// IE
        elmHeight = parseInt(_element.currentStyle.height);
        elmMargin = parseInt(_element.currentStyle.marginTop, 10) + parseInt(_element.currentStyle.marginBottom, 10);
    } else {// Mozilla
        elmHeight = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('height'));
        elmMargin = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-bottom'));
    }
    console.log(elmHeight, elmMargin);
    return (elmHeight+elmMargin);
  }
  this.returnWidthOfSingleElement = function(_element) {
    var elmWidth, elmMargin;
    if(document.all) {// IE
        elmWidth = parseInt(_element.currentStyle.width);
        elmMargin = parseInt(_element.currentStyle.marginLeft, 10) + parseInt(_element.currentStyle.marginRight, 10);
    } else {// Mozilla
        elmWidth = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('width'));
        elmMargin = parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-left')) + parseInt(document.defaultView.getComputedStyle(_element, '').getPropertyValue('margin-right'));
    }
    return (elmWidth+elmMargin);
  }
  return this.prototype;
}


var BigInJapan = new biginjapan();
BigInJapan.start();