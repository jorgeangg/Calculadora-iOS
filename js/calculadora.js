const botones = document.querySelectorAll(".botones");
primerNumero = "";
segundoNumero = "";
espera = false;
operador = "";
var guardado;
resultado = "";
for (let i = 0; i < botones.length; i++) {
  // Cada vez que se presione el boton con el indice en i ejecutara el codigo
  botones[i].addEventListener("click", function () {
    // Si el usuario presiona el boton de borrado se devuelven a los valores por defecto
    if (botones[i].value == "AC") {
      primerNumero = "";
      segundoNumero = "";
      espera = false;
      $("#resultados").text("0");
    } // Si el usuario selecciona algun operador se pasara a la siguiente variable
    else if (
      botones[i].value == "/" ||
      botones[i].value == "%" ||
      botones[i].value == "*" ||
      botones[i].value == "-" ||
      botones[i].value == "+"
    ) {
      espera = true;
      operador = botones[i].value;
    } /*Si el usuario presiona el boton de negativo se multiplicara el valor por -1, 
        siempre y cuando se haya seleccionado un valor*/ else if (
      botones[i].value == "+/-"
    ) {
      if (primerNumero == "") {
        $("#resultados").text("0");
      } else {
        if (primerNumero == resultado) {
          primerNumero = parseFloat(primerNumero) * -1;
          $("#resultados").text(primerNumero);
        } else {
          if (espera == false) {
            primerNumero = parseFloat(primerNumero) * -1;
            $("#resultados").text(primerNumero);
          } else {
            if (segundoNumero == "") {
              $("#resultados").text("0");
            } else {
              segundoNumero = parseFloat(segundoNumero) * -1;
              $("#resultados").text(segundoNumero);
            }
          }
        }
      }
    } //Si el usuario presiona el boton de la coma se le agregara un punto para que pase de ser entero a un numero real
    else if (botones[i].value == ".") {
      if (espera == false) {
        if (primerNumero == "") {
          primerNumero = "0.";
          $("#resultados").text(primerNumero);
        } else {
          if (primerNumero.indexOf(".") > -1) {
            $("#resultados").text(primerNumero);
          } else {
            primerNumero = primerNumero + ".";
            $("#resultados").text(primerNumero);
          }
        }
      } else {
        if (segundoNumero == "") {
          segundoNumero = "0.";
          $("#resultados").text(segundoNumero);
        } else {
          if (segundoNumero.indexOf(".") > -1) {
            $("#resultados").text(segundoNumero);
          } else {
            segundoNumero = segundoNumero + ".";
            $("#resultados").text(segundoNumero);
          }
        }
      }
    } //Si el usuario presiona alguno de los numeros se añadiran a las variables
    else if (!isNaN(botones[i].value)) {
      if (espera == false) {
        primerNumero += botones[i].value;
        $("#resultados").text(primerNumero);
      } else {
        if (segundoNumero == "0.") {
          segundoNumero += botones[i].value;
          $("#resultados").text(segundoNumero);
        } else {
          if (guardado !== segundoNumero) {
            segundoNumero += botones[i].value;
            $("#resultados").text(segundoNumero);
          } else {
            segundoNumero = "";
            guardado = "";
            segundoNumero += botones[i].value;
            $("#resultados").text(segundoNumero);
          }
        }
      }
    } // Si el usuario presiona el boton de porcentaje se multiplicaran los valores y se dividira entre 100
    else if (botones[i].value == "porcentaje") {
      if (segundoNumero == "") {
        resultado = parseFloat(primerNumero) / 100;
      } else {
        resultado =
          (parseFloat(primerNumero) * parseFloat(segundoNumero)) / 100;
      }
      $("#resultados").text(resultado);
      primerNumero = parseFloat(resultado);
      guardado = segundoNumero;
    } // Si el usuario presiona el boton de igual se realizara la operacion dependiendo del operador escogido
    else if (botones[i].value == "=") {
      if (operador == "/") {
        resultado = parseFloat(primerNumero) / parseFloat(segundoNumero);
      } else if (operador == "+") {
        resultado = parseFloat(primerNumero) + parseFloat(segundoNumero);
      } else if (operador == "-") {
        resultado = parseFloat(primerNumero) - parseFloat(segundoNumero);
      } else if (operador == "*") {
        resultado = parseFloat(primerNumero) * parseFloat(segundoNumero);
      } // Si el resultado no es un numero escribirimos error en la pantalla
      if (isNaN(resultado)) {
        $("#resultados").text("Error");
      } // Si es un numero escribiremos el resultado en pantalla
      else {
        $("#resultados").text(resultado);
        primerNumero = parseFloat(resultado);
        guardado = segundoNumero;
      }
    }
  });
}
