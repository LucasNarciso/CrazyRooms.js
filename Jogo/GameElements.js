class sala {
    eventosSala = [];
    acoes = [];
    ambiente = {};

    constructor(sala){
        if(sala){
            this.id = sala.id;
            this.eventosSala = this.instanciarEventos(sala.eventosSala);
            this.ambiente = sala.ambiente;
            this.numero = sala.numero;
        }else{
            this.id = Math.random();
            this.eventosSala = this.definirEventos();
            this.ambiente = this.definirAmbiente();
            this.numero = 1;
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

    instanciarEventos(eventosParametro){
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
        this.ultimaSala = null;
    }

    abrirMochila(){

    }

    pegarItens(itens){
        let evento = this.ultimaSala.eventosSala.find(e=>e.itens.find(i=>i.id == itens[0].id))
        let qtd = itens.length;

        for (let i = 0; i < qtd; i++) {
            let item = itens.at(0)
            this.mochila.push(item)
            itens.splice(itens.map(i=>i.nome).indexOf(item.nome), 1)
            evento.qtdItens--;
        }

        evento.itens = itens;

        abrirSala(this)
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

    abrirBau(jogador){
        let itensFormatados = [];
        let acoes = []
        
        if(!this.aberto){
            this.qtdItens = escolherValor(0, 4);
            this.itens = this.gerarItens();
            this.aberto = true;
            
            if(this.qtdItens == 0){
                this.mensagemUm = mensagens.vazio[escolherValor(0, mensagens.vazio.length-1)];
            }else if(this.qtdItens == 1){
                this.mensagemUm = mensagens.umItem[escolherValor(0, mensagens.umItem.length-1)];
            }else{
                this.mensagemUm = mensagens.cheio[escolherValor(0, mensagens.cheio.length-1)];
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
            acoes.push( {nome:"Coletar item", funcao:"pegarItens", evento:jogador, parametro:this.itens} )
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
            acoes.push( {nome:"Coletar tudo", funcao:"pegarItens", evento:jogador, parametro:this.itens} )
        }else{
            itensFormatados = ["","","",""]
        }

        limparTerminal()

        escreverNoTerminal('jogo', this.mensagemUm, itensFormatados, '-')

        acoes.push( {nome:"Voltar", funcao:abrirSala, evento:null} );

        escreverNoTerminal('jogo',`O que deseja fazer agora?`, acoes.map(a=>a.nome))
        defineOpcoes({acoes: acoes}, jogador);
    }

    gerarItens(){
        let itensGerados = [];

        for (let i = 0; i < this.qtdItens; i++) {
            let tipo = Object.keys(recursos)[escolherValor(0, Object.keys(recursos).length-1)];
            const novoItem = recursos[tipo].itens[escolherValor(0, recursos[tipo].itens.length-1)];
            itensGerados.push(new item(novoItem, recursos[tipo].valor, tipo, recursos[tipo].qtdMax))
        }
        return itensGerados;
    }
}

class item {

    constructor(nome, valor, tipo, qtd){
        let qtdItem = escolherValor(1, qtd);
        this.valor = pesoPonderado(valor[0], valor[1]);
        this.nome = nome;
        this.tipo = tipo;
        this.qtd = qtdItem;
        this.id = Math.random();
    }

}

const eventos = [
    {"nome":"Baú", "classe":bau, "qtdMax":2, "chance":30, "acoes":["abrirBau"]}
    // {nome:"NPC", qtdMax:1, chance:2, acao:npc_conversar()},
    // {nome:"Inimigo", qtdMax:2, chance:4, acao: inimigo_batalhar()},
]