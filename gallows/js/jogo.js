var criaJogo = function (sprite) {
    
    var etapa = 1;
    var lacunas = [];
    var palavraSecreta = '';

    var ganhou = function(){

        //A função some irá returnar true ou false, caso alguma lacuna esteja vazia ele para de varrer o array e retorna false
        return lacunas.length
        ? !lacunas.some(function(lacuna){
            return lacuna == '';
        })
        : false;
    };

    var perdeu = function () {
        
        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function(){
        return ganhou() || perdeu();
    };
    
    var reinicia = function(){

        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    var processaChute = function(chute){
        var exp = new RegExp(chute, 'gi'), 
        resultado, 
        acertou = false

        while (resultado = exp.exec(palavraSecreta)) {
        
            acertou = lacunas[resultado.index] = chute;
        }

        if (!acertou) {
        
            sprite.nextFrame();
        }
    }; 

    // adiciona uma lacuna em branco para cada letra da palavraSecreta
    var criaLacunas = function () {
        // for (let i = 0; i < palavraSecreta.length; i++) {
        //     lacunas.push('');
        // }
        //Outra forma de criar lacunas
        lacunas = Array(palavraSecreta.length).fill('');
    };

    // muda o estado da variável etapa para indicar a próxima e última etapa
    var proximaEtapa = function () {

        etapa = 2;
    };

    // guarda a palavra secreta, cria as lacunas e vai para a próxima etapa
    var setPalavraSecreta = function (palavra) {

        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    // única maneira de termos acesso às lacunas fora da função `criaJogo()`
    var getLacunas = function () {

        return lacunas;
    };

    // permite consultar em qual etapa o jogo se encontra
    var getEtapa = function () {

        return etapa;
    };

    /* 
    Tornou acessível apenas as funções que fazem sentido serem chamadas por quem utilizar nosso jogo. 
        A função `proximaEtapa()` é de uso interno e só foi criada para melhorar a legibilidade e manutenção do código, a 
        mesma coisa para a função `criaLacunas()`. 
    */    
    return {
        setPalavraSecreta: setPalavraSecreta, 
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu,
        reinicia: reinicia
    }
};