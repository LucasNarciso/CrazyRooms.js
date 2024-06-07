

function enviar(){
    let campo = document.querySelector('#campo')
    if(campo.value != ""){
        escreverNoTerminal('jogador', campo.value)
    }
    campo.value = "";
}

function limparTerminal(){
    document.querySelector('.ConteudoTerminal').innerHTML = ""
}


function escreverNoTerminal(origem, texto, opcoes){
    let terminal = document.querySelector('.ConteudoTerminal')
    if(origem == 'jogo'){
        let idTexto = Math.random();
        let idOpts = Math.random();
        if(opcoes){
            let opcoesHTML = opcoes.map((opcao,index)=>`${index+1}. ${opcao}`)

            terminal.insertAdjacentHTML('beforeEnd',`<div class="mensagem escolha">
                <p id="${idTexto}"></p>
                <div class="opcoes" id="${idOpts}">
                    
                </div>
            </div>`)
            escreveTexto(texto, idTexto)
            escreveTexto(opcoesHTML, idOpts)
        }else{
            terminal.insertAdjacentHTML('beforeEnd',`<div class="mensagem">
                <p id="${idTexto}"></p>
            </div>`)
            escreveTexto(texto, idTexto)
        }
    }else if(origem == 'jogador'){
        terminal.insertAdjacentHTML('beforeEnd',`<div class="mensagem">
            <p>> ${texto}</p>
        </div>`)
    }
}

async function escreveTexto(texto, idDestino){

    let textoSplit = []
    if(texto.split){
        textoSplit = texto.split('');
        for (let i = 0; i < textoSplit.length; i++) {
            const char = textoSplit[i];
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`${char}`)
            await sleep(10)               
        }
    }else{
        for (let j = 0; j < texto.length; j++) {
            textoSplit = texto[j].split('');
            for (let i = 0; i < textoSplit.length; i++) {
                const char = textoSplit[i];
                document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`${char}`)
                await sleep(10)               
            }
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<br>`)
        }
    }

}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))