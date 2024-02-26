let openTab;
let executed = false;
let coins;
const wordsToUser = document.getElementById("words-user");

function readOut(message) {
  const speech = new SpeechSynthesisUtterance();
  const allVoices = speechSynthesis.getVoices();
  speech.text = message;
  speech.volume = 1;
  window.speechSynthesis.speak(speech);
}
var baseUrl = "https://api.coinranking.com/v2/coins";
var apiKey = "coinranking889d2619e81bbd5740df0b0c4eead9cae0b8cf66bfa0a914";
let dataCrypto;
async function getDataCrypto() {
  const response = await fetch(`${baseUrl}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${apiKey}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.ok) {
    dataCrypto = await response.json();
    coins = await dataCrypto.data.coins;
  }
}
await getDataCrypto();

export default function crypto(transcript, recognition, isFinal) {
  const resetTranscript = function () {
    recognition.stop();
    transcript = "";
    executed = true;
  };
  //============================= Crypto ==========================
  if (
    (transcript.includes("donne") &&
      transcript.includes("prix") &&
      transcript.includes("crypto")) ||
    (transcript.includes("quel") &&
      transcript.includes("prix") &&
      transcript.includes("crypto"))
  ) {
    for (let j = 0; j < coins.length; j++) {
      let coinSymbol = coins[j].symbol.toLowerCase();
      let coinPrice = coins[j].price;
      if (transcript.includes(coinSymbol)) {
        if (isFinal) {
          const normalPrice = parseFloat(coinPrice).toFixed(2);
          const lowPrice = parseFloat(coinPrice).toFixed(10);
          const highPrice = parseInt(coinPrice);
          if (coinPrice < 0.001) {
            readOut(`le ${coinSymbol} est actuellement à ${lowPrice} $`);
            resetTranscript();
          } else if (coinPrice > 999) {
            readOut(`le ${coinSymbol} est actuellement à ${highPrice} $`);
            resetTranscript();
          } else {
            readOut(`le ${coinSymbol} est actuellement à ${normalPrice} $`);
            resetTranscript();
          }
        }
      }
    }
  }

  if (
    (transcript.includes("ouvre") && transcript.includes("charte")) ||
    (transcript.includes("ouvre") && transcript.includes("carte")) ||
    (transcript.includes("affiche") && transcript.includes("charte")) ||
    (transcript.includes("affiche") && transcript.includes("carte"))
  ) {
    if (!executed) {
      if (transcript.includes("btc")) {
        if (openTab) {
          openTab.close();
        }
        openTab = window.open(
          "https://fr.tradingview.com/chart/bnvnSQPM/?symbol=BITSTAMP%3ABTCUSD"
        );
        resetTranscript();
        wordsToUser.textContent = `Je vous écoute...`;
      }

      if (transcript.includes("eth")) {
        if (openTab) {
          openTab.close();
        }
        openTab = window.open(
          "https://fr.tradingview.com/chart/bnvnSQPM/?symbol=BITSTAMP%3AETHUSD",
          "_blank"
        );
        resetTranscript();
      }
    }
  } else {
    executed = false;
  }
  if (
    (transcript.includes("ferme") && transcript.includes("charte")) ||
    (transcript.includes("coupe") && transcript.includes("charte"))
  ) {
    if (openTab) {
      openTab.close();
      resetTranscript();
    }
  }
}
