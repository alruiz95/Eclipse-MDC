
var darkThemeClass = "blackTheme";
var whiteThemeClass = "whiteTheme";

var darkThemeClassMenu = "darkBackground";
var whiteThemeClassMenu = "whiteBackground";

var CompleteMDCid="CompleteMDC";
var lefrMenuId="leftMenuID";
var IdDarkCheckBox = "darkCheckBox";
var IdInnerMDC = "mdcContentMain";
var callsBoxID = "idCallsBox";

var PersonContent = "personContentID";
var VehicleContent = "vehicleContentID";

var homeHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");


function onLoad(){

  loadFileToElement(homeHTMLElement, "home");
  loadFileToElement(searchHTMLElement, "search");

  var checked = localStorage.getItem('darkTheme');
  if ((checked === 'true') || checked == null){
      document.getElementById(CompleteMDCid).classList.add(darkThemeClass);
      document.getElementById(CompleteMDCid).classList.remove(whiteThemeClass);
      document.getElementById(lefrMenuId).classList.add(darkThemeClassMenu);
      document.getElementById(lefrMenuId).classList.remove(whiteThemeClassMenu);
      document.getElementById(IdDarkCheckBox).checked = true;
  } else {
      document.getElementById(CompleteMDCid).classList.remove(darkThemeClass);
      document.getElementById(CompleteMDCid).classList.add(whiteThemeClass);
      document.getElementById(lefrMenuId).classList.remove(darkThemeClassMenu);
      document.getElementById(lefrMenuId).classList.add(whiteThemeClassMenu);
      document.getElementById(IdDarkCheckBox).checked = false;
      localStorage.setItem('darkTheme', false);
  }
  var div = document.getElementById (callsBoxID);
  if (div.addEventListener) {
      div.addEventListener ('overflow', OnOverflowChanged, false);
  }

  dragElement(document.getElementById(CompleteMDCid),document.getElementById("mainHeader"));
  dragElement(document.getElementById("idRadar"),document.getElementById("idMainRadar"));
  jQuery("#LSPDHead").fitText();
  jQuery("#MDCHead").fitText();
  
  document.getElementById("resolution").innerText = window.innerHeight + "x" + window.innerWidth
  window.onresize = function(event) {
    document.getElementById("resolution").innerText = window.innerHeight + "x" + window.innerWidth
  };
  tempData();
  clickMenuOption(null,"home");
  
}

function OnOverflowChanged (event) {
  var objDiv = document.getElementById(callsBoxID);
  
  if (event.type == "overflow") {
    switch (event.detail) {
      case 0:
          objDiv.scrollTop = objDiv.scrollHeight;
          objDiv.style.marginRight = "-17px";
          break;
    }
  }
}

function clipboardPlate(str){
  str = str.trim();
  var el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style = {position: 'absolute', left: '-9999px'};
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function clickMenuOption(divElement, option){
  if(divElement != null){
    var parent = divElement.parentElement;
    
    var divs = parent.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
      if(divs[i].classList!= null){
        if (divs[i].classList.contains("option")) {
          divs[i].classList.remove("active");
          divs[i].classList.add("noActive");
        }        
      }
    }
    divElement.classList.remove("noActive");
    divElement.classList.add("active");
  }

  switch (option){
    case "home":
      document.getElementById(IdInnerMDC).innerHTML = homeHTMLElement.innerHTML;
      break;
    case "search":
      document.getElementById(IdInnerMDC).innerHTML = searchHTMLElement.innerHTML;
      break;
  }

  
}

function loadFileToElement(element, filename) {
  var txtFile = new XMLHttpRequest();
  txtFile.open("GET", filename + ".html", false);
  txtFile.onreadystatechange = function() {
    if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
      if (txtFile.status === 200) {  // Makes sure it's found the file.
        element.innerHTML = txtFile.responseText; 
      }
    }
  }
  txtFile.send(null);
}


