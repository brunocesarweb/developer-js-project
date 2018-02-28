const criaController = jogo => {
    
    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
        
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = texto => {
        $entrada
            .val('')
            .attr('placeholder', texto);
    };

    const guardaPalavraSecreta = () => {

        try {
            // passa para o jogo o chute digitado pelo usuário
            jogo.setPalavraSecreta($entrada.val().trim());
            // limpa o campo de entrada
            $entrada.val('');
            // exibe para o usuário as lacunas de jogo.getLacunas();
            exibeLacunas();
            // muda o texto do placeholder para `chute`.
            mudaPlaceHolder('chute');
        } catch (error) {
            alert(error.message);
        }
    };

    const leChute = () => {

        try {
            let chute = $entrada.val().trim().substr(0, 1);
            $entrada.val('');
            jogo.processaChute(chute);
            exibeLacunas();
    
            if (jogo.ganhouOuPerdeu()) {
    
                setTimeout( () => {
                    if (jogo.ganhou()) {
                        alert('Parabéns você ganhou!');
                    } else if (jogo.perdeu()) {
                        alert('Uma pena, tente novamente!');
                    }
                    jogo.reinicia();
                    reinicia();
                }, 200);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const reinicia = () => {

        $lacunas.empty();
        mudaPlaceHolder('Palavra secreta');
        jogo.reinicia();
    };

    const inicia = () => {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    return { inicia };
};