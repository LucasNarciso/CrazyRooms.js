var SALA = null;

function limparTerminal(){
    // document.querySelector('.ConteudoTerminal').innerHTML = ""
    document.querySelectorAll('[class*="mensagem"]').forEach(a=>a.remove())
}

function escreverNoTerminal(config){
    // destino, texto, lista, tipoOpt
    let idTexto = Math.random();
    let idOpts = Math.random();
    let elementoListaAdd = null;
    let classe = "";

    if(config.lista){
        let listaHTML;

        if(config.tipoLista == "lista"){
            listaHTML = config.lista.map((itemLista)=>`${config.tipoOpt} ${itemLista}`);
            !config.destino && (config.destino = document.querySelector('.ConteudoTerminal'));

        }else if(config.tipoLista == "opcoes"){
            listaHTML = config.lista.map((opcao,index)=>`${index+1}. ${opcao}`);
            !config.destino && (config.destino = document.querySelector('.Opcoes'));
            classe = "Opcao";

        }else if(config.tipoLista == "itens"){
            listaHTML = config.lista.map((opcao)=>`${opcao}`);
            !config.destino && (config.destino = document.querySelector('.Opcoes'));
            elementoListaAdd = `<button class="Mobile DetalheItem">...</button>`
            classe = "Item";
        }

        config.destino.insertAdjacentHTML('afterBegin',`
        <div class="mensagem lista">
            ${config.texto ? `<p id="${idTexto}"></p>` : ``}
            <div class="itensLista" id="${idOpts}">
                
            </div>
        </div>`)
        config.texto && escreveTexto3({texto: config.texto, idDestino: idTexto, classe: classe}, elementoListaAdd)
        escreveTexto3({texto: listaHTML, idDestino: idOpts, classe: classe}, elementoListaAdd)
    }else{
        document.querySelector('.ConteudoTerminal').insertAdjacentHTML('afterBegin',`<div class="mensagem">
            <p id="${idTexto}"></p>
        </div>`)
        escreveTexto3({texto: config.texto, idDestino: idTexto, classe: classe}, elementoListaAdd)
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

//INATIVA
async function escreveTexto(texto, idDestino){

    
    if(texto.split){
        document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto">${texto}</p>`)
    }else{
        for (let i = 0; i < texto.length; i++) {
            texto[i].split(".")[0] / 1 ?
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto Opcao">${texto[i]}</p>`)
            :
            document.getElementById(idDestino).insertAdjacentHTML('beforeEnd',`<p class="texto">${texto[i]}</p>`)
        }
    }
}

async function escreveTexto3(config, elementoListaAdd){
    let destino = document.getElementById(config.idDestino)
    let delay = 1;

    if(Array.isArray(config.texto)){
        for (let i = 0; i < config.texto.length; i++) {

            destino.insertAdjacentHTML('beforeEnd',`${
                config.classe ? `<p class="texto ${config.classe}"></p>` : `<p class="texto"></p>`
            }`)
            
            let textoDividido = config.texto[i].split("");
            for (let j = 0; j < textoDividido.length; j++) {
                Array.from(destino.querySelectorAll('p')).at(-1).innerHTML += textoDividido[j];
                await sleep(delay)
            }
            elementoListaAdd && Array.from(destino.querySelectorAll('p')).at(-1).insertAdjacentHTML('beforeEnd', elementoListaAdd);
        }
    }else{
        let textoDividido = config.texto.split("");
    
        destino.insertAdjacentHTML('beforeEnd',`<p class="texto"></p>`)
        for (let i = 0; i < textoDividido.length; i++) {
            destino.querySelector('p').innerHTML += textoDividido[i];
            await sleep(delay)
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
    escreverNoTerminal({
        destino:'',
        texto: `Essa é a sala ${salaAtual.numero}, do tipo ${atributo}, e nela temos: `, 
        lista: salaAtual.eventosSala.length > 0 ? salaAtual.eventosSala.map(e=>e.nome) : ["Nada"],
        tipoOpt: "-",
        tipoLista: "lista"
    })
    escreverNoTerminal({
        destino:'',
        texto: `O que deseja fazer agora?`, 
        lista: salaAtual.acoes.map(ac=>ac.nome),
        tipoLista: "opcoes"
    })
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

    let save;
    let acoes = [{nome:"Voltar", funcao:()=>{document.getElementById('Mochila').remove(); document.querySelector('.Opcoes').style.display = "flex"; abrirSala(jogador, false);}, evento:null}];
    
    //Adiciona Layout da mochila
    document.querySelector(".ConteudoTerminal").innerHTML = `
        <div id="Mochila">
        <div id="Mochila-Info"></div>
            <div class="Mochila-Divisoria DivisoriaUm">
                <div id="Mochila-Itens"></div>
                <div id="Mochila-Equipados"></div>
            </div>
            <div class="Mochila-Divisoria DivisoriaDois">
                <div id="Mochila-Detalhes"></div>
                <div id="Mochila-Acoes"></div>
            </div>
        </div>
        <div class="Opcoes"></div>
    `
    document.querySelector('.Opcoes').style.display = "none"; ;//Ocultando div padrão de opções

    //Escreve no terminal "Esse são seus itens:"
    escreverNoTerminal({
        destino: document.getElementById('Mochila-Itens'),
        texto: null, 
        lista: jogador.mochila.map(i=>i.qtd > 1 ? i.nome+" ("+i.qtd+")" : i.nome),
        tipoOpt: " ",
        tipoLista: "itens"
    })
    escreverNoTerminal({
        destino: document.getElementById('Mochila-Equipados'),
        texto: null, 
        lista: Object.keys(jogador.equipados).map(esp=>esp+": "),
        tipoOpt: " ",
        tipoLista: "lista"
    })
    escreverNoTerminal({
        destino: document.getElementById('Mochila-Acoes'),
        texto: `O que deseja fazer agora?`, 
        lista: acoes.map(a=>a.nome),
        tipoLista: "opcoes"
    })
    defineOpcoes({acoes: acoes}, jogador);

    //Salva o jogador atual
    save = JSON.parse(localStorage.getItem('PlayerCCData'))
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.mochila = jogador.mochila)
    localStorage.setItem('PlayerCCData', JSON.stringify(save))
}

function defineOpcoes(evento, jogador){
    try {
        evento.acoes.forEach(acao => {
            let opcao = Array.from(document.querySelectorAll(`[class*="Opcao"]`)).find(opt => opt.innerText.includes(acao.nome))
    
            if(acao.parametro && opcao){
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