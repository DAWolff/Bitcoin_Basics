'use strict'

const BITCOIN_API_URL = 'https://api.coinhills.com/v1/cspa/'
const BITCOIN_SYMBOL = '&#3647'
const USD_SYMBOL = '&#036'
const CCY_DATA = [
  { currency: "usd",
    data: {
      symbol: "&#36",
      name: "US Dollar",
      image: "usa.jpg" }
  },
  { currency: "jpy",
    data: {
      symbol: "&#165",
      name: "Japanese Yen",
      image: "japan2.jpg" }
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
      image: "euro.jpg" }
  },
  { currency: "krw",
    data: {
      symbol: "&#8361",
      name: "Korean Won",
      image: "SKorea.jpg" }
  },
  { currency: "gbp",
    data: {
      symbol: "&#163",
      name: "British Pound",
      image: "bigBen.jpg" }
  },
  { currency: "rub",
    data: {
      symbol: "&#8381",
      name: "Russian Ruble",
      image: "russia.jpg" }
  },
  { currency: "aud",
    data: {
      symbol: "A&#36",
      name: "Australian Dollar",
      image: "australia.jpg" }
  },
  { currency: "pln",
    data: {
      symbol: "&#164",
      name: "Polish Zloty",
      image: "poland.jpg" }
  },
  { currency: "brl",
    data: {
      symbol: "R&#36",
      name: "Brazilian Real",
      image: "brasil.jpg" }
  },
  { currency: "idr",
    data: {
      symbol: "Rp",
      name: "Indonesian Rupiah",
      image: "indonesia.jpg" }
  },
  { currency: "cad",
    data: {
      symbol: "C&#36",
      name: "Canadian Dollar",
      image: "canada.jpg" }
  },
  { currency: "mxn",
    data: {
      symbol: "&#8369",
      name: "Mexican Peso",
      image: "mexico.jpg" }
  },
  { currency: "zar",
    data: {
      symbol: "R",
      name: "South African Rand",
      image: "sa.jpg" }
  },
  { currency: "thb",
    data: {
      symbol: "&#3647",
      name: "Thai Baht",
      image: "thailand.jpg" }
  },
  { currency: "ngn",
    data: {
      symbol: "&#8358",
      name: "Nigerian Naira",
      image: "nigeria.jpg" }
  },
  { currency: "myr",
    data: {
      symbol: "RM",
      name: "Malaysian Ringgit",
      image: "malaysia.jpg" }
  },
  { currency: "try",
    data: {
      symbol: "&#8378",
      name: "Turkish Lira",
      image: "turkey.jpg" }
  },
  { currency: "vef",
    data: {
      symbol: "Bs",
      name: "Venezuelan Bolivar",
      image: "venezuela2.jpg" }
  },
  { currency: "inr",
    data: {
      symbol: "&#8377",
      name: "Indian Rupee",
      image: "tajMahal.jpg" }
  },
  { currency: "uah",
    data: {
      symbol: "&#8372",
      name: "Ukranian Hryvnia",
      image: "ukraine.jpg" }
  },
  { currency: "sgd",
    data: {
      symbol: "S&#36",
      name: "Singapore Dollar",
      image: "singapore.jpg" }
  },
  { currency: "czk",
    data: {
      symbol: "&#164",
      name: "Czech Koruna",
      image: "czech.jpg" }
  },
  { currency: "pkr",
    data: {
      symbol: "Rs",
      name: "Pakistani Rupee",
      image: "pakistan.jpg" }
  },
  { currency: "hkd",
    data: {
      symbol: "HK&#36",
      name: "Hong Kong Dollar",
      image: "hongkong.jpg" }
  },
  { currency: "nzd",
    data: {
      symbol: "NZ&#36",
      name: "New Zeland Dollar",
      image: "newzeland.jpg" }
  },
  { currency: "ils",
    data: {
      symbol: "&#8362",
      name: "Israeli Shekel",
      image: "jerusalem.jpg" }
  },
  { currency: "cop",
    data: {
      symbol: "COL&#36",
      name: "Colombian Peso",
      image: "colombia.jpg" }
    },
  { currency: "sek",
    data: {
      symbol: "kr",
      name: "Swedish Krona",
      image: "sweden.jpg" }
  },
  { currency: "nok",
    data: {
      symbol: "kr",
      name: "Norwegian Krone",
      image: "norway.jpg" }
  },
  { currency: "kes",
    data: {
      symbol: "KSh",
      name: "Kenyan Shilling",
      image: "kenya.jpg" }
  },
  { currency: "ron",
    data: {
      symbol: "L",
      name: "Romanian Leu",
      image: "romania.jpg" }
  },
];


var SELECTED_CURRENCY = "";
var SELECTED_CURRENCY_NAME = "";
var SELECTED_CURRENCY_SYM = "";
var SELECTED_CURRENCY_IMAGE = "";
var CSPA_CCY_VALUE = 0;
var CSPA_CHANGE_24H = 0;
var CSPA_CHANGE_24H_PCT = 0;



