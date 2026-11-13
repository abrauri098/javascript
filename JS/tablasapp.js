var inputRango = document.querySelector("#num");
var spanValor = document.querySelector("#val");
var btnReset = document.querySelector("#reset");

let timerTablas;

const calcular = () => {
    let numero = parseInt(inputRango.value);
    spanValor.innerHTML = numero;
for (let i = 1; i <= 10; i++) {
    document.querySelector("#res" + i).innerHTML = ""; 
}
document.querySelector("#res5").innerHTML = `<img src="img/spinner.gif" width="25" alt="...">`;
    timerTablas = setTimeout(() => {
        for (let i = 1; i <= 10; i++) {
            let resultado = numero * i;
            document.querySelector("#res" + i).innerHTML = `${numero} x ${i} = ${resultado}`;
        }
    }, 800); 
}

const reset = () => {
    inputRango.value = 1;
    calcular();
}

inputRango.oninput = () => { calcular(); };
btnReset.onclick = () => { reset(); };

calcular();