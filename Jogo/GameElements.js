class jogo {

    constructor(jogador, sala){
        this.jogador = jogador;
        this.sala = sala;
    }
}

class sala {
    eventosSala = [];
    acoes = [];
    ambiente = {};
    cores = [];

    
    constructor(Jogo, nova){
        let salaAtual = Jogo.sala;

        if(nova){
            this.id = Math.random();
            this.eventosSala = this.definirEventos();
            this.ambiente = this.definirAmbiente();
            this.numero = 1;
            this.cores = Jogo.jogador.dataset.cores;
        }else{
            this.id = salaAtual.id;
            this.eventosSala = this.instanciarEventos(Jogo, salaAtual.eventosSala);
            this.ambiente = salaAtual.ambiente;
            this.numero = salaAtual.numero;
            this.cores = salaAtual.cores;
        }
    }

    definirAmbiente(){
    
    }
    
    definirEventos(){
        let eventosEscolhidos = []

        eventos.forEach((evento)=>{
            for (let i = 0; i < evento.qtdMax; i++) {
                if(escolherValor(0, 100) < evento.chance){
                    eventosEscolhidos.push(new evento.classe())
                    for (let j = 0; j < evento.acoes.length; j++) {
                        if(evento.nome == "Baú"){
                            this.acoes.push({nome:`Abrir ${eventosEscolhidos.at(-1).nome}`,funcao:evento.acoes[j], evento:eventosEscolhidos.at(-1)})
                        }
                    }
                }
            }
        })

        return eventosEscolhidos;
    }

    instanciarEventos(Jogo, eventosParametro){
        let eventosEscolhidos = []

        eventosParametro.forEach((evento)=>{
            let novoEvento = eventos.find(e=>e.nome == evento.tipoEvento)
            eventosEscolhidos.push(new novoEvento.classe(evento))
            for (let j = 0; j < novoEvento.acoes.length; j++) {
                if(novoEvento.nome == "Baú"){
                    this.acoes.push({nome:`Abrir ${eventosEscolhidos.at(-1).nome}`,funcao:novoEvento.acoes[j], evento:eventosEscolhidos.at(-1)})
                }
            }
    
        })

        return eventosEscolhidos;
    }
}

class jogador {
    constructor(jogador){
        this.nome = jogador.nome;
        this.id = jogador.id;
        this.mochila = jogador.mochila;
        this.equipados = jogador.equipados;
        this.ultimaSala = null;
        this.dataset = JSON.parse(jogador.dataset);
    }

    pegarItens(Jogo, itens){
        let evento = Jogo.sala.eventosSala.find(e=>e.itens.find(i=>i.id == itens[0].id))
        let qtd = 0;
        if(itens.length == 0){
            qtd = 1
        }else{ qtd = itens.length}

        for (let i = 0; i < qtd; i++) {
            let item = itens.at(0)
            if(item != null){
                this.mochila.push(item)
                itens.splice(itens.map(i=>i.nome).indexOf(item.nome), 1)
                evento.qtdItens--;
            }
        }

        evento.itens = itens;

        abrirSala(Jogo, false);
    }
}

class bau {
    // tipo = "";
    aberto = false;
    tipoEvento = "Baú";
    
    constructor(bau){
        if(bau){
            this.id = bau.id;
            this.nome = bau.nome;
            bau.itens && (this.itens = bau.itens);
            this.aberto = bau.aberto;
            this.qtdItens = bau.qtdItens;
            this.mensagemUm = bau.mensagemUm;
        }else{
            this.id = Math.random();
            this.nome = "Baú " + cores[escolherValor(0, cores.length-1)];
            this.mensagemUm = "";
        }
    }

