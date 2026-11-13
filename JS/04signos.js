var valorDia=document.getElementById("valorDia");
var dia=document.getElementById("dia");
var mes=document.getElementById("mes");
var signo=document.getElementById("signo");
var fecha=document.getElementById("fecha");

const verSigno=()=>{
    let d=parseInt(dia.value)
    let m=mes.value
    valorDia.innerHTML="DÍA "+d
    fecha.textContent=d+" de "+m
    var imgSigno=""
    switch(m){
        case "ENERO": imgSigno=(d>=20)?"Acuario":"Capricornio";break;
        case "FEBRERO": imgSigno=(d>=19)?"Piscis":"Acuario";break;
        case "MARZO": imgSigno=(d>=21)?"Aries":"Piscis";break;
        case "ABRIL": imgSigno=(d>=20)?"Tauro":"Aries";break;
        case "MAYO": imgSigno=(d>=21)?"Geminis":"Tauro";break;
        case "JUNIO": imgSigno=(d>=21)?"Cancer":"Geminis";break;
        case "JULIO": imgSigno=(d>=23)?"Leo":"Cancer";break;
        case "AGOSTO": imgSigno=(d>=23)?"Virgo":"Leo";break;
        case "SEPTIEMBRE": imgSigno=(d>=23)?"Libra":"Virgo";break;
        case "OCTUBRE": imgSigno=(d>=23)?"Escorpio":"Libra";break;
        case "NOVIEMBRE": imgSigno=(d>=22)?"Sagitario":"Escorpio";break;
        case "DICIEMBRE": imgSigno=(d>=22)?"Capricornio":"Sagitario";break;
    }
    signo.src="img/Signos/"+imgSigno+".jpg"
}

document.getElementById("reset").onclick=()=>{
    dia.value=1
    mes.value="ENERO"
    valorDia.innerHTML="DÍA 1"
    fecha.textContent="1 de ENERO"
    signo.src="img/Signos/portadasignos.jpg"
};

dia.oninput=()=>{verSigno()};
mes.onchange=()=>{verSigno()};

verSigno();