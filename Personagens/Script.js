function renderizaPersonagens(){
    let ultimoPersonagem = JSON.parse(localStorage.getItem('PlayerCCData')).ultimoPersonagem;
    let personagens = JSON.parse(localStorage.getItem('PlayerCCData')).personagens;

    document.querySelector('#botoes').innerHTML = ""

    for (let i = 0; i < 6; i++) {
        let personagem = personagens.find(p=>p.id == parseInt(i+1));

        if(personagem){
            document.querySelector('#botoes').insertAdjacentHTML('beforeend',`
                <button value="${personagem.id}" class="botaoCheio personagem ${personagem.nome}">${personagem.nome}</button>
            `)
        }else{
            document.querySelector('#botoes').insertAdjacentHTML('beforeend',`
                <button value="${i+1}" class="botaoCheio personagem vazio"></button>
            `)
        }
    }

    //Adiciona evento de clique para criar novo personagem
    Array.from(document.querySelectorAll('.vazio')).forEach(a=>a.addEventListener('click',function(){novoPersonagem(this)}))
    Array.from(document.querySelectorAll('[class*="personagem"]:not([class*="vazio"])')).forEach(a=>a.addEventListener('click',function(){escolherPersonagem(this)}))
    
    //Adiciona a contagem de personagens 
    atualizaQtdPersonagens();
}

function novoPersonagem(espacoBranco){
    let popUp = mostrarPopUp(`
        <p>Nome do personagem</p>
        <input class="campoPadrao" maxLength="18" id="inputNomePopUpAdd" type="text">
        <div id="botoesPopUpAdd">
            <button id="btnCancelarPopUp" class="botaoPadrao">Cancelar</button>
            <button id="btnCriarPopUp" class="botaoPadrao">Criar</button>
        </div>
    `)

    document.getElementById('btnCancelarPopUp').addEventListener('click', function(){fecharPopUp(popUp)})
    document.getElementById('btnCriarPopUp').addEventListener('click', function(){
        let nome = document.getElementById('inputNomePopUpAdd').value;
        let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'));

        let nomeIgual = dadosPlayer.personagens.find(p=>p.nome == nome)
        if(nome && !nomeIgual){
            dadosPlayer.personagens.push({
                "id": parseInt(espacoBranco.value),
                "nome": `${nome}`,
                "mochila": [],
                "ultimaSala": null
            })
            localStorage.setItem('PlayerCCData', JSON.stringify(dadosPlayer));
            fecharPopUp(popUp);
            renderizaPersonagens();
            mostrarToast("Personagem criado!")
        }else if(nome && nomeIgual){
            mostrarToast('Esse nome já está sendo usado!')
        }else{
            mostrarToast('O personagem precisa de um nome!')
        }
    })
}

function escolherPersonagem(personagem){
    let popUp = mostrarPopUp(`
        <p>O que deseja fazer o personagem?</p>
        </br>
        <div id="botoesPopUpAdd">
            <button id="btnJogarPopUp" class="botaoPadrao">Jogar</button>
            <button id="btnExcluirPopUp" class="botaoPadrao">Excluir</button>
            <button id="btnCancelarPopUp" class="botaoPadrao">Cancelar</button>
        </div>
    `)
    
    document.getElementById('btnCancelarPopUp').addEventListener('click', function(){fecharPopUp(popUp)})
    document.getElementById('btnJogarPopUp').addEventListener('click', function(){
        let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'));
        dadosPlayer.ultimoPersonagem = personagem.value;
        localStorage.setItem('PlayerCCData', JSON.stringify(dadosPlayer))
        fecharPopUp(popUp)
        goOn('ir', "jogo")
    })
    document.getElementById('btnExcluirPopUp').addEventListener('click', function(){
        let conteudoPopUp = document.getElementById(popUp).children[0];
        let intervaloTextoBotao, tempoBtnExcluir;

        //Insere um "PopUp Interno" para validar a exclusão do personagem
        conteudoPopUp.insertAdjacentHTML('beforeEnd',`
            <div id="ConfirmaDelete" class="DivConteudoPopUp" style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; box-shadow: none;">
                <p>Digite "Delete" para excluir o personagem:</p>
                </br>
                <div id="botoesPopUpAdd">
                    <input id="campoCONFIRMA" style="height: 30px" class="campoPadrao"></input>
                    <button id="btnCancelarCONFIRMA" class="botaoPadrao">Cancelar</button>
                    <button id="btnExcluirCONFIRMA" class="botaoPadrao">Excluir</button>
                </div>
            </div>
        `)

        document.getElementById('btnCancelarCONFIRMA').addEventListener('click',()=>{
            document.getElementById('ConfirmaDelete').remove()
        })

        // document.getElementById('btnExcluirCONFIRMA').addEventListener('mousedown', function(event){

        //     if (event.buttons == 1){
        //         intervaloTextoBotao = setInterval(()=>{
        //             let segundos = this.innerHTML.split(" ")[2]
        //             this.innerHTML = "Excluindo em " + (parseInt(segundos.split("")[0])-1) + "s"
        //         }, 1000);
    
        //         this.innerHTML = "Excluindo em 3s"
        //         this.style.width = "120px";
    
        //         tempoBtnExcluir = setTimeout(() => {
        //             let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'));
    
        //             dadosPlayer.personagens.splice(
        //                 dadosPlayer.personagens.indexOf(dadosPlayer.personagens.find(p=>p.id == personagem.value)), 1
        //             )
            
        //             localStorage.setItem('PlayerCCData', JSON.stringify(dadosPlayer));
        //             fecharPopUp(popUp);
        //             renderizaPersonagens();
        //         }, 3000);
        //     }else{
        //         clearTimeout(tempoBtnExcluir);
        //         clearTimeout(intervaloTextoBotao);
        //     }

        // });

        document.getElementById('btnExcluirCONFIRMA').addEventListener('mousedown', function(){

            let campo = document.getElementById(`campoCONFIRMA`);
            if(campo.value == "Delete"){
                let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'));
    
                dadosPlayer.personagens.splice(
                    dadosPlayer.personagens.indexOf(dadosPlayer.personagens.find(p=>p.id == personagem.value)), 1
                )
        
                localStorage.setItem('PlayerCCData', JSON.stringify(dadosPlayer));
                fecharPopUp(popUp);
                renderizaPersonagens();
                mostrarToast("Personagem Excluido!")
            }else{
                mostrarToast("Digite a palavra certa!")
            }

        });

    
        document.getElementById('btnExcluirCONFIRMA').addEventListener('mouseup', function(){
            clearTimeout(tempoBtnExcluir);
            clearTimeout(intervaloTextoBotao);
            this.innerHTML = "Excluir"
            this.style.width = "100px";
        });
    
        document.getElementById('btnExcluirCONFIRMA').addEventListener('mouseout', function(){
            clearTimeout(tempoBtnExcluir);
            clearTimeout(intervaloTextoBotao);
            this.innerHTML = "Excluir"
            this.style.width = "100px";
        });
    })
}

function atualizaQtdPersonagens(){
    let personagens = JSON.parse(localStorage.getItem('PlayerCCData')).personagens;
    document.querySelector('.Quantidade').innerHTML = `${personagens.filter(p=>p.nome!="").length} / 6`
}

function iniciar(){ document.body ? renderizaPersonagens() : setTimeout(iniciar, 100) }
iniciar()