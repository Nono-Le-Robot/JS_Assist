let executed = false;
export default function basic(transcript, recognition) {
  function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }

  const resetTranscript = function () {
    transcript = "";
    recognition.stop();
    executed = true;
  };

  if (
    transcript.includes("quelle") &&
    transcript.includes("heure") &&
    transcript.includes("il")
  ) {
    if (!executed) {
      var now = new Date();
      var annee = now.getFullYear();
      var mois = now.getMonth() + 1;
      var jour = now.getDate();
      var heure = now.getHours();
      var minute = now.getMinutes();
      var seconde = now.getSeconds();
      readOut(`il est ${heure} heure ${minute}`);
      resetTranscript();
    }
  } else {
    executed = false;
  }
}
