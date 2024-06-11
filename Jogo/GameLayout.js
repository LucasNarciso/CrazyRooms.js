

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


function escreverNoTerminal(origem, texto, opcoes, tipoOpt){
    let terminal = document.querySelector('.ConteudoTerminal')
    if(origem == 'jogo'){
        let idTexto = Math.random();
        let idOpts = Math.random();
        if(opcoes){
            let opcoesHTML;
            
            console.log("opcoes: ")
            console.log(opcoes)

            if(tipoOpt){
                opcoesHTML = opcoes.map((opcao,index)=>`${tipoOpt} ${opcao}`)
            }else{
                opcoesHTML = opcoes.map((opcao,index)=>`${index+1}. ${opcao}`)
            }

            console.log("opcoesHTML: ")
            console.log(opcoesHTML)

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

function novaSala(){
    limparTerminal();
    let salaAtual = new sala();
    let atributo = "simples"

    escreverNoTerminal('jogo',`Essa é uma sala ${atributo}, e nela temos: ${salaAtual.eventosSala.length  + " " + salaAtual.eventosSala.map(e=>e.nome).join('\n')}`)
    escreverNoTerminal('jogo',`O que deseja fazer agora?`, ['Abrir o baú', 'Próxima sala'])

    document.querySelector("#botao").addEventListener('click', ()=>{
        let mensagensJogador = Array.from(document.querySelectorAll(`[class="mensagem"]`)).filter(m=>m.innerText.search('>') != -1);

        if(mensagensJogador.length > 0){
            let ultimaRespostaJogador = Array.from(document.querySelectorAll(`[class="mensagem"]`)).filter(m=>m.innerText.search('>') != -1).at(-1).innerText.replace('> ','');
            
            switch (ultimaRespostaJogador) {
                case "1":
                    salaAtual.eventosSala[0].abrirBau();
                    break;
                case "2":
                    novaSala();
                    break;
            
                default:
                    break;
            }
        }
    })
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))