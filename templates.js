const data = require('./data');
const { app } = require('electron');


module.exports = {
    templateInicial: null,

    gerarMenuTemplate(win) {
        let template = [
            { 'label': 'Cursos' },
            { type: 'separator' }
        ];

        // pegando o nome de todos os cursos
        let cursos = data.pegaNomeDosCursos();

        cursos.forEach((curso) => {
            let menuItem = {
                label: curso,
                type: 'radio',  
                click: () =>{
                    win.send('curso-trocado', curso)
                }
            }
            template.push(menuItem);
        });

        template.push({
            label: "",
            type: 'separator'

        })

        this.templateInicial = template;
        return template;
    },
    adicionaCursoNoTray(curso, win) {

        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;

    }

}