//Leva o usuário para uma página específica
function goOn(voltar, page){

    switch (page) {
        case "menu":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Menu"
            }, 200);
            break;
        case "personagens":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Personagens"
            }, 200);
            break;
        case "jogo":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Jogo"
            }, 200);
            break;
        case "opcoes":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href = "/CrazyRooms.js/Opcoes"
            }, 200);
            break;
        case "sobre":
            document.querySelector('.conteiner').classList.add('slideOut')
            setTimeout(() => {
                window.location.href =  "/CrazyRooms.js/Sobre"
            }, 200);
            break;
        default:
            break;
    }
}

function mostrarPopUp(conteudoHTML){
    let id = Math.random();
    document.body.insertAdjacentHTML('beforeEnd',`
        <div id="${id}" class="DivGlobalPopUp">
            <div class="DivConteudoPopUp">
            ${conteudoHTML}
            </div>
        </div>
    `)
    return id;
}

function fecharPopUp(id){
    let elemento = document.getElementById(id);
    if(elemento){ elemento.remove() }
}

function verificaDataPlayer(){
    let dadosPlayer = localStorage.getItem("PlayerCCData")
    if(dadosPlayer == null){
        localStorage.setItem('PlayerCCData',JSON.stringify({
            ultimoPersonagem: null,
            personagens:[
                // {id: 1, nome:"Personagem 1", inventario:[], salaAtual:0}
            ]
        }))
    }
}

function mostrarToast(msg){
    let id = Math.random()
    let toastExistente = document.querySelector(".DivGlobalToast");

    if(toastExistente && toastExistente.querySelector('p').innerText == msg){
        toastExistente.style.animation = "";
        setTimeout(()=>{toastExistente.style.animation = "0.1s ease-in-out 0s 1 normal forwards running chacoalhar";}, 100)
    }else{
        document.body.insertAdjacentHTML('beforeEnd',`
            <div id="${id}" class="DivGlobalToast">
                <div class="DivConteudoToast">
                    <p class="MsgToast">
                    ${msg}
                </p>
                </div>
            </div>
        `)
    
        setTimeout(() => {
            let toast = document.getElementById(id)
            if(toast){ 
                toast.style.animation = "slideOut 0.3s ease-in-out forwards";
                setTimeout(()=>{toast.remove()}, 300)
            }
        }, 2000);
    }
    
}

verificaDataPlayer();