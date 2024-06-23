class sala {
    eventosSala = [];
    acoes = [];
    ambiente = {};

    constructor(){
        this.id = Math.random();
        this.eventosSala = this.definirEventos();
        this.ambiente = this.definirAmbiente();
    }

    definirAmbiente(){
    
    }
    
    definirEventos(){
        let eventosEscolhidos = []
        eventos.forEach((evento, index)=>{
            for (let i = 0; i < evento.qtdMax; i++) {
                if(escolherValor(0, 100) < evento.chance){
                    eventosEscolhidos.push(new evento.classe)
                    for (let j = 0; j < evento.acoes.length; j++) {
                        this.acoes.push({nome:`Abrir ${eventosEscolhidos.at(-1).nome}`,funcao:evento.acoes[j], evento:eventosEscolhidos.at(-1)})
                    }
                }
            }
        })

        return eventosEscolhidos;
    }
}

class bau {
    // tipo = "";
    aberto = false;

    constructor(){
        this.id = Math.random();
        this.nome = "Baú " + cores[escolherValor(0, cores.length-1)];
    }

    abrirBau(sala){

        if(!this.aberto){
            this.qtdItens = escolherValor(0, 4);
            this.itens = this.gerarItens();

            if(this.qtdItens == 0){
                limparTerminal()
                escreverNoTerminal('jogo', mensagens.azar[escolherValor(0, mensagens.azar.length-1)])
                escreverNoTerminal('jogo', mensagens.vazio[escolherValor(0, mensagens.vazio.length-1)])
            }else if(this.qtdItens == 1){
                limparTerminal()

                let itemFormatado = (this.itens[0].qtd == 1 ? (this.itens[0].nome) : (this.itens[0].nome + ` (${this.itens[0].qtd})`))

                escreverNoTerminal('jogo', mensagens.felicitacoes[escolherValor(0, mensagens.felicitacoes.length-1)])
                escreverNoTerminal('jogo', mensagens.umItem[escolherValor(0, mensagens.umItem.length-1)], [itemFormatado], '-')
            }else{
                limparTerminal()

                let itensFormatados = this.itens.map((i)=>{ return i.qtd == 1 ? i.nome : i.nome + ` (${i.qtd})` })

                escreverNoTerminal('jogo', mensagens.felicitacoes[escolherValor(0, mensagens.felicitacoes.length-1)])
                escreverNoTerminal('jogo', mensagens.cheio[escolherValor(0, mensagens.cheio.length-1)], itensFormatados, '-')
            }

            this.limparSala(sala);
            let acaoNome = this.qtdItens > 1 ? 'Coletar itens' : this.qtdItens == 0 ? 'Voltar' : 'Coletar Item'
            escreverNoTerminal('jogo',`O que deseja fazer agora?`, [acaoNome])
            defineOpcoes([{nome:acaoNome, funcao:()=>{abrirSala(sala)}, evento:null}], sala);
            this.aberto = true;

        }else{
            this.limparSala(sala);
            escreverNoTerminal('jogo',`Esse baú ja foi aberto!`, ["Voltar"])
            defineOpcoes([{nome:"Voltar", funcao:()=>{abrirSala(sala)}, evento:null}], sala);
        }
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

    limparSala(sala){
        sala.eventosSala.splice(sala.eventosSala.indexOf(this), 1); //LIMPA O EVENTO ATUAL DA SALA
        sala.acoes.splice(sala.acoes.indexOf(sala.acoes.find(a=>a.evento.id == this.id)), 1) //LIMPA A AÇÃO DO EVENTO ATUAL DA SALA
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
    {"Nome":"Báu", "classe":bau, "qtdMax":2, "chance":30, "acoes":["abrirBau"]}
    // {nome:"NPC", qtdMax:1, chance:2, acao:npc_conversar()},
    // {nome:"Inimigo", qtdMax:2, chance:4, acao: inimigo_batalhar()},
]