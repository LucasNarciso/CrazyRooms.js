//Retorna um valor baseado no peso ponderado (GPT)
function pesoPonderado(valorMin, valorMax) {
    let intervalo = valorMax - valorMin + 1;
    let somaPesos = (intervalo * (intervalo + 1)) / 2;
    let numeroAleatorio = escolherValor(1, somaPesos);

    // Encontrar o valor correspondente ao peso
    let pesoAcumulado = 0;
    for (let i = 0; i < intervalo; i++) {
        pesoAcumulado += (intervalo - i);
        if (numeroAleatorio <= pesoAcumulado) {
            return valorMin + i;
        }
    }
} //pesoPonderado(5, 10);

function escolherValor(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function iniciarJogo(){

    abrirSala(new sala());
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))