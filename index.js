'use strict'

const BITCOIN_API_URL = 'https://api.coinhills.com/v1/cspa/'   
const BITCOIN_SYMBOL = '&#3647'
const USD_SYMBOL = '&#36'
var SELECTED_CURRENCY = "";  // cspa/btc/usd/'
var SELECTED_CURRENCY_NAME = "";
var SELECTED_CURRENCY_SYM = "";
var CSPA_CCY_VALUE = 0;
var CSPA_CHANGE_24H = 0;
var CSPA_CHANGE_24H_PCT = 0;
var CSPA_BTC_VALUE = 0;
var FROM_BITCOIN_AMT = "1";
var FROM_CCY_AMT = "1.00";



function renderErrorResult (msg) {
    alert(msg);
}


function extractResults(json) {

  console.log("extractResults ran");

  if (!json.success) {
    console.log("JSON Message", JSON.stringify(json));
    renderErrorResult(json.message);
    return;
  } 

  let cspaKey = "CSPA:BTC/" + SELECTED_CURRENCY.toUpperCase(); 
  CSPA_CCY_VALUE = Number(json.data[cspaKey].cspa);
  CSPA_CCY_VALUE =   Math.round(CSPA_CCY_VALUE * 100) / 100;   // round to 2 decimals
  CSPA_CHANGE_24H = json.data[cspaKey].cspa_change_24h;
  CSPA_CHANGE_24H_PCT = json.data[cspaKey].cspa_change_24h_pct;

  console.log(SELECTED_CURRENCY + ": " + CSPA_CCY_VALUE);

  // renderResults();
}


function extractSecondResults(json) {

  console.log("extractSecondResults ran");

  if (!json.success) {
    console.log("JSON Message", JSON.stringify(json));
    renderErrorResult(json.message);
    return;
  } 

  let cspaKey = "CSPA:" + SELECTED_CURRENCY.toUpperCase() + "/BTC"; 
  CSPA_BTC_VALUE = json.data[cspaKey].cspa;

  console.log("call 2 BTC " + SELECTED_CURRENCY + ": " + CSPA_BTC_VALUE);

  renderResults();
}


function getDataFromApi(ccy) { 

    console.log("getDataFromApi ran");

    var fromBitcoinApiUrl = BITCOIN_API_URL + 'btc/' + ccy + '/?callback=extractResults';
    var fromBitcoinApiScript = document.createElement('script');
    fromBitcoinApiScript.src = fromBitcoinApiUrl;
    document.body.appendChild(fromBitcoinApiScript);
    fromBitcoinApiScript.parentNode.removeChild(fromBitcoinApiScript);

//  Call again for CCY ==> BTC conversion 

    var toBitcoinApiUrl = BITCOIN_API_URL + ccy + '/btc/?callback=extractSecondResults';
    var toBitcoinApiScript = document.createElement('script');
    toBitcoinApiScript.src = toBitcoinApiUrl;
    document.body.appendChild(toBitcoinApiScript);
    toBitcoinApiScript.parentNode.removeChild(toBitcoinApiScript);

}


function renderResults() {     

  console.log("renderResults ran");

  let results = 
    '<div class="js-results-bitcoin">' +
    ' <p class="line1">' + 
    '   <div class="results label">Bitcoin</div>' + 
    '   <div class="results label center"></div>' + 
    '   <div class="results label" id="js-to-ccy-lbl">' + SELECTED_CURRENCY_NAME + '</div>' +
    ' </p>' +
    ' <p>' + 
    '   <div class="results data" id="js-from-bitcoin-amt">' + BITCOIN_SYMBOL + '&nbsp' + 
              FROM_BITCOIN_AMT + '</div>' +   
    '   <div class="results label center"> = </div>' +
    '   <div class="results data" id="js-to-ccy-amt">' + USD_SYMBOL + '&nbsp' + CSPA_CCY_VALUE + '</div>' +
    ' </p>' +
    '</div>' + 
    '<div class="js-results-ccy2">' +
    ' <p class="line2">' +
    '   <div class="results label" id="js-from-ccy-lbl">' + SELECTED_CURRENCY_NAME + '</div>' +
    '   <div class="results label center"></div>' +
    '   <div class="results label">Bitcoin</div>' + 
    ' </p>' +
    ' <p>' +
    '   <div class="results data" id="js-from-ccy-amt">' + USD_SYMBOL + '&nbsp' + FROM_CCY_AMT + '</div>' +
    '   <div class="results label center"> = </div>' + 
    '   <div class="results data" id="js-to-bitcoin-amt">' + BITCOIN_SYMBOL + '&nbsp' + 
            CSPA_BTC_VALUE + '</div>' + 
    ' </p>' + 
    '</div>' ; 

  $('.js-results').html(results);
}


function getDefaultCcy() {

  console.log("getDefaultCcy ran");

  SELECTED_CURRENCY = $('#currencies').val();
  SELECTED_CURRENCY_NAME = "US Dollar";
  SELECTED_CURRENCY_SYM = "&#36";
  getDataFromApi(SELECTED_CURRENCY);
}


function watchCcyChange() {

  $('#currencies').on('change', function(e) {
    console.log("watchCcyChange fired");
    SELECTED_CURRENCY = this.value;
    var ccyId = document.getElementById("currencies");
    SELECTED_CURRENCY_NAME = ccyId.options[ccyId.selectedIndex].text;
    SELECTED_CURRENCY_SYM = ccyId.options[ccyId.selectedIndex].getAttribute('data-ccy');

    getDataFromApi(SELECTED_CURRENCY);
  });
}

$(getDefaultCcy);
$(watchCcyChange);
