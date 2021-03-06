//Implementação do ECMAScript 6

//Quando a function tiver 1 parametro não é necessário usar o () como arrow function
//O atributo const é usado quando seu valor não sofre alteração, o let é uma variável de escopo
/*
Conceitos introduzidos: const, let, arrow functions
*/

const criaJogo = sprite => {
    
    let etapa = 1;
    let lacunas = [];
    let palavraSecreta = '';

    //Algumas functions podem ser resumidas
    const ganhou = () => !lacunas.some(lacuna => lacuna == '');

    const perdeu = () => sprite.isFinished();

    const ganhouOuPerdeu = () => ganhou() || perdeu();
    
    const reinicia = () => {

        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
    };

    const processaChute = chute => {

        if (!chute.trim()) throw Error('Chute inválido');

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
    const criaLacunas = () => {
        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
        }
        //Outra forma de criar lacunas
        //lacunas = Array(palavraSecreta.length).fill('');
    };

    // muda o estado da variável etapa para indicar a próxima e última etapa
    const proximaEtapa = () => etapa = 2;

    // guarda a palavra secreta, cria as lacunas e vai para a próxima etapa
    const setPalavraSecreta = palavra =>  {

        if( !palavra.trim()) throw Error('Palavra secreta inválida');
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    // única maneira de termos acesso às lacunas fora da função `criaJogo()`
    const getLacunas = () => lacunas;

    // permite consultar em qual etapa o jogo se encontra
    const getEtapa = () => etapa;

    /* 
    Tornou acessível apenas as funções que fazem sentido serem chamadas por quem utilizar nosso jogo. 
        A função `proximaEtapa()` é de uso interno e só foi criada para melhorar a legibilidade e manutenção do código, a 
        mesma coisa para a função `criaLacunas()`. 
    */ 
    //No return como é um objeto com chave e valor com o mesmo nome omite-se o ": nomeValor"   
    return {
        setPalavraSecreta,
        getLacunas,
        getEtapa,
        processaChute,
        ganhou,
        perdeu,
        ganhouOuPerdeu,
        reinicia
    }
};