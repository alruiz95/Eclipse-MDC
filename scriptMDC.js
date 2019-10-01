
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
var notepadHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");
var searchHTMLElement = document.createElement("div");

// ============= HOME IDS
var callsBoxMiniID="idCallsBox";
var calls911ID="calls911Id";
var callsBackupID="callsBackupID";
var bolosListID="bolosListID";


// ============ MDC Global Variables
var UnitStats = {"avaible":0, "unavaible":1, "responding":2, "onScene":3}
var myUnitStatus = UnitStats.avaible;

//============= search ids
var indvChargers = "indvChargers";
var tabsIds = ["chargesPlayer", "listVehicles", "listProperties", "listfire"];

function onLoad(){

  loadFileToElement(homeHTMLElement, "home");
  loadFileToElement(searchHTMLElement, "search");
  loadFileToElement(notepadHTMLElement, "notepad");

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
  
  //myUnitStatus.registerListener(myUnitStatusCahnge);
}

function myUnitStatusCahnge(val){

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

function rollDownCallsBox(){
  var objDiv = document.getElementById(callsBoxID);
  objDiv.scrollTop = objDiv.scrollHeight;
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
    case "notepad":
      document.getElementById(IdInnerMDC).innerHTML = notepadHTMLElement.innerHTML;
      break;
  }

  
}

