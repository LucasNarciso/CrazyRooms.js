function validarBTNContinuar(){
    let btn = document.getElementById('btnContinuar');
    let dadosPlayer = JSON.parse(localStorage.getItem('PlayerCCData'))

    if(btn && dadosPlayer.ultimoPersonagem != null && dadosPlayer.personagens.find(p=>p.id == dadosPlayer.ultimoPersonagem)){
        btn.disabled = false;
    }else{ setTimeout(validarBTNContinuar, 500) }
}


validarBTNContinuar()