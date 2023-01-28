const qS = (el)=>document.querySelector(el);
const qSa = (el)=>document.querySelectorAll(el);
let clickArray = qSa('.keys_white, .keys_black')

//Evento dispara som ao clicar
document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase());
});

//Campo de compor melodia
qS('.composer button').addEventListener('click', ()=>{
    let song = qS('#input').value;
    if(song !== ''){
        let songArray = song.split('');
        playComposition(songArray);
    }
});

//Evento que dispara a melodia composta
clickArray.forEach(function(element){
    element.addEventListener('click', ()=>{
        let clickKey = element.getAttribute('data-key')
        playSound(clickKey);
    })
});

//Funçao que sleciona os arquivos de audios correspondentes e os dispara
function playSound(sound){
    let audioElement = qS(`#s_${sound}`);
    let keyElement = qS(`div[data-key="${sound}"]`);
    if(audioElement){
        audioElement.currentTime = 0;
        audioElement.play();
    }
    if(keyElement){
        keyElement.classList.add('active');
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 200);
    }
}

//Criando som da melodia composta e determinando um tempo entre as teclas
function playComposition(songArray){
    let wait = 0;
    for(let songItem of songArray){
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait);
        wait += 350;
    }
}