function darkTheme(cb) {
  // var msg = new SpeechSynthesisUtterance('9 1 1 Call, A friend has been shoot at');
  // window.speechSynthesis.speak(msg);
  // msg = new SpeechSynthesisUtterance('Dispatch to 22 Lincon 18, responde code 3 to last niner');
  // window.speechSynthesis.speak(msg);
    var mdc = document.getElementById(CompleteMDCid);
    var leftMenu = document.getElementById(lefrMenuId);
    if (mdc){
        if(cb.checked){
            mdc.classList.remove(whiteThemeClass);
            mdc.classList.add(darkThemeClass);
            leftMenu.classList.remove(whiteThemeClassMenu);
            leftMenu.classList.add(darkThemeClassMenu);
            localStorage.setItem('darkTheme', true);
        }else{
            mdc.classList.add(whiteThemeClass);
            mdc.classList.remove(darkThemeClass);
            leftMenu.classList.add(whiteThemeClassMenu);
            leftMenu.classList.remove(darkThemeClassMenu);
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

function showWanted(){
  var audio = new Audio('sounds/wanted.mp3');
  audio.volume = 0.2;
  audio.play();
  document.getElementById("wantedWarning").hidden = false;
}

function searchVehicle(){
  document.getElementById(PersonContent).hidden = true;
  document.getElementById(VehicleContent).hidden = false;
}
function searchPerson(){
  document.getElementById(PersonContent).hidden = false;
  document.getElementById(VehicleContent).hidden = true;
}

function toggleMDC(){
  if (document.getElementById(CompleteMDCid).hidden){
    document.getElementById(CompleteMDCid).hidden = false;
  }else{
    document.getElementById(CompleteMDCid).hidden = true;
  }
}

function unhideMDCHome(){
  if (document.getElementById(CompleteMDCid).hidden){
    document.getElementById(CompleteMDCid).hidden = false;
    clickMenuOption("home");
  }
}


function add911Call(type, id, time, caller, information){
  var callsBoxMiniID="idCallsBox";
  var calls911ID="calls911Id";
  var boxElement = document.getElementById(callsBoxMiniID);

  var callType = null;
  switch (type){
    case 0:
      callType = "police";
      break;
    case 1:
      callType = "medic";
      break;
    case 2: 
      callType = "both";
      break;
    default:
      callType = "both";
  }

  var inner = '<div class="call" id="miniCall-' + id + '">' +
                '<div class="callType ' +  callType + '"><i class="fas fa-phone"></i></div>' + 
                '<div class="description" onclick="unhideMDCHome()">' + information + '</div>' +
                '<i class="fas fa-sign-in-alt responce" onclick="respondCall(' + id + ')"></i>' +
                '<i class="fas fa-location-arrow setcall" onclick="setCall(' + id + ')"></i>' +
                '<i class="fas fa-times closeCall" onclick="closeCall(' + id + ')"></i>' +
              '</div>';

  boxElement.innerHTML += inner;
  boxElement = homeHTMLElement.querySelector('#' + calls911ID);
  inner = '<div id="call911-' + id + '">' +
            '<p><i class="' + callType + '">' + id + '</i></p>' +
            '<p>' + time + '</p>' +
            '<p>0</p>' +
            '<p>'+ caller + '</p>' +
            '<p>' + information + '</p>' +
            '<p><i class="fas fa-sign-in-alt responce" onclick="respondCall(' + id + ')"></i>' +
                '<i class="fas fa-location-arrow setcall" onclick="setCall(' + id + ')"></i>' +
                '<i class="fas fa-times closeCall" onclick="closeCall(' + id + ')"></i>' +
          '</div>'
  boxElement.innerHTML += inner;
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



function tempData (){
  add911Call(2, 543, "10:12", "Arnold Williams", "There's a shootout and people are hurt");
  add911Call(1, 544, "10:22", "Jon_Cena", "I just hit a pole, need help");
  add911Call(0, 545, "10:43", "Travis palmer", "My car just broke down and now i need a fucking ride to this call ssomsm dfg sdfg fdg");
  add911Call(0, 546, "10:46", "Mary Davis", "My car just broke down and now i need a fucking ride to this call ssomsm dfg sdfg fdg");
  add911Call(0, 547, "10:56", "Harry Davis", "My car just broke down and now i need a fucking ride to this call ssomsm dfg sdfg fdg");
}