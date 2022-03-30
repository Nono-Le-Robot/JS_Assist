import {radioList, playlistSong} from './links.js'
let fenetreOuverte;
function ouvrirFenetreMusique()
{
  fenetreOuverte = window.open(playlistSong[Math.floor(Math.random()*playlistSong.length)]);
}
function fermerFenetreOuverteMusique()
{
  fenetreOuverte.close();
}
function ouvrirFenetreRadio()
{
  fenetreOuverte = window.open(radioList[Math.floor(Math.random()*radioList.length)]);
}
function fermerFenetreOuverteRadio()
{
  fenetreOuverte.close();
}
export {ouvrirFenetreMusique, fermerFenetreOuverteMusique, ouvrirFenetreRadio, fermerFenetreOuverteRadio}