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


function escreverNoTerminal(origem, texto, lista, tipoOpt){
    let terminal = document.querySelector('.ConteudoTerminal')
    if(origem == 'jogo'){
        let idTexto = Math.random();
        let idOpts = Math.random();
        if(lista){
            let listaHTML;

            if(tipoOpt){
                listaHTML = lista.map((opcao,index)=>`${tipoOpt} ${opcao}`)
            }else{
                listaHTML = lista.map((opcao,index)=>`${index+1}. ${opcao}`)
            }

            terminal.insertAdjacentHTML('beforeEnd',`<div class="mensagem lista">
                <p id="${idTexto}"></p>
                <div class="itensLista" id="${idOpts}">
                    
                </div>
            </div>`)
            escreveTexto(texto, idTexto)
            escreveTexto(listaHTML, idOpts)
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

//INATIVA
async function escreveTexto2(texto, idDestino){

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

async function escreveTexto(texto, idDestino){

    
    if(texto.split){
        document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto">${texto}</p>`)
    }else{
        for (let i = 0; i < texto.length; i++) {
            texto[i].split(".")[0] / 1 ?
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto option">${texto[i]}</p>`)
            :
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto">${texto[i]}</p>`)
        }
    }
}

function abrirSala(salaAnterior){
    limparTerminal();
    let dadosJogador = JSON.parse(localStorage.getItem('PlayerCCData'));
    let salaAtual = salaAnterior ? salaAnterior : new sala();
    let atributo = "simples"
    let acoes = [{nome: "Próxima sala", funcao: ()=>{abrirSala()}, evento:null}]
    let numero = salaAnterior ? dadosJogador.personagens.find(p=>p.id == dadosJogador.ultimoPersonagem).salaAtual : dadosJogador.personagens.find(p=>p.id == dadosJogador.ultimoPersonagem).salaAtual+1;

    dadosJogador.personagens.find(p=>p.id == dadosJogador.ultimoPersonagem).salaAtual = numero;

    localStorage.setItem('PlayerCCData', JSON.stringify(dadosJogador))

    escreverNoTerminal('jogo',`Essa é a sala ${numero}, do tipo ${atributo}, e nela temos: `, salaAtual.eventosSala.length > 0 ? salaAtual.eventosSala.map(e=>e.nome) : ["Nada"], "-")

    let todasAcoes = acoes.concat(salaAtual.acoes)

    escreverNoTerminal('jogo',`O que deseja fazer agora?`, todasAcoes.map(ac=>ac.nome))
    defineOpcoes(todasAcoes, salaAtual);
}

function defineOpcoes(acoes, sala){
    acoes.forEach(acao => {
        let opcao = Array.from(document.querySelectorAll(`[class*="option"]`)).find(opt => opt.innerText.includes(acao.nome))
        if(acao.evento != null){
            opcao.addEventListener('click', ()=>{acao.evento[acao.funcao](sala)})
        }else{
            opcao.addEventListener('click', ()=>{acao.funcao(sala)})
        }
    });
}