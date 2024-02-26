import crypto from "./tasks/crypto.js";
import openLinks from "./tasks/open-links.js";
import getMusic from "./tasks/getMusic.js";
import createMusic from "./tasks/createMusic.js";
import basic from "./tasks/basic.js";
const wordsToUser = document.getElementById("words-user");
//============================= Speech Recognition ==========================
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
const assistName = "auto";
recognition.continuous = false;
recognition.lang = "fr-FR";
recognition.interimResults = true;

//============================= Functions ==========================
recognition.onresult = function (event) {
  // let current = event.resultIndex;
  // let transcript = event.results[current][0].transcript;
  let transcript = Array.from(event.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  let isFinal = false;
  if (event.results[0].isFinal) {
    isFinal = true;
  }

  transcript = transcript.toLowerCase();

  wordsToUser.textContent = transcript;
  openLinks(transcript, recognition, isFinal);
  getMusic(transcript, recognition, isFinal);
  crypto(transcript, recognition, isFinal);
  basic(transcript, recognition, isFinal);
  createMusic(transcript, recognition);
  transcript = "";
};

recognition.onend = function () {
  setTimeout(() => {
    wordsToUser.textContent = "Je vous écoute...";
  }, 2000);
  recognition.start();
};
recognition.start();
