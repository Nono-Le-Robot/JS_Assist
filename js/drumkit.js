let drumSelector = document.querySelector(".drums")
let btn = document.querySelector("#btn")
let btn2 = document.querySelector("#btn2")
btn.addEventListener("click", () => {
    drumSelector.innerHTML =
    `
    <div class="kick">
        <input id="kick1" type="checkbox" checked = "checked">
        <input id="kick2" type="checkbox">
        <input id="kick3" type="checkbox">
        <input id="kick4" type="checkbox">
        <input id="kick5" type="checkbox" checked = "checked">
        <input id="kick6" type="checkbox">
        <input id="kick7" type="checkbox">
        <input id="kick8" type="checkbox">
    </div>
    <div class="snare">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox" checked = "checked">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox" checked = "checked">
        <input type="checkbox">
    </div>
    <div class="hithat">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
        <input type="checkbox" checked = "checked">
    </div>
    `
})
btn2.addEventListener("click", () => {
    drumSelector.innerHTML =
    `
    <div class="kick">
        <input id="kick1" type="checkbox" checked>
        <input id="kick2" type="checkbox" checked>
        <input id="kick3" type="checkbox">
        <input id="kick4" type="checkbox" checked>
        <input id="kick5" type="checkbox">
        <input id="kick6" type="checkbox" checked>
        <input id="kick7" type="checkbox">
        <input id="kick8" type="checkbox" checked>
    </div>
    <div class="snare">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox" checked>
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox">
        <input type="checkbox" checked>
        <input type="checkbox">
    </div>
    <div class="hithat">
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
        <input type="checkbox" checked>
    </div>
    `
})
function sequencer(){
    const kick = new Tone.Player("./sounds/drumkit/kick/Kick_20.wav").toMaster();
    const snare = new Tone.Player("./sounds/drumkit/snare/Snare_1.wav").toMaster();
    const hh = new Tone.Player("./sounds/drumkit/hithat/Hihat_1.wav").toMaster();
    let index = 0;
    Tone.Transport.bpm.value = 120;
    Tone.Transport.scheduleRepeat(repeat,'8n')
    Tone.Transport.start()
    var vol = new Tone.Volume(10);
    kick.chain(vol -5, Tone.Master);
    snare.chain(vol, Tone.Master);
    hh.chain(vol, Tone.Master);
    function repeat(){
        let step = index % 8;
        let kickInputs = document.querySelector(`.kick input:nth-child(${step + 1})`)
        let snareInputs = document.querySelector(`.snare input:nth-child(${step + 1})`)
        let hithatInputs = document.querySelector(`.hithat input:nth-child(${step + 1})`)
        if(kickInputs.checked){
            kick.start();
        }
        if(snareInputs.checked){
            snare.start()
        }
        if(hithatInputs.checked){
            hh.start()
        }
        index++
    }      
}
sequencer()