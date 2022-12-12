const { ipcRenderer } = require('electron');
const timer = require('./timer')

let linkSobre = document.querySelector('#link-sobre');
let btPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imagens = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
btPlay.addEventListener('click', ()=>{

    if (play){
        timer.parar(curso.textContent, tempo.textContent);
    }else{
        timer.iniciar(tempo);
    }

    play = !play;

    imagens = imagens.reverse();
    btPlay.src = imagens[0];

})
