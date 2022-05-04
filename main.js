const X = 'X', O = 'O';
let jogadorAtual;
let tabuleiro;

function validarDiagonal(array, callbackFinalizarJogo){
    if(array[0] == array[4] && array[0] == array[8]) return callbackFinalizarJogo(array[0], [0, 4, 8]);
    return false;
}

function validarDiagonalInversa(array, callbackFinalizarJogo){
    if(array[2] == array[4] && array[2] == array[6]) return callbackFinalizarJogo(array[2], [2, 4, 6]);
    return false;
}

function validarLinhas(array, callbackFinalizarJogo){
    for(let i = 0; i <= 6; i += 3){
        if(array[i] == array[i + 1] && array[i] == array[i + 2]) return callbackFinalizarJogo(array[i], [i, i + 1, i + 2]);
    }
    return false;
}

function validarColunas(array, callbackFinalizarJogo){
    for(let i = 0; i <= 2; i++){
        if(array[i] == array[i + 3] && array[i] == array[i + 6]) return callbackFinalizarJogo(array[i], [i, i + 3, i + 6]);
    }
    return false;
}

function validarEmpate(array){
    for(i of array){
        if(i !== X && i !== O) return false;
    }
    return true;
}

function verificarFimDeJogo(array){
    if( !validarDiagonal(array, finalizarJogo) &&
        !validarDiagonalInversa(array, finalizarJogo) &&
        !validarLinhas(array, finalizarJogo) &&
        !validarColunas(array, finalizarJogo))
    {    
        if(validarEmpate(array)) finalizarJogo(false);
    }
}

function atualizarTabuleiro(array, id){
    array[id] = jogadorAtual;
    document.getElementById(id).textContent = jogadorAtual;
}

function alterarJogadorAtual(){
    if(jogadorAtual === X){
        jogadorAtual = O;
    } else {
        jogadorAtual = X;
    }
    document.getElementById("jogadorAtual").textContent = jogadorAtual;
}

function finalizarJogo(jogador, casas){
    document.getElementById("jogadorAtual").textContent = "";
    if(jogador){
        document.getElementById("jogadorVencedor").textContent = jogador;
        for(i of casas){
            document.getElementById(i).style.backgroundColor = "lightgreen";
        }
    } else {
        document.getElementById("jogadorVencedor").textContent = "Empate";
    }
    jogadorAtual = false;
}

function handleClick(id){
    if(jogadorAtual){
        if(tabuleiro[id] != jogadorAtual){
            atualizarTabuleiro(tabuleiro, id);
            alterarJogadorAtual();
            verificarFimDeJogo(tabuleiro);
        }
    }
}

function inicializarTablueiro(){
    return [...Array(9).keys()]
}

function inicializarJogo(){
    tabuleiro = inicializarTablueiro();
    jogadorAtual = X;
    document.getElementById("jogadorAtual").textContent = jogadorAtual;
    document.getElementById("jogadorVencedor").textContent = "";
    for(let i = 0; i < 9; i++){
        let doc = document.getElementById(i);
        doc.textContent = '-';
        doc.style.backgroundColor = "gray";
    }
}

inicializarJogo();