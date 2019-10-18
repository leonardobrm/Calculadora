let inputResultado = document.querySelector("#inputDisplayResultado");
let textAreaHistorico = document.querySelector("#textAreaHistorico");

let calculo = {
    valorSalvo: null,
    funcaoParaCalcular: null
};

window.addEventListener("load", atribuirEventos);

/** 
 *  Atribui  eventos para os botões da calculadora
*/

function atribuirEventos(){
    document.querySelector("#btnLimpar").addEventListener("click", limpaDados);
    document.querySelector("#btnPonto").addEventListener("click", clicarPonto);
    document.querySelector("#btnResultado").addEventListener("click", clicarResultado);

    let numeros = document.querySelectorAll(".btn-numero");
    let operadores = document.querySelectorAll(".btn-operador");

    for(let numero of numeros){
        numero.addEventListener("click", clicarNumeros);
    }

    for(let operador of operadores){
        operador.addEventListener("click", clicarOperador);
    }
}

/**
 * Remove os dados das variaveis, faz uma separação no historico e habilita os botoes
 */
function limpaDados(){
    inputResultado.value = "";
    inserirTextoHistorico("----");

    calculo.funcaoParaCalcular = null;
    calculo.valorSalvo = null;

    desabilitarBotoes(false); 
}
/**
 * função  que é disparada ao clicar  no ponto  para inserir  numeros decimais
 */
function clicarPonto(){
    
    if(isNaN(inputResultado.value)){
        console.log("clicar ponto");
        inserirTextoHistorico(inputResultado.value);
    }
    if(inputResultado.value == "" || isNaN(inputResultado.value)){
        inputResultado.value = "0.";
    }else if(!inputResultado.value.includes(".")){
        inputResultado.value = inputResultado.value + ".";
    }
    
}
/**
 * exibe o resultado do calculo
 */

function clicarResultado(){
   if(!isNaN(inputResultado.value && calculo.funcaoParaCalcular != null)){
       let resultado = calculo.funcaoParaCalcular(calculo.valorSalvo, Number(inputResultado.value));

       inserirTextoHistorico(inputResultado.value + "\n=" + resultado);

       inputResultado.value = resultado;
       calculo. valorSalvo = resultado;

        calculo.funcaoParaCalcular = null;
   }
}

/**
 * inseri os numeros clicados na calculadora 
 */
function clicarNumeros(){
    let novoValor =  event.target.textContent;
    if(isNaN(inputResultado.value)){
        inserirTextoHistorico(inputResultado.value);
        inputResultado.value = novoValor;
    }else{
        if(inputResultado.value == 0 && inputResultado.value !== "0."){  
            inputResultado.value = novoValor;
        }else{
            inputResultado.value = inputResultado.value + novoValor;
        }
    }
}

/**
 * inseri o operador clicado na calculadora
 */
function clicarOperador(){
    let novoValor = Number(inputResultado.value);
if(!isNaN(inputResultado.value)){
    if(calculo.valorSalvo == null || calculo.funcaoParaCalcular == null){
        calculo.valorSalvo = novoValor;
    }else{
        calculo.valorSalvo = calculo.funcaoParaCalcular(calculo.valorSalvo, novoValor);
    }

    inserirTextoHistorico(calculo.valorSalvo);
}

    let operador = event.target.textContent;
    atribuirOperacao(operador);
    inputResultado.value = operador;

}
// atribui a função de calculo de base no operador em formato string(+,-,*,/)
function atribuirOperacao(operador){
    switch(operador){
        case "+":
            calculo.funcaoParaCalcular = somar;
            break;
        case "-":
            calculo.funcaoParaCalcular = subtrarir;
            break;
        case "*":
            calculo.funcaoParaCalcular = multiplicar;
            break;
        case "/":
            calculo.funcaoParaCalcular = dividir;
            break;

    }
}
/**
 * executa soma entre dois valores
 */
function somar(valor1, valor2){
    return valor1 + valor2;
}
/** 
 * executa subtração entre dois valores
 */ 
function subtrarir(valor1, valor2){
    return valor1 - valor2;
}
/** 
 * executa uma multiplicação entre dois valores
*/
function multiplicar(valor1, valor2){
    return valor1 * valor2;
}
/** 
 * executa uma divisão entre dois valores 
*/
function dividir(valor1, valor2){
    if(valor2 == 0){
        desabilitarBotoes(true);
        return "ERRO, DIVISÃO POR ZERO !!"
    }else{
        return valor1 / valor2;
    }
}
/** 
 * desabilita os botoes
*/
function desabilitarBotoes(desabilitar){
    let botoes = document.querySelectorAll(".btn");

    for(let botao of botoes){
        botao.disabled = desabilitar;
    }
    document.querySelector("#btnLimpar").disabled = false;
}

function inserirTextoHistorico(texto){
    textAreaHistorico.textContent += texto + "\n";
    textAreaHistorico.scrollTop = textAreaHistorico.scrollHeight;
}
