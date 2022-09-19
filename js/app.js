import {radioList, playlistSong, albumList} from './links.js'
let openTab
let randomId
//============================= Query Selectors ==========================
const mic = document.querySelector("#mic")
const commandes  = document.querySelector('#commandes')
//============================= Speech Recognition ==========================
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition();
const assistName = "auto"
recognition.continuous = false;
recognition.lang = 'fr-FR';
//============================= addEventListener ==========================

mic.addEventListener("click", () => {
    if(mic.classList.contains("fa-microphone-lines") == true){
        mic.classList.replace('fa-microphone-lines', 'fa-microphone-lines-slash')
        mic.style.padding = '50px 43px'
        mic.style.background =  'rgb(226, 101, 84)'
        recognition.start()
    }
    else{
        mic.classList.replace('fa-microphone-lines-slash', 'fa-microphone-lines')
        mic.style.background =  'rgb(84, 226, 84)'
        mic.style.padding = '50px 60px'
        recognition.stop()
    }
    
    
    



})

//============================= Functions ==========================
recognition.onstart = function () {

}
function readOut(message){
    const speech = new SpeechSynthesisUtterance();
    const allVoices = speechSynthesis.getVoices()
    speech.text = message
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
        readOut("voici les résultats")
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
        readOut("voici les résultats")
    }
    //============================= Radio ==========================
    if(transcript.includes("radio") && transcript.includes("mets") || transcript.includes("radio") && transcript.includes("mais")){
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
    if(transcript.includes("playlist") && transcript.includes("mets") || transcript.includes("playlist") && transcript.includes("mais")){
        randomId = Math.floor(Math.random()*playlistSong.length)
        openTab = window.open(playlistSong[randomId]);
        transcript = ""
        readOut("voici une playlist au hasard")
    }
    if(transcript.includes("playlist") && transcript.includes("joue ma")){
        randomId = Math.floor(Math.random()*playlistSong.length)
        openTab = window.open('https://www.youtube.com/watch?v=Vcwhe0pY4Bg&list=PLyUNBmcVi2rny26qxF5aNQzm6OKj_Ki6W&index=1');
        transcript = ""
        readOut("voici votre playlist")
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
    if(transcript.includes("album") && transcript.includes("mets") || transcript.includes("album") && transcript.includes("mais")){
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
        // readOut(`le bitcoin est actuellement a ${btcprice}`)
        readOut(`le bitcoin est actuellement a 22843`)
        transcript = ""
    }
    if(transcript.includes("jouer") && transcript.includes("batterie")){
        readOut("Je connais quelques rythmes de batterie.")
        window.open("./drumkit.html","_self")
        transcript = ""
    }
}
recognition.onend = function () {
    mic.classList.replace('fa-microphone-lines-slash', 'fa-microphone-lines')
    mic.style.background =  'rgb(84, 226, 84)'
    mic.style.padding = '50px 60px'
    recognition.stop()
 
}