'use strict'

const BITCOIN_API_URL = 'https://api.coinhills.com/v1/cspa/'   
const BITCOIN_SYMBOL = '&#3647'
const USD_SYMBOL = '&#036'
const CCY_DATA = [
  { currency: "usd", 
    data: {
      symbol: "&#36",
      name: "US Dollar",
      image: "bitcoin.jpg" }
  },
  { currency: "jpy", 
    data: {
      symbol: "&#165",
      name: "Japanese Yen",
      image: "japan.jpg" }
  },
  { currency: "cny",
    data: {
      symbol: "&#165",
      name: "Chinese Yuan",
      image: "china.jpg" }
  },
  { currency: "eur", 
    data: {
      symbol: "&#8364",
      name: "European Euro",
      image: " " }
  },
  { currency: "krw",
    data: {   
      symbol: "&#8361",
      name: "Korean Won",
      image: "" } 
  },  
  { currency: "gbp",  
    data: {   
      symbol: "&#163",
      name: "British Pound",   
      image: "url(images/bigBen.jpg" }  
  },
  { currency: "rub",  
    data: {   
      symbol: "py6",  
      name: "Russian Ruble",   
      image: "" }  
  }, 
  { currency: "aud",  
    data: {   
      symbol: "A&#36",  
      name: "Australian Dollar",   
      image: "" } 
  },
  { currency: "pln",  
    data: {   
      symbol: "&#164",  
      name: "Polish Zloty",   
      image: "" }
  },  
  { currency: "brl",  
    data: {   
      symbol: "R&#36",  
      name: "Brazilian Real",   
      image: "" }  
  },
  { currency: "idr",  
    data: {   
      symbol: "Rp",  
      name: "Indonesian Rupiah",   
      image: "" }
  }, 
  { currency: "cad",  
    data: {   
      symbol: "C&#36",  
      name: "Canadian Dollar",   
      image: "" }  
  }, 
  { currency: "mxn",  
    data: {   
      symbol: "&#8369",  
      name: "Mexican Peso",   
      image: "" }  
  },  
  { currency: "zar",  
    data: {   
      symbol: "R",  
      name: "South African Rand",  
      image: "" }  
  },  
  { currency: "thb",  
    data: {   
      symbol: "&#3647",  
      name: "Thai Baht",   
      image: "" }  
  }, 
  { currency: "ngn",  
    data: {   
      symbol: "&#8358",  
      name: "Nigerian Naira",   
      image: "" }
  },  
  { currency: "myr",  
    data: {   
      symbol: "RM",  
      name: "Malaysian Ringgit",  
      image: "" }  
  }, 
  { currency: "try",  
    data: {   
      symbol: "TL",  
      name: "Turkish Lira",   
      image: "" }  
  },
  { currency: "vef",  
    data: {   
      symbol: "Bs",  
      name: "Venezuelan Bolivar",  
      image: "" }  
  },
  { currency: "inr",  
    data: {   
      symbol: "&#8377",  
      name: "Indian Rupee",   
      image: "" }  
  },
  { currency: "uah",  
    data: {   
      symbol: "&#8372",  
      name: "Ukranian Hryvnia",   
      image: "" }  
  }, 
  { currency: "sgd",  
    data: {   
      symbol: "S&#36",  
      name: "Singapore Dollar",   
      image: "" }  
  }, 
  { currency: "czk",  
    data: {   
      symbol: "&#164",  
      name: "Czech Koruna",   
      image: "" }  
  },
  { currency: "pkr",  
    data: {   
      symbol: "RS",  
      name: "Pakistani Rupee",   
      image: "" }  
  },  
  { currency: "hkd",  
    data: {   
      symbol: "HK&#36",  
      name: "Hong Kong Dollar",   
      image: "" }  
  },
  { currency: "nzd",  
    data: {   
      symbol: "NZ&#36",  
      name: "New Zeland Dollar",   
      image: "" }  
  }, 
  { currency: "ils",  
    data: {   
      symbol: "&#8362",  
      name: "Israeli Shekel",   
      image: "" }  
  }, 
  { currency: "cop",  
    data: {   
      symbol: "COL&#36",  
      name: "Colombian Peso",   
      image: "" }  
    },  
  { currency: "sek",  
    data: {   
      symbol: "kr",  
      name: "Swedish Krona",   
      image: "" }  
  },  
  { currency: "nok",  
    data: {   
      symbol: "kr",  
      name: "Norwegian Krone",   
      image: "" }  
  }, 
  { currency: "kes",  
    data: {   
      symbol: "KSh",  
      name: "Kenyan Shilling",   
      image: "" }  
  },  
  { currency: "ron",  
    data: {   
      symbol: "L",  
      name: "Romanian Leu",   
      image: "" }  
  },  
];


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

  let results = `
    <div class="js-results-bitcoin"> 
     <p class="line1">  
       <div class="results label">Bitcoin</div>  
       <div class="results label center"></div>  
       <div class="results label" id="js-to-ccy-lbl">${SELECTED_CURRENCY_NAME}</div> 
     </p> 
     <p>  
       <div class="results data" id="js-from-bitcoin-amt">${BITCOIN_SYMBOL} &nbsp  
                ${FROM_BITCOIN_AMT}  </div>    
       <div class="results label center"> = </div> 
         <div class="results data" id="js-to-ccy-amt">${SELECTED_CURRENCY_SYM} &nbsp ${CSPA_CCY_VALUE} </div> 
     </p>   
     <p>  
       <div class="results data">One day change in value</div>  
       <div class="results data">&nbsp ${CSPA_CHANGE_24H}</div> 
     </p> 
     <p>  
       <div class="results data">Percentage change</div>  
       <div class="results data">&nbsp ${CSPA_CHANGE_24H_PCT}</div> 
     </p> 
    </div>  

    `; 
    // <div class="js-results-ccy2">     //  CSPA_CHANGE_24H_PCT
    //  <p class="line2"> 
    //    <div class="results label" id="js-from-ccy-lbl">${SELECTED_CURRENCY_NAME} </div> 
    //    <div class="results label center"></div> 
    //    <div class="results label">Bitcoin</div>  
    //  </p> 
    //  <p> 
    //    <div class="results data" id="js-from-ccy-amt">${USD_SYMBOL} &nbsp ${FROM_CCY_AMT} </div> 
    //    <div class="results label center"> = </div>  
    //    <div class="results data" id="js-to-bitcoin-amt">${BITCOIN_SYMBOL} &nbsp ${CSPA_BTC_VALUE} </div>  
    //  </p>  
    // </div> 


  $('.js-results').html(results);
}


function getDefaultCcy() {

  console.log("getDefaultCcy ran");

  SELECTED_CURRENCY = $('#currencies').val();
  // SELECTED_CURRENCY_NAME = "US Dollar";
  // SELECTED_CURRENCY_SYM = "&#36";

  let obj = CCY_DATA.find(o => o.currency === SELECTED_CURRENCY);
  SELECTED_CURRENCY_NAME = obj.data.name; //  || "US Dollar";
  SELECTED_CURRENCY_SYM = obj.data.symbol; //  || "&#36";


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
