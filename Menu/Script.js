function validarBTNContinuar(){
    let btn = document.getElementById('btnContinuar');
    let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'))

    if(btn && dadosPlayer.ultimoPersonagem != null && dadosPlayer.personagens.includes(dadosPlayer.ultimoPersonagem)){
        btn.disabled = false;
    }else{ setTimeout(validarBTNContinuar, 500) }
}


validarBTNContinuar()