function renderErrorResult (msg) {
  let results = `
           <p class="tab">Change since 1 day
              &nbsp &nbsp ${SELECTED_CURRENCY_SYM} 0
              &nbsp &nbsp 0.0% &nbsp &nbsp &nbsp OOPS!
           </p>
           <p class="tab">There's been a horrible mistake!  (seems our source of data is unavailable)</p>
           <p class="tab">Here is the error message: &nbsp ${msg}</p>
    `;

  $('.main-content').html(results);
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
  CSPA_CCY_VALUE = Math.round(CSPA_CCY_VALUE * 100) / 100;   // round to 2 decimals

  CSPA_CHANGE_24H = json.data[cspaKey].cspa_change_24h;
  CSPA_CHANGE_24H = Math.round(CSPA_CHANGE_24H * 100) / 100;

  CSPA_CHANGE_24H_PCT = json.data[cspaKey].cspa_change_24h_pct;

  console.log(SELECTED_CURRENCY + ": " + CSPA_CCY_VALUE);

  renderResults();
}


function getDataFromApi(ccy) {

    console.log("getDataFromApi ran");

    // dynamically create <script> element with call to API in 'src' attribute
    // add element to <body>, and then immediately remmove

    var bitcoinApiUrl = BITCOIN_API_URL + 'btc/' + ccy + '/?callback=extractResults';
    var bitcoinApiScript = document.createElement('script');

    try {
        bitcoinApiScript.src = bitcoinApiUrl;
        document.body.appendChild(bitcoinApiScript);
        bitcoinApiScript.parentNode.removeChild(bitcoinApiScript);
    }
    catch(err) {
        renderErrorResult(err.message);
    }
}


function renderResults() {

  console.log("renderResults ran");

  CSPA_CCY_VALUE = numberWithCommas(CSPA_CCY_VALUE);

  let headerAmt = `<div id="amount">${SELECTED_CURRENCY_SYM} &nbsp ${CSPA_CCY_VALUE}</div>`;
  $('#js-header-amt').html(headerAmt);

  let changeInfo = `
        <div class="change">Change since 1 day &nbsp &nbsp ${CSPA_CHANGE_24H}
               &nbsp &nbsp ${CSPA_CHANGE_24H_PCT}%</div>
    `;

  $('#js-main-content').html(changeInfo);
}


function getDefaultCcy() {

  SELECTED_CURRENCY = $('#currencies').val() || 'usd';

  let obj = CCY_DATA.find(o => o.currency === SELECTED_CURRENCY);
  SELECTED_CURRENCY_NAME = obj.data.name || "US Dollar";
  SELECTED_CURRENCY_SYM = obj.data.symbol || "&#36";
  SELECTED_CURRENCY_IMAGE = obj.data.image;

  // if we have an image for the selected currency, set that as the background

  if (SELECTED_CURRENCY_IMAGE) {
    let bgUrl = `url("images/${SELECTED_CURRENCY_IMAGE}")`;
    $('html').css('background-image', bgUrl);
    $('html').css('background-size', 'cover');
    $('html').css('background-repeat', 'no-repeat');
  }

  getDataFromApi(SELECTED_CURRENCY);

  console.log("getDefaultCcy ran");
}


function watchCcyChange() {

  $('#currencies').on('change', function(e) {
    console.log("watchCcyChange fired");
    SELECTED_CURRENCY = this.value;

    let obj = CCY_DATA.find(o => o.currency === SELECTED_CURRENCY);
    SELECTED_CURRENCY_NAME = obj.data.name || "Not found";
    SELECTED_CURRENCY_SYM = obj.data.symbol || "Not found";
    SELECTED_CURRENCY_IMAGE = obj.data.image || "bitcoin-fire.jpg";

    // if we have an image for the selected currency, set that as the background

    if (SELECTED_CURRENCY_IMAGE) {
      let bgUrl = `url("images/${SELECTED_CURRENCY_IMAGE}")`;
      $('html').css('background-image', bgUrl);
      $('html').css('background-size', 'cover');
      $('html').css('background-repeat', 'no-repeat');
    }

    getDataFromApi(SELECTED_CURRENCY);
  });
}


function numberWithCommas(n) {
    // format the exchange rate as a currency (with commas and 2 decimals)

    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function loadSelectOptions() {

  // load the dropdown currency codes and currency names from
  //  the CCY_DATA array, above

  var options = $("#currencies");
  $.each(CCY_DATA, function() {
    options.append(new Option(this.data.name, this.currency));
  });
}


$(loadSelectOptions);

window.addEventListener("error", (event) => {
    renderErrorResult (event);
});

$(getDefaultCcy);
$(watchCcyChange);
