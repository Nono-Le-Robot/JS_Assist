import {radioList, playlistSong} from './links.js'
let openTab
//============================= Query Selectors ==========================
const btnOnSelector = document.querySelector("#on")
const btnOffSelector = document.querySelector("#off")
const HelpShowSelector = document.querySelector('#help-show')
const helpDesignSelector = document.querySelector('#help-design')
//============================= Speech Recognition ==========================
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition();
const assistName = "auto"
recognition.continuous = true;
recognition.lang = 'fr-FR';
//============================= addEventListener ==========================
btnOnSelector.addEventListener("click", () => {
    recognition.start()
})
btnOffSelector.addEventListener("click", () => {
    recognition.stop()
})
helpDesignSelector.addEventListener ("click", ()=>{
    if(HelpShowSelector.classList.contains("help-in") == true){
        HelpShowSelector.classList.remove('help-in');
        HelpShowSelector.classList.add('help-out');
    }
    else{
        HelpShowSelector.classList.add('help-in');
        HelpShowSelector.classList.remove('help-out');
    }
})
//============================= Functions ==========================
recognition.onstart = function () {
    console.log(`${assistName} : on`);
}
recognition.onend = function () {
    console.log(`${assistName} : off`);
}
function readOut(message){
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices()
    speech.text = message
    speech.voice = allVoices[36]
    speech.volume = 0.5
    window.speechSynthesis.speak(speech)
}

recognition.onresult = function (event){
    let current = event.resultIndex
    let transcript = event.results[current][0].transcript
    transcript = transcript.toLowerCase(); 
    //============================= Ouvrir Google ==========================
    if(transcript.includes("ouvre google")  ){
        console.log(transcript)
        window.open("http://google.com")
        transcript = ""         
        readOut("j'ouvre google")
        
    }
    //============================= Rechercher sur Google ==========================
    if(transcript.includes("cherche") && transcript.includes("sur google")){
        transcript = transcript.replace("cherche","");
        transcript = transcript.replace("sur google","");
        let input = transcript.split("")
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.google.com/search?q=${input}`)
        transcript = ""  
        readOut("voici les resultats")
    }
    //============================= Ouvrir Youtube ==========================
    if(transcript.includes("ouvre youtube")){
        readOut("j'ouvre youtube")
        console.log(transcript)
        window.open("http://youtube.com")
        transcript = ""         
        readOut("j'ouvre Youtube")
    }
    //============================= Rechercher sur Youtube ==========================
    if(transcript.includes("cherche") && transcript.includes("sur youtube")){
        transcript = transcript.replace("cherche","");
        transcript = transcript.replace("sur youtube","");
        let input = transcript.split("")
        input.pop();
        input = input.join("").split(" ").join("+");
        window.open(`https://www.youtube.com/results?search_query=${input}`)
        transcript = ""  
        readOut("voici les resultats")
    }
    //============================= Radio ==========================
    if(transcript.includes("radio") && transcript.includes("mets")){
        openTab = window.open(radioList[Math.floor(Math.random()*radioList.length)]);
        transcript = ""
        readOut("je mets une radio")
    }
    if(transcript.includes("change")  && transcript.includes("radio")){
        openTab.close()
        openTab = window.open(radioList[Math.floor(Math.random()*radioList.length)]);
        transcript = ""
        readOut("c'est fait")
    }
    if(transcript.includes("coupe")  && transcript.includes("radio")){
        openTab.close()
        transcript = ""
        readOut("c'est fait")
    }
    //============================= Playlist ==========================
    if(transcript.includes("playlist") && transcript.includes("mets")){
        openTab = window.open(playlistSong[Math.floor(Math.random()*playlistSong.length)]);
        transcript = ""
        readOut("je mets une playlist")
    }
    if(transcript.includes("change")  && transcript.includes("playlist")){
        openTab.close()
        openTab = window.open(playlistSong[Math.floor(Math.random()*playlistSong.length)]);
        transcript = ""
        readOut("c'est fait")
    }
    if(transcript.includes("coupe")  && transcript.includes("playlist")){
        openTab.close()
        transcript = ""
        readOut("c'est fait")
    }

    //============================= Crypto ==========================
    if(transcript.includes("prix") && transcript.includes("bitcoin")){
        readOut("le bitcoin est actuellement a 47159")
        transcript = ""
    }
























}
