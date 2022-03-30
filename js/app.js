//============================= Imports ==========================
import {ouvrirFenetreMusique, fermerFenetreOuverteMusique, ouvrirFenetreRadio, fermerFenetreOuverteRadio} from './functions.js'
//============================= Query Selectors ==========================
const micDesignSelector = document.querySelector("#mic-design")
const HelpShowSelector = document.querySelector('#help-show')
const helpDesignSelector = document.querySelector('#help-design')
//============================= Speech Recognition ==========================
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = new SpeechRecognition();
let vocalReturn = new SpeechSynthesisUtterance();
const assistName = "auto"
recognition.continuous = false;
recognition.lang = 'fr-FR';
recognition.interimResults = true;
vocalReturn.pitch = 1;
let texte = ""
let running = 0;
//============================= Add Event Listeners ==========================

helpDesignSelector.addEventListener ("click", ()=>{

    HelpShowSelector.classList.toggle('help-in');


})

micDesignSelector.addEventListener ("click",() => {
        if(running === 0 ){
        recognition.start();
        running = 1
        micDesignSelector.classList.add('anim-mic');

    }
    

})

recognition.addEventListener('result', (userSpeech) => {
    let text = ""
    let i = 0;
    while(i < userSpeech.results.length){
        text += userSpeech.results[i][0].transcript
        i++
        texte = text.toLowerCase();
        console.log(texte);
    }
})
recognition.addEventListener ('end', ()=>{
    //============================= Crypto ==========================
    if(texte.includes(assistName) && texte.includes("bitcoin")){
        let response = "prix BTC : 44200"
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    //============================= Playlist ==========================
    else if(texte.includes(assistName) && texte.includes("playlist") && texte.includes("mets")){
        let response = "Je mets une playlist"
        ouvrirFenetreMusique()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    else if(texte.includes(assistName) && texte.includes("playlist") && texte.includes("change")){
        let response = "Je change de playlist"
        fermerFenetreOuverteMusique()
        ouvrirFenetreMusique()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    else if(texte.includes(assistName) && texte.includes("coupe")  && texte.includes("playlist")){
        let response = "Je stop la playlist"
        fermerFenetreOuverteMusique()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    //============================= Radio ==========================
    else if(texte.includes(assistName) && texte.includes("radio") && texte.includes("mets")){
        let response = "Je mets une radio"
        ouvrirFenetreRadio()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    else if(texte.includes(assistName) && texte.includes("radio") && texte.includes("change")){
        let response = "Je change de radio"
        fermerFenetreOuverteRadio()
        ouvrirFenetreRadio()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
    else if(texte.includes(assistName) && texte.includes("coupe")  && texte.includes("radio")){
        let response = "Je stop la radio"
        fermerFenetreOuverteRadio()
        vocalReturn.text = response
        speechSynthesis.speak(vocalReturn)
        texte = ""
    }
//============================= Relance de l'écoute ==========================
    recognition.start();
}); 