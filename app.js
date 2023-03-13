let turno = true;
let tablero = document.getElementsByClassName('casilla');

for (let i = 0; i < tablero.length; i++) {
    tablero[i].setAttribute('onclick', `pintaCasilla(${i})`);
}

let posicionesX = [];
let posicionesO = [];

let combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let tiempoRestante = 11;
let contadorX = 0;
let contadorO = 0;
let contadorDiv = document.createElement('div');
contadorDiv.innerHTML = `GanadasX: ${contadorX} GanadasO: ${contadorO}`;
document.body.insertBefore(contadorDiv, document.body.firstChild);

function temporizador() {//la funcion  temporizador simplemente muestra por pantalla el tiempo de cada jugador para poner su ficha y cuando llega a 0 muestra por pantalla el turno del jugador
    tiempoRestante--;
    document.getElementById("temporizador").textContent = `Tiempo restante: ${tiempoRestante} segundos`;

    if (tiempoRestante === 0) {
        turno = !turno;
        document.getElementById("temporizador").textContent = `Turno del jugador ${turno ? 'X' : 'O'}`;
    }
}

setInterval(temporizador, 1000);//10 segundos por cada turno

let perdioTurno = false;
//pintaCasilla lo que hace es poner las fichas que cada usuario ponga con la funcion push que pone la ficha que toca,
//abajo vemos que cada ficha consta de un contador, una vez el contador llegue a 0 podra poner ficha el otro.
function pintaCasilla(i) {
    if (perdioTurno) {
        perdioTurno = false;
    } else {
        tiempoRestante = 10;
    }

    if (turno) {
        tablero[i].textContent = 'X';
        posicionesX.push(i);
        posicionesX.sort();
        if (posicionesX.length >= 3) {
            hayGanador(posicionesX, 'X');
        }
    } else {
        tablero[i].textContent = 'O';
        posicionesO.push(i);
        posicionesO.sort();
        if (posicionesO.length >= 3) {
            hayGanador(posicionesO, 'O');
        }
    }

    tablero[i].removeAttribute("onclick");

    if (!perdioTurno) {
        turno = !turno;
    }

    if (tiempoRestante == 0) {
        perdioTurno = true;
    }

    document.getElementById("temporizador").textContent = perdioTurno ? 'Has perdido el turno' : `Turno del jugador ${turno ? 'X' : 'O'}`;
}

tablero[i].removeAttribute("onclick");
turno = !turno;

if (tiempoRestante == 0) { // cambiar de turno si el tiempo restante llega a cero
    turno = !turno;
}


function hayGanador(posiciones, jugador) {//funcion para cuando un jugador gane
    for (let i = 0; i < combinacionGanadora.length; i++) {//bucle para recorrer todas las posibles combinanciones que den la victoria
        let contador = 0;
        for (let j = 0; j < posiciones.length; j++) {//bucle para recorrer todas las posiciones que ponga el que este jugando
            if (combinacionGanadora[i].includes(posiciones[j])) {
                contador++;
            }
        }
        if (contador == 3) {
            alert(`¡Ha ganado el jugador ${jugador}!`);//si coinciden las tres posiciones puestas por el usuario con la combinacion gannadora, realiza lo de abajo que simplemente es poner el ganador
            if (jugador === 'X') {
                contadorX++;
            } else {
                contadorO++;
            }
            contadorDiv.innerHTML = `GanadasX: ${contadorX} GanadasO: ${contadorO}`;
            for (let k = 0; k < combinacionGanadora[i].length; k++) {
                tablero[combinacionGanadora[i][k]].style.backgroundColor = "green";
            }
            setTimeout(() => {
                limpiarTablero();
            }, 1000);
        }
    }
}

function limpiarTablero() {//la funcion limpiarTablero lo que hace es borrar todo el contenido del tablero cuando haya un ganador
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].textContent = '';
        tablero[i].style.backgroundColor = '';
        tablero[i].setAttribute('onclick', `pintaCasilla(${i})`);
    }
    posicionesX = [];
    posicionesO = [];
    turno = true;
}