    abrirBau(Jogo){
        let jogador = Jogo.jogador;
        let itensFormatados = [];
        let acoes = []
        
        if(!this.aberto){
            this.qtdItens = escolherValor(0, 4);
            this.itens = this.gerarItens(Jogo);
            this.aberto = true;
            
            if(this.qtdItens == 0){
                this.mensagemUm = jogador.dataset.mensagens.vazio[escolherValor(0, jogador.dataset.mensagens.vazio.length-1)];
            }else if(this.qtdItens == 1){
                this.mensagemUm = jogador.dataset.mensagens.umItem[escolherValor(0, jogador.dataset.mensagens.umItem.length-1)];
            }else{
                this.mensagemUm = jogador.dataset.mensagens.cheio[escolherValor(0, jogador.dataset.mensagens.cheio.length-1)];
            }
        }
        
        if(this.itens.length > 0 && this.qtdItens == 1){
            // itensFormatados = [this.itens[0].nome]
            for (let i = 0; i < 4; i++) {
                let item;
                if(this.itens[i]){
                    item = this.itens[i] ? (this.itens[i].qtd == 1 ? this.itens[i].nome : (this.itens[i].nome + ` (${this.itens[i].qtd})`)) : ""
                }else{
                    item = ""
                }
                itensFormatados.push(item)
            }
            acoes.push( {nome:"Coletar item", funcao:"pegarItens", evento:jogador, parametro:{Jogo: Jogo, param:this.itens}} )
        }else if(this.itens.length > 0){
            // itensFormatados = this.itens.map((i)=>{ return i.qtd == 1 ? i.nome : i.nome + ` (${i.qtd})` })
            for (let i = 0; i < 4; i++) {
                let item;
                if(this.itens[i]){
                    item = this.itens[i] ? (this.itens[i].qtd == 1 ? this.itens[i].nome : (this.itens[i].nome + ` (${this.itens[i].qtd})`)) : ""
                }else{
                    item = ""
                }
                itensFormatados.push(item)
            }
            acoes.push( {nome:"Coletar tudo", funcao:"pegarItens", evento:jogador, parametro:{Jogo: Jogo, param:this.itens}} )
        }else{
            itensFormatados = ["","","",""]
        }

        limparTerminal()

        renderizar({
            texto: this.mensagemUm, 
            lista: itensFormatados,
            tipoOpt: "-",
            tipoLista: "lista"
        })

        acoes.push( {nome:"Voltar", funcao:()=>{abrirSala(Jogo, false)}, evento:null} );

        renderizar({
            texto: `O que deseja fazer agora?`, 
            lista: acoes.map(a=>a.nome),
            tipoLista: "opcoes"
        })

        defineOpcoes({acoes: acoes}, jogador);

        //Atualizando Baú da Sala
        Jogo.sala.eventosSala[Jogo.sala.eventosSala.indexOf(Jogo.sala.eventosSala.find(e=>e.nome == this.nome))] = this;
    }

    gerarItens(Jogo){
        let jogador = Jogo.jogador;
        let itensGerados = [];
        console.log(jogador)
        for (let i = 0; i < this.qtdItens; i++) {
            let tipo = Object.keys(jogador.dataset.recursos.tipos)[escolherValor(0, Object.keys(jogador.dataset.recursos.tipos).length-1)];
            const novoItem = jogador.dataset.recursos.tipos[tipo].itens[escolherValor(0, jogador.dataset.recursos.tipos[tipo].itens.length-1)];
            itensGerados.push(new item(novoItem, jogador.dataset.recursos.tipos[tipo].valor, tipo, jogador.dataset.recursos.tipos[tipo].qtdMax))
        }
        return itensGerados;
    }
}

class item {

    constructor(nome, valores, tipo, qtd){
        this.id = Math.random();
        this.nome = nome;
        this.qtd = escolherValor(1, qtd);
        this.valor = pesoPonderado(valores[0], valores[1]);
        this.tipo = tipo;
        this.filtro = ["id"];
    }
}

const eventos = [
    {"nome":"Baú", "classe":bau, "qtdMax":2, "chance":30, "acoes":["abrirBau"]}
    // {nome:"NPC", qtdMax:1, chance:2, acao:npc_conversar()},
    // {nome:"Inimigo", qtdMax:2, chance:4, acao: inimigo_batalhar()},
]