function updateMDC(){
  var InnerMDCElement =  document.getElementById(calls911ID);
  if (InnerMDCElement){
    document.getElementById(IdInnerMDC).innerHTML = homeHTMLElement.innerHTML;
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
  txtFile.send();
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

// ==================================================== Individual Seaarch
function searchPerson(){
  
  document.getElementById(indvChargers).innerHTML = "";
  document.getElementById(PersonContent).hidden = false;
  document.getElementById(VehicleContent).hidden = true;
  loadIndvDetails("Arnold Williams", "20/07/1995", 20, 1243245,"Costarrican","Black","black","blue",true,false,"20/07/2020",false,false,1,true,"something cool here \n testing",true);
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
  addCharge("20/23/2019 04:23", "VC023","Brandishing a Firearm or Weapon (Misdmainor $1000) attempt againts a goverment employee something more", "Arnold Williams");
}


function loadIndvDetails(name, dateOfBirth, age, phoneNumber, nationality, hairColor, skinColor, eyeColor, driverLic, truckLic, weaponLic, probation, bolo, deremits, mugsAndPrints, AddicionalInformation, wanted = false) {

  var details =  document.getElementById(PersonContent).querySelectorAll('.searchIndvProperty');
  details[0].querySelector("div:nth-child(2)").innerHTML = name;
  details[1].querySelector("div:nth-child(2)").innerHTML = dateOfBirth;
  details[2].querySelector("div:nth-child(2)").innerHTML = age;
  details[3].querySelector("div:nth-child(2)").innerHTML = phoneNumber;
  details[4].querySelector("div:nth-child(2)").innerHTML = nationality;
  details[5].querySelector("div:nth-child(2)").innerHTML = hairColor;
  details[6].querySelector("div:nth-child(2)").innerHTML = skinColor;
  details[7].querySelector("div:nth-child(2)").innerHTML = eyeColor;


  details[8].querySelector("div:nth-child(3)").innerHTML = "";
  if (typeof driverLic === "boolean" && driverLic == true){
    details[8].querySelector("div:nth-child(2)").classList.add("Valid");
    details[8].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[8].querySelector("div:nth-child(2)").innerHTML = "Valid";
  }
  else if (typeof driverLic === "boolean" && driverLic == false){
    details[8].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[8].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[8].querySelector("div:nth-child(2)").innerHTML = "Invalid";
  }
  if (typeof driverLic === "string"){
    details[8].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[8].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[8].querySelector("div:nth-child(2)").innerHTML = "Invalid";
    details[8].querySelector("div:nth-child(3)").innerHTML = "Suspended til: " + driverLic;
  }
  

  details[9].querySelector("div:nth-child(3)").innerHTML = "";
  if (typeof truckLic === "boolean" && truckLic == true){
    details[9].querySelector("div:nth-child(2)").classList.add("Valid");
    details[9].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[9].querySelector("div:nth-child(2)").innerHTML = "Valid";
  }
  else if (typeof truckLic === "boolean" && truckLic == false){
    details[9].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[9].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[9].querySelector("div:nth-child(2)").innerHTML = "Invalid";
  }
  if (typeof truckLic === "string"){
    details[9].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[9].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[9].querySelector("div:nth-child(2)").innerHTML = "Invalid";
    details[9].querySelector("div:nth-child(3)").innerHTML = "Suspended til: " + truckLic;
  }

  details[10].querySelector("div:nth-child(3)").innerHTML = "";
  if (typeof weaponLic === "boolean" && weaponLic == true){
    details[10].querySelector("div:nth-child(2)").classList.add("Valid");
    details[10].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[10].querySelector("div:nth-child(2)").innerHTML = "Valid";
  }
  else if (typeof weaponLic === "boolean" && weaponLic == false){
    details[10].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[10].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[10].querySelector("div:nth-child(2)").innerHTML = "Invalid";
  }
  else{
    details[10].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[10].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[10].querySelector("div:nth-child(2)").innerHTML = "Invalid";
    details[10].querySelector("div:nth-child(3)").innerHTML = "Suspended til: " + weaponLic;
  }


  if (probation == true){
    details[11].querySelector("div:nth-child(2)").classList.add("Valid");
    details[11].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[11].querySelector("div:nth-child(2)").innerHTML = "Yes";
  }
  else {
    details[11].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[11].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[11].querySelector("div:nth-child(2)").innerHTML = "No";
  }

  if (bolo != true){
    details[12].querySelector("div:nth-child(2)").classList.add("Valid");
    details[12].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[12].querySelector("div:nth-child(2)").innerHTML = "Clean";
  }
  else {
    details[12].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[12].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[12].querySelector("div:nth-child(2)").innerHTML = "Wanted";
  }

  details[13].querySelector("div:nth-child(2)").innerHTML = deremits;

  if (mugsAndPrints == true){
    details[14].querySelector("div:nth-child(2)").classList.add("Valid");
    details[14].querySelector("div:nth-child(2)").classList.remove("Invalid");
    details[14].querySelector("div:nth-child(2)").innerHTML = "Taken";
  }
  else {
    details[14].querySelector("div:nth-child(2)").classList.remove("Valid");
    details[14].querySelector("div:nth-child(2)").classList.add("Invalid");
    details[14].querySelector("div:nth-child(2)").innerHTML = "Missing";
  }

  //document.getElementById(PersonContent).querySelector("textarea").value = AddicionalInformation;
}

function addCharge(time, code, description, officer){
  console.log("test");
  var chargersElements = document.getElementById(indvChargers);
  chargersElements.innerHTML = 
  `<div>
    <p>` + time + `</p>
    <p>` + code + `</p>
    <p>` + description + `</p>
    <p>` + officer + `</p>
  </div>` + chargersElements.innerHTML;
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


function add911Call(type, id, time, caller, information, onload=false){
  
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
  boxElement.innerHTML  = inner + boxElement.innerHTML;
  updateMDC();
  rollDownCallsBox();
  if(!onload && myUnitStatus == UnitStats.avaible){
    var audio = new Audio('sounds/notification.mp3');
    audio.volume = 0.04;
    audio.play()
  }
}

function addBackupCall(isPanic, id, time, unit, information, onload=false){
  

  var boxElement = document.getElementById(callsBoxMiniID);
  var inner = '<div class="call" id="miniCall-' + id + '">' +
                '<div class="callType ' + (isPanic ?  'both' : 'police')  + '"><i class="fa ' + (isPanic ?  'fa-exclamation-triangle' : 'fa-exclamation ') + '"></i></div>' + 
                '<div class="description" onclick="unhideMDCHome()" '+ (isPanic ? 'style="background-color: rgba(53, 10, 10, 0.884);"' :'') +'">' + unit +" - " + (isPanic ? 'PANIC ALARM' : ('BACKUP: ' + information)) + '</div>' +
                '<i class="fas fa-sign-in-alt responce" onclick="respondCall(' + id + ')"></i>' +
                '<i class="fas fa-location-arrow setcall" onclick="setCall(' + id + ')"></i>' +
                '<i class="fas fa-times closeCall" onclick="closeCall(' + id + ')"></i>' +
              '</div>';

  boxElement.innerHTML += inner;

  boxElement = homeHTMLElement.querySelector('#' + callsBackupID);
  var inner = '<div id="call911-' + id + '" >' +
                  '<p><i class="fa ' + (isPanic ?  'fa-exclamation-triangle' : 'fa-exclamation ') +'" ' + (isPanic ? 'style="color: rgb(252, 77, 77)"' : "") + '></i></p>' +
                  '<p>' + time + '</p>' +
                  '<p>0</p>' +
                  '<p>' + unit + '</p>' +
                  '<p>' + (isPanic ? 'PANIC ALARM' : ('BACKUP: ' + information)) + '</p>' +
                  '<p> <i class="fas fa-sign-in-alt responce" onclick="respondCall(' + id + ')"></i>' +
                      '<i class="fas fa-location-arrow setcall" onclick="setCall(' + id + ')"></i>' +
                      '<i class="fas fa-times closeCall" onclick="closeCall(' + id + ')"></i>' +
              '</div>'
  boxElement.innerHTML = inner + boxElement.innerHTML;
  updateMDC();
  rollDownCallsBox();

  if (isPanic && !onload ){
    var audio = new Audio('sounds/panic-button.mp3');
    audio.volume = 0.04;
    audio.play()
  }
  else if(!isPanic && !onload && myUnitStatus == UnitStats.avaible){
    var audio = new Audio('sounds/notification.mp3');
    audio.volume = 0.04;
    audio.play()
  }
  
}

function closeCall(id){
 
  document.getElementById('miniCall-' + id).remove();
  
  homeHTMLElement.querySelector('#call911-' + id).remove();
  updateMDC();  
  rollDownCallsBox();
}

function addBoloToMDC (id, time, plate, person, information) {
  var boxElement = homeHTMLElement.querySelector('#' + bolosListID);
  var inner = '<div id="boloID-' + id + '">' +
                '<p>' + id + '</p>' +
                '<p>' + time + '</p>' +
                '<p ' + ((plate !== null && plate !== '') ? 'class="clicklabe"': '') +'>' + ((plate !== null && plate !== '') ? plate: 'N/A') +'</p>' +
                '<p ' + ((person !== null && person !== '') ? 'class="clicklabe"': '') +'>' + ((person !== null && person !== '') ? person: 'N/A') +'</p>' +
                '<p>' + information + '</p>' +
                '<p><i class="fas fa-times closeCall" onclick="closeBolo(' + id + ')"></i></p>' +
              '</div>';

  boxElement.innerHTML += inner;
  updateMDC();
}

function closeBolo(id){
  homeHTMLElement.querySelector('#boloID-' + id).remove();
  updateMDC();
}

function toggleSearTab(id){
  tabsIds.forEach(function(element) {
    document.getElementById(element).hidden = true;
  });
  document.getElementById(id).hidden = false;
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
  add911Call(2, 543, "10:12", "Arnold Williams", "There's a shootout and people are hurt", true);
  add911Call(1, 544, "10:22", "Jon_Cena", "I just hit a pole, need help", true);
  addBackupCall(true, 548,  "11:01", "22-L-18", "", true);
  add911Call(0, 545, "10:43", "Travis palmer", "My car just broke down and now i need a fucking ride to this call help", true);
  addBackupCall(false, 549,  "11:23", "22-L-18", "For MD", true);
  add911Call(0, 546, "10:46", "Mary Davis", "My car just broke down and now i need a fucking ride to this call ssomsm dfg sdfg fdg", true);
  add911Call(0, 547, "10:56", "Harry Davis", "My car just broke down and now i need a fucking ride to this call ssomsm dfg sdfg fdg", true);
  addBackupCall(true, 550,  "11:40", "Staff 1", "", true);
  add911Call(0, 551, "11:03", "Cashier", "CCTV cameras noticed unusual activities going on the store. Alarm has been triggered", true);


  addBoloToMDC (0, "17:30", "24SJDB435L", "Feemo_Jhonson", "Driving Blue and red Chino, Blue shirt, Felony Evation");
  addBoloToMDC (1, "17:30", "SDDF453SD", "Teemo_Ferguson", "Attempt in murder on a civilian");
  addBoloToMDC (2, "17:30", null, "Rosa_Melano", "Armed Robbery, blue pants.");
  addBoloToMDC (3, "17:30", "", null, "Two Individuals");
  addBoloToMDC (4, "17:30", "SDG34SDFE", "", "Reported Stolen");
}


function fadeout (element){
  element.style.opacity = "0.5"; 
}

function fadein (element){
  element.style.opacity = "1"; 
}