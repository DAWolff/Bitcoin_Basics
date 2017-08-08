'use strict'

const BITCOIN_API_URL = 'https://api.coinhills.com/v1/cspa/btc/'   
var SELECTED_CURRENCY = "";  // cspa/btc/usd/'
var SELECTED_CURRENCY_NAME = "";
var SELECTED_CURRENCY_SYM = "";
var CSPA_VALUE_CCY = 0;
var CSPA_CHANGE_24H = 0;
var CSPA_CHANGE_24H_PCT = 0;
var CSPA_VALUE_BTC = 0;
var FA_LOGO_CLASS = "";



function extractResults(json) {
      // "cspa": 2701.4111675,
      // "cspa_change_24h": -40.35186543,
      // "cspa_change_24h_pct": -1.47,
      // "volume_btc_24h": 93497.33,
      // "volume_usd_24h": 252574730.2,
      // "updated": 1501701529
  let cspaKey = "CSPA:BTC/" + SELECTED_CURRENCY.toUpperCase(); 
  // CSPA_VALUE_CCY = json.data["CSPA:BTC/USD"].cspa;
  CSPA_VALUE_CCY = json.data[cspaKey].cspa;
  CSPA_CHANGE_24H = json.data[cspaKey].cspa_change_24h;
  CSPA_CHANGE_24H_PCT = json.data[cspaKey].cspa_change_24h_pct;

  CSPA_VALUE_BTC = 1/CSPA_VALUE_CCY; 

  console.log(CSPA_VALUE_CCY);
}


function getDataFromApi(ccy) {
    var bitcoinApi = BITCOIN_API_URL + ccy + '/?callback=extractResults';
    var script = document.createElement('script');
    script.src = bitcoinApi;
    document.body.appendChild(script);
    script.parentNode.removeChild(script);
}


function renderResult(result) {     
  return `
      <div class="thumbnail tooltip">
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
          <img src="${result.snippet.thumbnails.medium.url}" alt="thumbnail from youtube">
        </a>
        <span class="tooltiptext">${result.snippet.title}</span></div>
  `;
}

function getDefaultCcy() {

  SELECTED_CURRENCY = $('#currencies').val();
  SELECTED_CURRENCY_NAME = "US Dollar";
  SELECTED_CURRENCY_SYM = "$";
  getDataFromApi(SELECTED_CURRENCY);

  FA_LOGO_CLASS = "fa-" + SELECTED_CURRENCY; 

  $('#ccyLogo').addClass(FA_LOGO_CLASS);

    console.log('default ' + FA_LOGO_CLASS);
}


function watchCcyChange() {

  $('#currencies').on('change', function(e) {
    SELECTED_CURRENCY = this.value;
    var ccyId = document.getElementById("currencies");
    SELECTED_CURRENCY_NAME = ccyId.options[ccyId.selectedIndex].text;
    SELECTED_CURRENCY_SYM = ccyId.options[ccyId.selectedIndex].getAttribute('data-ccy');

    getDataFromApi(SELECTED_CURRENCY);

    $('#ccyLogo').removeClass(FA_LOGO_CLASS);

    FA_LOGO_CLASS = "fa-" + SELECTED_CURRENCY; 

    $('#ccyLogo').addClass(FA_LOGO_CLASS);
  });
}

$(getDefaultCcy);
$(watchCcyChange);
