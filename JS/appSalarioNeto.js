function calcularSalarioNeto() {
    let puesto = parseInt(document.getElementById("puesto").value);
    let horas = parseInt(document.getElementById("horas").value);
    let anios = parseInt(document.getElementById("anios").value);

    let sueldoHora = 0;
    switch (puesto) {
        case 1: sueldoHora = 300; break;
        case 2: sueldoHora = 100; break;
        case 3: sueldoHora = 120; break;
        case 4: sueldoHora = 150; break;
    }

    let sueldoBase = sueldoHora * horas;
    let canastaBasica = sueldoBase * 0.025;
    let apoyo = sueldoBase * 0.05;
    let antiguedad = anios * 150;
    let estimulo = sueldoBase * 0.02;
    let valesDespensa = sueldoBase * 0.05;
    let totalPercepciones = sueldoBase + canastaBasica + apoyo + antiguedad + estimulo + valesDespensa;

    let ISR = sueldoBase * 0.15;
    let serviciosSalud = sueldoBase * 0.035;
    let AFORE = sueldoBase * 0.04;
    let sindicato = sueldoBase * 0.01;
    let prestamo = sueldoBase * 0.02;
    let fondoAhorro = sueldoBase * 0.02;
    let totalDeducciones = ISR + serviciosSalud + AFORE + sindicato + prestamo + fondoAhorro;

    let salarioNeto = totalPercepciones - totalDeducciones;

    document.getElementById("sueldoBase").innerHTML = "<h5>$" + sueldoBase.toFixed(2) + "</h5>";
    document.getElementById("canastaBasica").innerHTML = "<h5>$" + canastaBasica.toFixed(2) + "</h5>";
    document.getElementById("apoyo").innerHTML = "<h5>$" + apoyo.toFixed(2) + "</h5>";
    document.getElementById("antiguedad").innerHTML = "<h5>$" + antiguedad.toFixed(2) + "</h5>";
    document.getElementById("estimulo").innerHTML = "<h5>$" + estimulo.toFixed(2) + "</h5>";
    document.getElementById("valesDespensa").innerHTML = "<h5>$" + valesDespensa.toFixed(2) + "</h5>";
    document.getElementById("totalPercepciones").innerHTML = "<h4>$" + totalPercepciones.toFixed(2) + "</h4>";

    document.getElementById("ISR").innerHTML = "<h5>$" + ISR.toFixed(2) + "</h5>";
    document.getElementById("ServicioSalud").innerHTML = "<h5>$" + serviciosSalud.toFixed(2) + "</h5>";
    document.getElementById("afore").innerHTML = "<h5>$" + AFORE.toFixed(2) + "</h5>";
    document.getElementById("sindicato").innerHTML = "<h5>$" + sindicato.toFixed(2) + "</h5>";
    document.getElementById("prestamo").innerHTML = "<h5>$" + prestamo.toFixed(2) + "</h5>";
    document.getElementById("fondoAhorro").innerHTML = "<h5>$" + fondoAhorro.toFixed(2) + "</h5>";
    document.getElementById("totalDeducciones").innerHTML = "<h4>$" + totalDeducciones.toFixed(2) + "</h4>";
    document.getElementById("salarioNeto").innerHTML = "<h3>$" + salarioNeto.toFixed(2) + "</h3>";
}