var darkThemeClass = "blackTheme";
var whiteThemeClass = "whiteTheme";

var CompleteMDCid="CompleteMDC";
var IdDarkCheckBox = "darkCheckBox";
var IdInnerMDC = "InnerContent";

function onLoad(){
    var checked = localStorage.getItem('darkTheme');
    if ((checked === 'true') || checked == null){
        document.getElementById(CompleteMDCid).classList.add(darkThemeClass);
        document.getElementById(CompleteMDCid).classList.remove(whiteThemeClass);
        document.getElementById(IdDarkCheckBox).checked = true;
    } else {
        document.getElementById(CompleteMDCid).classList.remove(darkThemeClass);
        document.getElementById(CompleteMDCid).classList.add(whiteThemeClass);
        document.getElementById(IdDarkCheckBox).checked = false;
        localStorage.setItem('darkTheme', false);
    }

    dragElement(document.getElementById("CompleteMDC"),document.getElementById("mainHeader"));
    jQuery("#LSPDHead").fitText();
    jQuery("#MDCHead").fitText();
    clickMenuOption("home");
}

function clickMenuOption(option){
  $("#"+IdInnerMDC).load("include/" + option +".html"); 
  //console.log(str);
  //document.getElementById(IdInnerMDC).innerHTML(str);
}

function darkTheme(cb) {
  var msg = new SpeechSynthesisUtterance('9 1 1 Call, A friend has been shoot at');
  window.speechSynthesis.speak(msg);
  msg = new SpeechSynthesisUtterance('Dispatch to 22 Lincon 18, responde code 3 to last niner');
  window.speechSynthesis.speak(msg);
    var mdc = document.getElementById(CompleteMDCid);
    if (mdc){
        if(cb.checked){
            mdc.classList.remove(whiteThemeClass);
            mdc.classList.add(darkThemeClass);
            localStorage.setItem('darkTheme', true);
        }else{
            mdc.classList.add(whiteThemeClass);
            mdc.classList.remove(darkThemeClass);
            localStorage.setItem('darkTheme', false);
        }
    }
   
    console.log("Clicked, new value = " + cb.checked);
}

function dragElement(elmnt, clickElmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (clickElmnt) {
      // if present, the header is where you move the DIV from:
      clickElmnt.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV: 
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }




  ///////////////////////////////=================== JQUERRY
  (function( $ ){

    $.fn.fitText = function( kompressor, options ) {
  
      // Setup options
      var compressor = kompressor || 1,
          settings = $.extend({
            'minFontSize' : Number.NEGATIVE_INFINITY,
            'maxFontSize' : Number.POSITIVE_INFINITY
          }, options);
  
      return this.each(function(){
  
        // Store the object
        var $this = $(this);
  
        // Resizer() resizes items based on the object width divided by the compressor * 10
        var resizer = function () {
          $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        };
  
        // Call once to set.
        resizer();
  
        // Call on resize. Opera debounces their resize by default.
        $(window).on('resize.fittext orientationchange.fittext', resizer);
  
      });
  
    };
  
  })( jQuery );