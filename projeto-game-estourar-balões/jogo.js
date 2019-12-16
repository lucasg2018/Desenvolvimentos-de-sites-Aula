var timerid = null; //variavel que armazena a chaamda da função TimeOut

function iniciarjogo(){
    var url = window.location.search;

    var nivel_jogo = url.replace("?", "");

    var tempo = 0;

    if(nivel_jogo == 1){//Fácil -> 120 segundos
        tempo = 120;
    }
    else if(nivel_jogo == 2){//Normal -> 60 segundos
        tempo = 60;
    }
    else{//Difícil -> 30 segundos
        tempo = 30;
    }
    
    //tempo
    document.getElementById("cronometro").innerHTML = tempo;

    //Quantidade de balões
    var qtd_baloes = 80;
    criar_baloes(qtd_baloes);

    //Imprimir qtd baloes inteiros
    document.getElementById("baloes_inteiros").innerHTML = qtd_baloes;
    document.getElementById("baloes_estourados").innerHTML = 0;

    contagem_tempo(tempo + 1);
}

//Criando os Balões
function criar_baloes(qtd_baloes){

    for(var i = 1;i <= qtd_baloes; i++){

        var balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
        balao.style.margin = "11px"
        balao.id = 'b' + i;
        balao.onclick = function(){ estourar(this); }

        document.getElementById("cenario").appendChild(balao);
    
    }
}

function estourar(e){
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick","");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

    pontuacao(-1);
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
    var baloes_estourados = document.getElementById("baloes_estourados").innerHTML;

    baloes_inteiros = parseFloat(baloes_inteiros);
    baloes_estourados = parseFloat(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados++;
    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros, baloes_estourados);
}

function situacao_jogo(inteiros, estourados){
    if(inteiros == 0){
        alert("Você ganhou!");
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerid);
    window.location.href = "index.html";
}

//Criando a contagem
function contagem_tempo(segundos){

    segundos = segundos - 1;
    
    if(segundos == -1){
        clearTimeout(timerid);
        gameover();
        return false;
    }

    document.getElementById("cronometro").innerHTML = segundos;

    timerid = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function gameover(){
    alert("Fim de jogo, você não conseguiu estourar todos os balões a tempo");
    parar_jogo();
}
