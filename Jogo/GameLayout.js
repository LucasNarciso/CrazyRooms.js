var SALA = null;

function limparTerminal(){
    // document.querySelector('.ConteudoTerminal').innerHTML = ""
    document.querySelectorAll('[class*="mensagem"]').forEach(a=>a.remove())
}

function renderizar(config){
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
            listaHTML = config.lista.map((opcao,index)=>`${config.tipoOpt ? config.tipoOpt : index+1}. ${opcao}`);
            !config.destino && (config.destino = document.querySelector('.Opcoes'));
            classe = "Opcao";

        }else if(config.tipoLista == "itens"){
            listaHTML = config.jogo.jogador.mochila.map((item, index)=>{return {"texto":config.lista[index], "id":item.id}});
            !config.destino && (config.destino = document.querySelector('.Opcoes'));
            elementoListaAdd = `<button onclick="mostrarDetalhesMobile()" class="Mobile DetalheItem">...</button>`
            classe = "Item";
        }

        config.destino.insertAdjacentHTML('afterBegin',`
        <div class="mensagem lista">
            ${config.texto ? `<p id="${idTexto}"></p>` : ``}
            <div class="itensLista" id="${idOpts}">
                
            </div>
        </div>`)
        config.texto && escreveTexto3({texto: config.texto, idDestino: idTexto, classe: classe, jogo:config.jogo}, elementoListaAdd)
        if(config.tipoLista == "itens"){
            escreveTexto3({texto: listaHTML, idDestino: idOpts, classe: classe, action:verItem, jogo:config.jogo}, elementoListaAdd)
        }else{
            escreveTexto3({texto: listaHTML, idDestino: idOpts, classe: classe, jogo:config.jogo}, elementoListaAdd)
        }
            
    }else{
        document.querySelector('.ConteudoTerminal').insertAdjacentHTML('afterBegin',`<div class="mensagem">
            <p id="${idTexto}"></p>
        </div>`)
        escreveTexto3({texto: config.texto, idDestino: idTexto, classe: classe, jogo:config.jogo}, elementoListaAdd)
    }
    
}

function mostrarDetalhesMobile(){
    let popUp = document.getElementById('Mochila-Detalhes')
    
    popUp.style.display = "flex";
    
    setTimeout(() => {
        popUp.insertAdjacentHTML('afterBegin',`
            <div onclick="ocultarDetalhesMobile()" id="btnRemoverPopupMobile" style="display: flex; align-items: center; justify-content: end; width: 100%">x</div>
        `)
    }, 300);
}

function ocultarDetalhesMobile(){
    let popUp = document.getElementById('Mochila-Detalhes')
    popUp.removeAttribute('style');
    document.getElementById('btnRemoverPopupMobile').remove();
}


function verItem(Jogo, elemItem){
    let itemSelecionado = Jogo.jogador.mochila.find(it=>it.id == elemItem.id)
    document.getElementById('Mochila-Detalhes').innerHTML = renderizarDetalhesItens(itemSelecionado);
}

