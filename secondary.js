const { BrowserWindow, dialog } = require('electron').remote;

const button = document.getElementById('verificar')
const automata = {
    estadoInicial: 1,
    estadoFinal: [1, 3],
    transiciones: [{
            estado: 1,
            simbolo: '',
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'a',
            al_estado: 1
        },
        {
            estado: 1,
            simbolo: 'b',
            al_estado: 2
        },
        {
            estado: 2,
            simbolo: 'b',
            al_estado: 2
        },
        {
            estado: 2,
            simbolo: 'c',
            al_estado: 3
        },
        {
            estado: 3,
            simbolo: 'c',
            al_estado: 3
        }
    ]
}

button.addEventListener('click', (event) => {
    let cadena = document.getElementById('txtCadena').value;
    let estadoActual = automata.estadoInicial;
    let error = false;
    debugger;

    cadena.split('').every(simbolo => {
        let encuentraTransicion = false;
        debugger;
        automata.transiciones.every(transicion => {
            if (transicion.estado == estadoActual && transicion.simbolo == simbolo) {
                estadoActual = transicion.al_estado;
                encuentraTransicion = true;
                return false;
            }
            return true;
        });

        if (!encuentraTransicion) {
            error = true;
            return false;
        }
        return true;
    });

    let esfinal = false;

    automata.estadoFinal.every(final => {
        if (!error && estadoActual == final) {
            let options = {
                buttons: ['Aceptar'],
                message: 'Cadena correcta'
            }
            dialog.showMessageBox(options);
            esfinal = true;
            return false;
        }
        return true;
    });

    if (!esfinal) {
        dialog.showErrorBox('Error', 'La cadena no es valida.');
    }
});