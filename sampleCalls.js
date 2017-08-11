// var FA_LOGO_CLASS = "";


//       ERROR MESSAGE 
// 20170810115519
// https://api.coinhills.com/v1/cspa/usd/jpy/
{
  "success": false,
  "message": "No results found. The specified market pair or the code does not exist.",
  "code": null,
  "elapsed": 0.2214,
  "data": null
}

// 20170810115324
// https://api.coinhills.com/v1/cspa/usd/btc/
{
  "success": true,
  "message": null,
  "code": null,
  "elapsed": 0.1195,
  "data": {
    "CSPA:USD/BTC": {
      "cspa": 0.00038461,
      "cspa_change_24h": 0,
      "cspa_change_24h_pct": 0,
      "volume_usd_24h": 0,
      "volume_btc_24h": 0,
      "updated": 1502380381
    }
  }
}

// 20170810115429
// https://api.coinhills.com/v1/cspa/btc/usd/
{
  "success": true,
  "message": null,
  "code": null,
  "elapsed": 0.1172,
  "data": {
    "CSPA:BTC/USD": {
      "cspa": 3442.07910075,
      "cspa_change_24h": 148.10467576,
      "cspa_change_24h_pct": 4.5,
      "volume_btc_24h": 66637.97,
      "volume_usd_24h": 229373170.3,
      "updated": 1502380455
    }
  }
}





function renderResults() {     
  let results = 
    '<div class="js-results-bitcoin">' +
    ' <p class="line1">' + 
    '   <div class="results label">Bitcoin</div>' + 
    '   <div class="results label center"> to </div>' + 
    '   <div class="results label" id="js-to-ccy-lbl">' + SELECTED_CURRENCY_NAME + '</div>' +
    ' </p>' +
    ' <p>' + 
    '   <div class="results data" id="js-from-bitcoin-amt">' + BITCOIN_SYMBOL + '&nbsp' + FROM_BITCOIN_AMT + '</div>' +   
    '   <div class="results label center"> = </div>' +
    '   <div class="results data" id="js-to-ccy-amt">' + USD_SYMBOL + '&nbsp' + CSPA_CCY_VALUE + '</div>' +
    ' </p>' +
    '</div>' + 
    '<div class="js-results-ccy2">' +
    ' <p class="line2">' +
    '   <div class="results label" id="js-from-ccy-lbl">' + SELECTED_CURRENCY_NAME + '</div>' +
    '   <div class="results label center"> to </div>' +
    '   <div class="results label">Bitcoin</div>' + 
    ' </p>' +
    ' <p>' +
    '   <div class="results data" id="js-from-ccy-amt">' + USD_SYMBOL + '&nbsp' + FROM_CCY_AMT + '</div>' +
    '   <div class="results label center"> = </div>' + 
    '   <div class="results data" id="js-to-bitcoin-amt">' + BITCOIN_SYMBOL + '&nbsp' + CSPA_BTC_VALUE + '</div>' + 
    ' </p>' + 
    '</div>' ; 

  $('.js-results').html(results);
}


// FA_LOGO_CLASS = "fa-" + SELECTED_CURRENCY;
// $('#ccyLogo').addClass(FA_LOGO_CLASS);
//   console.log('default ' + FA_LOGO_CLASS);
    // $('#ccyLogo').removeClass(FA_LOGO_CLASS);
    // FA_LOGO_CLASS = "fa-" + SELECTED_CURRENCY; 
    // $('#ccyLogo').addClass(FA_LOGO_CLASS);

//        FIELD MAPPING  
// "js-to-ccy-lbl"                              SELECTED_CURRENCY_NAME 
// "js-from-ccy-lbl"                            SELECTED_CURRENCY_NAME
// "js-from-bitcoin-amt">&#3647 1</div>         FROM_BITCOIN_AMT 
// "js-to-ccy-amt"                              CSPA_CCY_VALUE          
// "js-from-ccy-amt">&#36 1.00</div>            FROM_CCY_AMT
// "js-to-bitcoin-amt">&#3647 0.00038461</div>  CSPA_BTC_VALUE 