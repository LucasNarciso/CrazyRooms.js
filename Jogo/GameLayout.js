var SALA = null;

function enviar(){
    let campo = document.querySelector('#campo')
    if(campo.value != ""){
        escreverNoTerminal('jogador', campo.value)
    }
    campo.value = "";
}

function limparTerminal(){
    // document.querySelector('.ConteudoTerminal').innerHTML = ""
    document.querySelectorAll('[class*="mensagem"]').forEach(a=>a.remove())
}


function escreverNoTerminal(origem, texto, lista, tipoOpt){
    let destino;
    if(origem == 'jogo'){
        let idTexto = Math.random();
        let idOpts = Math.random();
        if(lista){
            let listaHTML;

            if(tipoOpt){
                listaHTML = lista.map((opcao,index)=>`${tipoOpt} ${opcao}`)
                destino = document.querySelector('.ConteudoTerminal')
            }else{
                listaHTML = lista.map((opcao,index)=>`${index+1}. ${opcao}`)
                destino = document.querySelector('.Opcoes');
            }

            destino.insertAdjacentHTML('afterBegin',`<div class="mensagem lista">
                <p id="${idTexto}"></p>
                <div class="itensLista" id="${idOpts}">
                    
                </div>
            </div>`)
            escreveTexto3(texto, idTexto)
            escreveTexto3(listaHTML, idOpts)
        }else{
            document.querySelector('.ConteudoTerminal').insertAdjacentHTML('afterBegin',`<div class="mensagem">
                <p id="${idTexto}"></p>
            </div>`)
            escreveTexto3(texto, idTexto)
        }
    }else if(origem == 'jogador'){
        terminal.insertAdjacentHTML('afterBegin',`<div class="mensagem">
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

async function escreveTexto3(texto, idDestino){
    let destino = document.getElementById(idDestino)
    let delay = 10;
    if(!Array.isArray(texto)){
        let textoDividido = texto.split("");

        destino.insertAdjacentHTML('beforeEnd',`<p class="texto"></p>`)
        for (let i = 0; i < textoDividido.length; i++) {
            destino.querySelector('p').innerHTML += textoDividido[i];
            await sleep(delay)
        }
    }else{
        for (let i = 0; i < texto.length; i++) {
            if(texto[i].split(".")[0] / 1){
                destino.insertAdjacentHTML('beforeEnd',`<p class="texto option"></p>`)
                let textoDividido = texto[i].split("");
                for (let j = 0; j < textoDividido.length; j++) {
                    Array.from(destino.querySelectorAll('p')).at(-1).innerHTML += textoDividido[j];
                    await sleep(delay)
                }
            }else{
                destino.insertAdjacentHTML('beforeEnd',`<p class="texto"></p>`)
                let textoDividido = texto[i].split("");
                for (let j = 0; j < textoDividido.length; j++) {
                    Array.from(destino.querySelectorAll('p')).at(-1).innerHTML += textoDividido[j];
                    await sleep(delay)
                }
            }
        }
    }
}

async function abrirSala(jogador, nova){
    limparTerminal();

    let salaAtual = nova ? new sala() : new sala(jogador.ultimaSala);
    let atributo = "simples";
    let save;
    
    SALA = salaAtual;
    //Define o número atual da sala
    salaAtual.numero = nova ? jogador.ultimaSala.numero+1 : jogador.ultimaSala.numero;

    salaAtual.acoes.push({nome:"Abrir mochila", funcao:()=>{abrirMochila(jogador)}, evento:null})
    
    //Adiciona ação de próxima sala
    salaAtual.acoes.find(a=>a.nome == "Próxima sala") ?
    (salaAtual.acoes.find(a=>a.nome == "Próxima sala").funcao = ()=>{abrirSala(jogador, true)}) :
    salaAtual.acoes.push({nome:"Próxima sala", funcao:()=>{abrirSala(jogador, true)}, evento:null})

    
    //Escreve no terminal
    escreverNoTerminal('jogo',`Essa é a sala ${salaAtual.numero}, do tipo ${atributo}, e nela temos: `, salaAtual.eventosSala.length > 0 ? salaAtual.eventosSala.map(e=>e.nome) : ["Nada"], "-")
    escreverNoTerminal('jogo',`O que deseja fazer agora?`, salaAtual.acoes.map(ac=>ac.nome))
    defineOpcoes(salaAtual, jogador);
    
    //Salva o jogador atual
    jogador.ultimaSala = salaAtual
    save = JSON.parse(localStorage.getItem('PlayerCCData'))
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.ultimaSala = salaAtual)
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.mochila = jogador.mochila)
    localStorage.setItem('PlayerCCData', JSON.stringify(save))
}

function abrirMochila(jogador){
    limparTerminal();

    let atributo = "simples";
    let save;
    let acoes = [{nome:"Voltar", funcao:abrirSala, evento:null}];
    
    //Escreve no terminal
    escreverNoTerminal('jogo',`Esse são seus itens:`, jogador.mochila.map(i=>i.nome+" ("+i.qtd+")"), "-")
    escreverNoTerminal('jogo',`O que deseja fazer agora?`, acoes.map(a=>a.nome))
    defineOpcoes({acoes: acoes}, jogador);
    
    //Salva o jogador atual
    save = JSON.parse(localStorage.getItem('PlayerCCData'))
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.mochila = jogador.mochila)
    localStorage.setItem('PlayerCCData', JSON.stringify(save))
}

function defineOpcoes(evento, jogador){
    try {
        evento.acoes.forEach(acao => {
            let opcao = Array.from(document.querySelectorAll(`[class*="option"]`)).find(opt => opt.innerText.includes(acao.nome))
    
            if(acao.parametro){
                if(acao.evento != null){
                    opcao.addEventListener('click', ()=>{acao.evento[acao.funcao](acao.parametro)})
                }else if(acao.parametro){
                    opcao.addEventListener('click', ()=>{acao.funcao(acao.parametro)})
                }
            }else{
                if(acao.evento != null){
                    opcao.addEventListener('click', ()=>{acao.evento[acao.funcao](jogador)})
                }else{
                    opcao.addEventListener('click', ()=>{acao.funcao(jogador)})
                }
            }
        });
    } catch (error) {
        setTimeout(() => {
            defineOpcoes(evento, jogador)
        }, 100);
    }
}