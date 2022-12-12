const moment = require('moment');
const {ipcRenderer} = require('electron');

let segundos = 0;
let timer;
module.exports = {
    iniciar(element){
        let tempo = moment.duration(element.textContent);
        segundos = tempo.asSeconds();
        clearInterval(timer);
        timer  = setInterval(() => {
            segundos++;
            element.textContent = this.segundosParaTempo(segundos);
        }, 1000);



    },
    segundosParaTempo(){
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    },
    parar(){
        clearInterval(timer);
        ipcRenderer.send('curso-parado', curso, this.segundosParaTempo(segundos));
    }
}