let hasExecuted = false;
export default function createMusic(transcript, recognition) {
  function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }
  //============================= Drums ==========================

  if (
    transcript.includes("joue") &&
    transcript.includes("batterie") &&
    !hasExecuted
  ) {
    readOut("Je connais quelques rythmes de batterie.");
    hasExecuted = true;
    transcript = "";
    recognition.stop();
  } else if (!transcript.includes("joue") && !transcript.includes("batterie")) {
    hasExecuted = false;
    transcript = "";
  }
}
