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
        <div style="display:flex; flex-direction:column; align-items: start; gap:5px">
            Aventura:
            <div style="display: flex; gap: 10px; width: 100%;">
                <label for="inputAvPadrao">
                    <input id="inputAvPadrao" class="inputRadio" type="radio" name="tipoAventura" value="padrao" checked>
                    Padrão
                </label>
                <label for="inputAvPersonalizada">
                    <input id="inputAvPersonalizada" class="inputRadio" type="radio" name="tipoAventura" value="personalizado">
                    Personalizada
                </label>
                <input type="hidden" id="dataset">
            </div>
            <div id="DivArquivo" style="display:none;">
                <label id="BtnEnviarArquivo">
                    <input type="file" id="inputJSON" accept=".json">
                    Enviar dataset
                </label>
                <pre id="outputFile"></pre>
            </div>
        </div>
        <div id="botoesPopUpAdd">
            <button id="btnCancelarPopUp" class="botaoPadrao">Cancelar</button>
            <button id="btnCriarPopUp" class="botaoPadrao">Criar</button>
        </div>
    `)

    document.getElementById('btnCancelarPopUp').addEventListener('click', function(){fecharPopUp(popUp)})
    document.getElementById('btnCriarPopUp').addEventListener('click', async function(){
        let nome = document.getElementById('inputNomePopUpAdd').value;
        let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'));
        let nomeIgual = dadosPlayer.personagens.find(p=>p.nome == nome)
        let inputJson = document.getElementById('inputJSON');
        let inputAventura = document.querySelector('[name="tipoAventura"]:checked');
        let dataset = document.getElementById('dataset').value;

        if(dataset == "" && inputAventura.value == "padrao"){

            let json = await fetch('../Datasets/DatasetPadrao.json')
                .then((response) => response.json())
                .then((json) => json);
            await lerDataset(json)

        }

        if(nome && !nomeIgual){
            if(inputJson.value == "" && inputAventura.value == "personalizado"){
                mostrarToast('Selecione um dataset!')
            }else {
                dadosPlayer.personagens.push({
                    "id": parseInt(espacoBranco.value),
                    "nome": `${nome}`,
                    "mochila": [],
                    "equipados": {
                        "Arma":"",
                        "Armadura":"",
                        "Arremesso":"",
                        "Artefato 1":"",
                        "Artefato 2":""
                    },
                    "dataset":document.getElementById('dataset').value,
                    "ultimaSala": null
                })
                localStorage.setItem('PlayerCCData', JSON.stringify(dadosPlayer));
                fecharPopUp(popUp);
                renderizaPersonagens();
                mostrarToast("Personagem criado!")
            }
        }else if(nome && nomeIgual){
            mostrarToast('Esse nome já está sendo usado!')
        }else{
            mostrarToast('O personagem precisa de um nome!')
        }
    })

    document.getElementById('inputJSON').addEventListener('change', async function(event) {
        let file = event.target.files[0];
        let inputAventura = document.querySelector('[name="tipoAventura"]:checked');

        if (file && inputAventura.value == "personalizado") {
            const reader = new FileReader();
            reader.onload = async function(e) {
                try {
                    const json = JSON.parse(e.target.result);
                    if(await lerDataset(json)){
                        document.getElementById('outputFile').textContent = "Arquivo validado com sucesso!";
                    }else{
                        document.getElementById('outputFile').textContent = "Arquivo invalido!";
                        document.getElementById('inputJSON').value = "";
                    }
                } catch (err) {
                    document.getElementById('outputFile').textContent = 'Erro ao ler o arquivo JSON: ' + err.message;
                    document.getElementById('inputJSON').value = "";
                }
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('inputAvPadrao').addEventListener('click',()=>{
        document.getElementById('DivArquivo').style.display = "none";
    })
    document.getElementById('inputAvPersonalizada').addEventListener('click',()=>{
        document.getElementById('DivArquivo').style.display = "flex";
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

async function lerDataset(json){

    let analise = false;

    if(
        json.recursos.armamento &&
        json.recursos.municao &&
        json.recursos.explosivo &&
        json.recursos.consumivel &&
        json.recursos.protecao &&
        json.recursos.artefato &&
        json.recursos.mistico &&
        json.mensagens &&
        json.cores
    ){
        console.log("Esse é o conteudo do arquivo enviado: ")
        console.log(json)
        analise = true;
        document.getElementById('dataset').value = JSON.stringify(json)
    }else{
        analise = false;
    }
    return analise
}

function iniciar(){ document.body ? renderizaPersonagens() : setTimeout(iniciar, 100) }
iniciar()