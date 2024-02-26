let openTab;
let radioLists = {
  standard: ["https://www.youtube.com/watch?v=tGZIL9Crou4",
  "https://www.youtube.com/watch?v=TwsIHVkH0NQ",
  "https://www.youtube.com/watch?v=M5QY2_8704o",
  "https://www.youtube.com/watch?v=61M83bcHMNc",
  "https://www.youtube.com/watch?v=APFMvzH1WEE",
  "https://www.youtube.com/watch?v=UPnMFUsKm8w&list=PLnQUNM-n9wu4zpp8rYcchKH5Qa31gp0wE",
  "https://www.youtube.com/watch?v=RLYj5rbw8Qk",
  "https://www.youtube.com/watch?v=rlN4j7_TRl8&list=PLh42DcxGHDSje7M9n8isGi5t1mCh-e1lX",
  "https://www.youtube.com/watch?v=h7qTI6Njp9g&list=PLh42DcxGHDSi-UNLtn3udZ8pyOBul_Dk1",
  "https://www.youtube.com/watch?v=_q6go0G49A0&list=PL7zsB-C3aNu3ppvsaPXX9ex3qbj-Dqzos",
  "https://www.youtube.com/watch?v=6vYnas6q3Sg&list=PLR32_mgDMQKaXC9xPzz4qH2uWm6a1NNOs",
  "https://www.youtube.com/watch?v=sUYE1RtKl-s&list=PLkqz3S84Tw-SIwPfYMPEZqvv0lqSRM7PK",
  "https://www.youtube.com/watch?v=syNDdIfKbkw&list=PL3oW2tjiIxvQO6yqJEkrP47yYG_pJ7XJU",
  "https://youtube.com/playlist?list=PLyUNBmcVi2rny26qxF5aNQzm6OKj_Ki6W",],
  metal: [ "https://www.youtube.com/watch?v=Pdl05MLmOLY",
  "https://www.youtube.com/watch?v=bBnrbzbcobg",
  "https://www.youtube.com/watch?v=OzzBrw3gqHk",
  "https://www.youtube.com/watch?v=24L_wNG8rFg",
  "https://www.youtube.com/watch?v=JEuAYnjtJP0",
  "https://www.youtube.com/watch?v=5X18D-EbjUc",
  "https://www.youtube.com/watch?v=7sTlQiBtB1A",
  "https://www.youtube.com/watch?v=LVFELw1csyI",
  "https://www.youtube.com/watch?v=Va-h6WZPUzQ",
  "https://www.youtube.com/watch?v=DHjyS70Q9jU",
  "https://www.youtube.com/watch?v=3Bu0YAUI4is",],
  work: [    "https://www.youtube.com/watch?v=kxbGIMVKacg&ab_channel=ChillMusicLab",
  "https://www.youtube.com/watch?v=8YA825ZNAIE&ab_channel=CodePioneers",
  "https://www.youtube.com/watch?v=As96HhiUwXo&ab_channel=MAXOAZO",
  "https://www.youtube.com/watch?v=-ftFrP8XIxc&ab_channel=MAXOAZO",
  "https://www.youtube.com/watch?v=4kLviL8XwAI&ab_channel=ChillMusicLab",
  "https://www.youtube.com/watch?v=kgx4WGK0oNU&ab_channel=AbaoinTokyo",],
  rap: [  "https://www.youtube.com/watch?v=86XzuPmMriw",
  "https://www.youtube.com/watch?v=05689ErDUdM",
  "https://www.youtube.com/watch?v=0MOkLkTP-Jk",
  "https://www.youtube.com/watch?v=qGytxTraJlE",],
  decouverte: [
    "https://music.youtube.com/playlist?list=RDTMAK5uy_n_5IN6hzAOwdCnM8D8rzrs3vDl12UcZpA"]
};

function resetTranscript() {
  const wordsToUser = document.getElementById("words-user");
  wordsToUser.textContent = "Je vous écoute...";
}

function playRandomSong(listName) {
  let list = radioLists[listName];
  if (!list || list.length ===  0) return;
  let randomId = Math.floor(Math.random() * list.length);
  if (openTab) {
    openTab.close();
  }
  openTab = window.open(list[randomId]);
  resetTranscript();
}

export default function getMusic(transcript, recognition, isFinal) {
  if (transcript.includes("radio") && transcript.includes("mets")) {
    if (isFinal) {
      let genre = transcript.includes("métal") ? "metal" : transcript.includes("work") ? "work" : transcript.includes("rap") ? "rap" : "standard";
      playRandomSong(genre);
    }
  }
  if (transcript.includes("playlist découverte")) {
    if (isFinal) {
      playRandomSong("decouverte");
    }
  }
}
