const { ipcRenderer } = require('electron');
const timer = require('./timer')
const data = require('../../data');

let linkSobre = document.querySelector('#link-sobre');
let btPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = function () {
    data.pegaDados(curso.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        });
};

linkSobre.addEventListener('click', function () {
    ipcRenderer.send('abrir-janela-sobre');
});

let imagens = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
btPlay.addEventListener('click', () => {

    if (play) {
        timer.parar(curso.textContent);
        play = false;
    } else {
        timer.iniciar(tempo);
        play = true;
    }
    imagens = imagens.reverse();
    btPlay.src = imagens[0];

})

botaoAdicionar.addEventListener('click', function () {
    let novoCurso = campoAdicionar.value;
    curso.textContent = novoCurso;
    tempo.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
});

ipcRenderer.on('curso-trocado', (evt, nomeCurso) => {
    data.pegaDados(nomeCurso)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
    curso.textContent = nomeCurso;
})