function renderizarDetalhesItens(item){
    return `
        <p>Nome: ${item.nome}</p>
        <p>Quantidade: ${item.qtd}</p>
        <p>Tipo: ${item.tipo}</p>
        <p>Valor: ${item.valor}</p>
    `
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
            let id = new Date().getTime();
            let textoDividido;

            if(config.texto[i].texto){
                textoDividido = config.texto[i].texto.split("");
                
                destino.insertAdjacentHTML('beforeEnd',`${
                    // config.classe ? `<p class="texto ${config.classe}"></p>` : `<p class="texto"></p>`
                    `<p id="${config.texto[i].id}" data-nome="${config.texto[i].texto}" class="texto ${config.classe && config.classe}"></p>`
                }`)
                id = config.texto[i].id
            }else{
                textoDividido = config.texto[i].split("");

                destino.insertAdjacentHTML('beforeEnd',`${
                    // config.classe ? `<p class="texto ${config.classe}"></p>` : `<p class="texto"></p>`
                    `<p id="${id}" data-nome="${config.texto[i]}" class="texto ${config.classe && config.classe}"></p>`
                }`)
    
            }
            
            config.action && document.getElementById(id).addEventListener('click', function(){config.action(config.jogo, this)})


            for (let j = 0; j < textoDividido.length; j++) {
                Array.from(destino.querySelectorAll('p')).at(-1).innerHTML += textoDividido[j];
                await sleep(delay)
            }
            elementoListaAdd && Array.from(destino.querySelectorAll('p')).at(-1).insertAdjacentHTML('beforeEnd', elementoListaAdd);
        }

        debugger
        if(config.texto.length == 0){
            destino.insertAdjacentHTML('beforeEnd',`${
                `<p class="texto"> Vazio...</p>`
            }`)
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

async function abrirSala(Jogo, nova){
    limparTerminal();

    let jogador = Jogo.jogador
    let salaAtual = nova ? new sala(Jogo, nova) : new sala(Jogo);
    let atributo = "simples";
    let save;
    
    SALA = salaAtual;
    //Define o número atual da sala
    salaAtual.numero = nova ? Jogo.sala.numero+1 : Jogo.sala.numero;

    salaAtual.acoes.push({nome:"Abrir mochila", funcao:()=>{abrirMochila(Jogo)}, evento:null})
    
    //Adiciona ação de próxima sala
    salaAtual.acoes.find(a=>a.nome == "Próxima sala") ?
    (salaAtual.acoes.find(a=>a.nome == "Próxima sala").funcao = ()=>{abrirSala(Jogo, true)}) :
    salaAtual.acoes.push({nome:"Próxima sala", funcao:()=>{abrirSala(Jogo, true)}, evento:null})

    
    //Escreve no terminal
    renderizar({
        destino:'',
        texto: `Essa é a sala ${salaAtual.numero}, do tipo ${atributo}, e nela temos: `, 
        lista: salaAtual.eventosSala.length > 0 ? salaAtual.eventosSala.map(e=>e.nome) : ["Nada"],
        tipoOpt: "-",
        tipoLista: "lista",
        jogo: Jogo
    })
    renderizar({
        destino:'',
        texto: `O que deseja fazer agora?`, 
        lista: salaAtual.acoes.map(ac=>ac.nome),
        tipoLista: "opcoes",
        jogo: Jogo
    })
    defineOpcoes(salaAtual, Jogo);
    
    //Salva o jogador atual
    jogador.ultimaSala = salaAtual;
    Jogo.sala = salaAtual;
    save = JSON.parse(localStorage.getItem('PlayerCCData'))
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.ultimaSala = salaAtual)
    save.personagens.filter(p=>p.id == jogador.id).map(p=>p.mochila = jogador.mochila)
    localStorage.setItem('PlayerCCData', JSON.stringify(save))
}

function abrirMochila(Jogo){
    limparTerminal();

    let save;
    let acoes = [
        {nome:"Voltar",
        funcao:()=>{
            document.getElementById('Mochila').remove();
            document.querySelector('.Opcoes').style.display = "flex";
            abrirSala(Jogo, false);
        },
        evento:null}
    ];
    
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
    renderizar({
        destino: document.getElementById('Mochila-Itens'),
        texto: null, 
        lista: Jogo.jogador.mochila.map(i=>i.qtd > 1 ? i.nome+" ("+i.qtd+")" : i.nome),
        tipoOpt: " ",
        tipoLista: "itens",
        jogo: Jogo
    })
    renderizar({
        destino: document.getElementById('Mochila-Equipados'),
        texto: null, 
        lista: Object.keys(Jogo.jogador.equipados).map(esp=>esp+": "),
        tipoOpt: " ",
        tipoLista: "lista",
        jogo: Jogo
    })
    renderizar({
        destino: document.getElementById('Mochila-Acoes'),
        texto: `O que deseja fazer agora?`, 
        lista: acoes.map(a=>a.nome),
        tipoLista: "opcoes",
        jogo: Jogo
    })
    defineOpcoes({acoes: acoes}, Jogo);

    //Salva o jogador atual
    save = JSON.parse(localStorage.getItem('PlayerCCData'))
    save.personagens.filter(p=>p.id == Jogo.jogador.id).map(p=>p.mochila = Jogo.jogador.mochila)
    localStorage.setItem('PlayerCCData', JSON.stringify(save))
}

function defineOpcoes(evento, Jogo){

    let arrayOpcoes = evento.acoes.map((ac)=>{
        return Array.from(document.querySelectorAll(`[class*="Opcao"]`)).find(opt => opt.getAttribute('data-nome').includes(ac.nome))
    })

    if(!arrayOpcoes.includes(undefined)){
        evento.acoes.forEach((acao, index) => {
            // let opcao = Array.from(document.querySelectorAll(`[class*="Opcao"]`)).find(opt => opt.getAttribute('data-nome').includes(acao.nome))
            if(acao.parametro){
                if(acao.evento != null){
                    arrayOpcoes[index].addEventListener('click', ()=>{acao.evento[acao.funcao](acao.parametro.Jogo, acao.parametro.param)})
                }else if(acao.parametro){
                    arrayOpcoes[index].addEventListener('click', ()=>{acao.funcao(acao.parametro.Jogo, acao.parametro.param)})
                }
            }else{
                if(acao.evento != null){
                    arrayOpcoes[index].addEventListener('click', ()=>{acao.evento[acao.funcao](Jogo)})
                }else{
                    arrayOpcoes[index].addEventListener('click', ()=>{acao.funcao(Jogo)})
                }
            }
        });
    }else{
        setTimeout(() => {
            defineOpcoes(evento, Jogo)
        }, 100);
    }

}