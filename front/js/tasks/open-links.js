let googleOpen;
let phindOpen;
let youtubeOpen;
let gptOpen;
let linkedinOpen;
export default function openLinks(transcript, recognition) {
  function readOut(message) {
    const wordsToUser = document.getElementById("words-user");
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices();
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech);
  }

  const resetTranscript = function () {
    const wordsToUser = document.getElementById("words-user");

    transcript = "";
    recognition.stop();
    wordsToUser.textContent = "Je vous écoute...";
  };
  //============================= Ouvrir Google ==========================
  if (transcript.includes("ouvre google")) {
    if (googleOpen) {
      googleOpen.close();
    }
    googleOpen = window.open("http://google.com");
    resetTranscript();
  }
  if (transcript.includes("ferme google")) {
    if (googleOpen) {
      googleOpen.close();
    }
    resetTranscript();
  }

  //============================= Ouvrir Youtube ==========================
  if (transcript.includes("ouvre youtube")) {
    if (youtubeOpen) {
      youtubeOpen.close();
    }
    youtubeOpen = window.open("http://youtube.com");
    resetTranscript();
  }
  if (transcript.includes("ferme youtube")) {
    if (youtubeOpen) {
      youtubeOpen.close();
    }
    resetTranscript();
  }

  //============================= Ouvrir ChatGPT ==========================

  if (
    (transcript.includes("ouvre") && transcript.includes("gpt")) ||
    (transcript.includes("ouvre") && transcript.includes("j'ai pété"))
  ) {
    if (gptOpen) {
      gptOpen.close();
    }
    gptOpen = window.open("https://chat.openai.com/chat");
    resetTranscript();
  }
  if (
    (transcript.includes("ferme") && transcript.includes("gpt")) ||
    (transcript.includes("ferme") && transcript.includes("j'ai pété"))
  ) {
    if (gptOpen) {
      gptOpen.close();
    }
    resetTranscript();
  }

  //============================= Ouvrir LinkedIn ==========================

  if (transcript.includes("ouvre") && transcript.includes("linkedin")) {
    if (linkedinOpen) {
      linkedinOpen.close();
    }
    linkedinOpen = window.open("https://fr.linkedin.com/");
    resetTranscript();
  }
  if (transcript.includes("ferme") && transcript.includes("linkedin")) {
    if (linkedinOpen) {
      linkedinOpen.close();
    }
    resetTranscript();
  }

  //============================= Rechercher sur Google ==========================
  if (transcript.includes("cherche") && transcript.includes("sur google")) {
    transcript = transcript.replace("cherche", "");
    transcript = transcript.replace("sur google", "");
    let input = transcript.split("");
    input.pop();
    input = input.join("").split(" ").join("+");
    if (googleOpen) {
      googleOpen.close();
    }
    googleOpen = window.open(`https://www.google.com/search?q=${input}`);
    resetTranscript();
  }

    //============================= Rechercher sur Phind ==========================
    if (transcript.includes("cherche") && transcript.includes("sur find")) {
      transcript = transcript.replace("cherche", "");
      transcript = transcript.replace("sur find", "");
      let input = transcript.split("");
      input.pop();
      input = input.join("").split(" ").join("+");
      if (phindOpen) {
        phindOpen.close();
      }
      phindOpen = window.open(`https://www.phind.com/search?q=${input}&ignoreSearchResults=false`);
      resetTranscript();
    }


    if (transcript.includes("cherche") && transcript.includes("sur fine")) {
      transcript = transcript.replace("cherche", "");
      transcript = transcript.replace("sur fine", "");
      let input = transcript.split("");
      input.pop();
      input = input.join("").split(" ").join("+");
      if (phindOpen) {
        phindOpen.close();
      }
      phindOpen = window.open(`https://www.phind.com/search?q=${input}&ignoreSearchResults=false`);
      resetTranscript();
    }

  //============================= Rechercher sur Youtube ==========================
  if (transcript.includes("cherche") && transcript.includes("sur youtube")) {
    transcript = transcript.replace("cherche", "");
    transcript = transcript.replace("sur youtube", "");
    let input = transcript.split("");
    input.pop();
    input = input.join("").split(" ").join("+");
    if (youtubeOpen) {
      youtubeOpen.close();
    }
    youtubeOpen = window.open(
      `https://www.youtube.com/results?search_query=${input}`
    );
    resetTranscript();
  }
}
