// import { escolherValor } from './GameSystem';
// import { nomeItens } from './GameData';

class sala {
    eventos = []
    ambiente = {}

    constructor(){
        this.eventos = sala_definirEventos();
        this.ambiente = sala_definirAmbiente();
    }
}

class bau {
    nome = "Baú";
    qtdMax = escolherValor(1, 2);
    chance = 7;
    tipo = "";

    // constructor(){
    //     this.itens = this.gerarItens();
    // }

    abrirBau(){
        this.qtdItens = escolherValor(0, 4);
        this.itens = this.gerarItens();

        if(this.qtdItens == 0){
            console.log("O baú está vazio!")
        }else if(this.qtdItens == 1){
            console.log("Bau aberto! Veja o item:")
            console.log(" - ",this.itens[0])
        }else{
            console.log("Bau aberto! Veja os itens:")
            this.itens.map(i=>console.log(" - ",i))
        }
    }

    gerarItens(){
        let itens = [];
        for (let i = 0; i < this.qtdItens; i++) {
            const item = nomeItens[escolherValor(0, nomeItens.length)];
            itens.push(item)
        }
        return itens;
    }
}

class item {
    nome = "";
    valor = "";
}

function sala_definirAmbiente(){

}

function sala_definirEventos(){
    
}