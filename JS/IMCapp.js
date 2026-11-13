var num1 = document.querySelector("#input-peso");
var num2 = document.querySelector("#input-estatura");
var resultado = document.querySelector("#resultado");

let timerIMC;

var calcularIMC = () => {
    clearTimeout(timerIMC);
    resultado.innerHTML = `<br><img src="img/spinner.gif" width="50" alt="Calculando...">`;
    resultado.style.color = "black";
    timerIMC = setTimeout(() => {
        var peso = parseFloat(num1.value);
        var estatura = parseFloat(num2.value);
        if (isNaN(peso) || isNaN(estatura)) {
            resultado.innerHTML = "Ingrese valores válidos";
            return;
        }

        var IMC = peso / (estatura * estatura);
        resultado.innerHTML = "SU IMC ES: " + IMC.toFixed(2);
        
        if(IMC < 18.5) {
            resultado.innerHTML += `<br>ESTA BAJO DE PESO`;
            resultado.style.color = "blue";
        }
        if(IMC >= 18.5 && IMC < 24.9) {
            resultado.innerHTML += `<br>ESTA EN PESO NORMAL`;
            resultado.style.color = "green";
        }
        if(IMC >= 25 && IMC < 29.9) {
            resultado.innerHTML += `<br>ESTA EN SOBREPESO`;
            resultado.style.color = "orange";
        }
        if(IMC >= 30 && IMC < 34.9) {
            resultado.innerHTML += `<br>ESTA EN OBESIDAD`;
            resultado.style.color = "red";
        }
        if(IMC >= 35 && IMC < 39.9) {
            resultado.innerHTML += `<br>ESTA EN OBESIDAD GRADO II`;
            resultado.style.color = "purple";
        }
        if(IMC >= 40) {
            resultado.innerHTML += `<br>ESTA EN OBESIDAD GRADO III`;
            resultado.style.color = "maroon";
        }
    }, 800);
}

document.querySelector("#reset").onclick = () => {
    num1.value = 1;
    num2.value = 1;
    resultado.innerHTML = "RESULTADO";
    resultado.style.color = "black";
}

num1.oninput = () => { calcularIMC(); };
num2.oninput = () => { calcularIMC(); };