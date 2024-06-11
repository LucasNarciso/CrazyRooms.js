class sala {
    eventosSala = []
    ambiente = {}

    constructor(){
        this.eventosSala = sala_definirEventos();
        this.ambiente = sala_definirAmbiente();
    }
}

class bau {
    nome = "Baú";
    qtdMax = escolherValor(1, 2);
    chance = 7;
    tipo = "";
    aberto = false;

    // constructor(){}

    abrirBau(){
        if(!this.aberto){
            this.qtdItens = escolherValor(0, 4);
            this.itens = this.gerarItens();

            if(this.qtdItens == 0){
                limparTerminal()
                escreverNoTerminal('jogo', mensagens.azar[escolherValor(0, mensagens.azar.length-1)])
                escreverNoTerminal('jogo', mensagens.vazio[escolherValor(0, mensagens.vazio.length)])

                escreverNoTerminal('jogo',`O que deseja fazer agora?`, ['Abrir o iventário', 'Próxima sala'])
            }else if(this.qtdItens == 1){
                limparTerminal()
                escreverNoTerminal('jogo', mensagens.felicitacoes[escolherValor(0, mensagens.felicitacoes.length-1)])
                escreverNoTerminal('jogo', mensagens.umItem[escolherValor(0, mensagens.umItem.length)], [this.itens[0].nome + ` (${this.itens[0].qtd})`], '-')

                // escreverNoTerminal('jogo', `- `+this.itens[0].nome + ` (${this.itens[0].qtd})`)

                escreverNoTerminal('jogo',`O que deseja fazer agora?`, ['Abrir o iventário', 'Próxima sala'])
            }else{
                limparTerminal()
                let itensFormat = this.itens.map(i=>i.nome + ` (${i.qtd})`)
                escreverNoTerminal('jogo', mensagens.felicitacoes[escolherValor(0, mensagens.felicitacoes.length-1)])
                escreverNoTerminal('jogo', mensagens.cheio[escolherValor(0, mensagens.cheio.length)], itensFormat, '-')
                // escreverNoTerminal('jogo', 'Bau aberto! Veja os itens:', itensFormat, '-')

                escreverNoTerminal('jogo',`O que deseja fazer agora?`, ['Abrir o iventário', 'Próxima sala'])
            }
            
            this.aberto = true;
        }else{
            console.log("Esse baú ja foi aberto!")
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
}

class item {

    constructor(nome, valor, tipo, qtd){
        console.log("Valor Item: ", tipo)
        this.valor = pesoPonderado(valor[0], valor[1]);
        this.nome = nome;
        this.tipo = tipo;
        this.qtd = escolherValor(1, qtd);
    }

}

function sala_definirAmbiente(){
    
}

function sala_definirEventos(){
    let eventoEscolhido = eventos[escolherValor(0, eventos.length-1)];
    if(eventoEscolhido.nome == "Baú"){
        return [new bau()];
    }
}