import {radioList, playlistSong, albumList} from './links.js'
let openTab
let randomId
//============================= Query Selectors ==========================
const btnOnSelector = document.querySelector("#on")
const btnOffSelector = document.querySelector("#off")
const HelpShowSelector = document.querySelector('#help-show')
const helpDesignSelector = document.querySelector('#help-design')
//============================= Speech Recognition ==========================
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition();
const assistName = "auto"
recognition.continuous = false;
recognition.lang = 'fr-FR';
//============================= addEventListener ==========================
btnOffSelector.style.display = "none"
btnOnSelector.addEventListener("click", () => {
    recognition.start()
    btnOffSelector.style.display = "block"
    btnOnSelector.style.display = "none"
})
btnOffSelector.addEventListener("click", () => {
    recognition.stop()
    btnOnSelector.style.display = "block"
    btnOffSelector.style.display = "none"
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
    console.log(transcript);
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
        randomId = Math.floor(Math.random()*radioList.length)
        openTab = window.open(radioList[randomId]);
        transcript = ""
        readOut("voici une radio au hasard")
    }
    if(transcript.includes("change")  && transcript.includes("radio")){
        let newRandomId = Math.floor(Math.random()*radioList.length)
        if(randomId === newRandomId){
            if(newRandomId === 0){
            }
            else{
            newRandomId--
            }
        }
        openTab.close()
        openTab = window.open(radioList[newRandomId]);
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
        randomId = Math.floor(Math.random()*playlistSong.length)
        openTab = window.open(playlistSong[randomId]);
        transcript = ""
        readOut("voici une playlist au hasard")
    }
    if(transcript.includes("change")  && transcript.includes("playlist")){
        let newRandomId = Math.floor(Math.random()*playlistSong.length)
        if(randomId === newRandomId ){
            if(newRandomId === 0){
            }
            else{
                newRandomId--
            }
        }
        openTab.close()
        openTab = window.open(playlistSong[newRandomId]);
        transcript = ""
        readOut("c'est fait")
    }
    if(transcript.includes("coupe")  && transcript.includes("playlist")){
        openTab.close()
        transcript = ""
        readOut("c'est fait")
    }
    //============================= Albums ==========================
    
    if(transcript.includes("album") && transcript.includes("mets")){
        randomId = Math.floor(Math.random()*albumList.length)
        openTab = window.open(albumList[randomId]);
        transcript = ""
        readOut("voici un album au hasard")
    }
    if(transcript.includes("change")  && transcript.includes("album")){
        let newRandomId = Math.floor(Math.random()*albumList.length)
        if(randomId === newRandomId ){
            if(newRandomId === 0){
            }
            else{
                newRandomId--
            }
        }
        openTab.close()
        openTab = window.open(albumList[newRandomId]);
        transcript = ""
        readOut("c'est fait")
    }
    if(transcript.includes("coupe")  && transcript.includes("album")){
        openTab.close()
        transcript = ""
        readOut("c'est fait")
    }
    //============================= Crypto ==========================
    if(transcript.includes("prix") && transcript.includes("bitcoin")){
        readOut("le bitcoin est actuellement a 47159")
        transcript = ""
    }
    if(transcript != ""){
        readOut("Je n'ai pas compris")
    }
























}

recognition.onend = function () {
    console.log(`${assistName} : off`);
    btnOnSelector.style.display = "block"
    btnOffSelector.style.display = "none"
    recognition.stop()
}