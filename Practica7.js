let notasalumnos= [4, 6, 8, 3, 9];
let contadoraprobados=0;
let contadorsuspensos=0;
for (let i=0; i<notasalumnos.length; i++) {
    if (notasalumnos[i]>=5) {
        console.log("Alumno " + (i+1) + ": Aprobado");
        contadoraprobados++;
    } else {
        console.log("Alumno " + (i+1) + ": Suspenso");
        contadorsuspensos++;
    }
}
console.log("Número de aprobados: " + contadoraprobados);
console.log("Número de suspensos: " + contadorsuspensos);