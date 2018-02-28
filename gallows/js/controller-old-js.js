var criaController = function (jogo) {
    
        var $entrada = $('#entrada');
        var $lacunas = $('.lacunas');
    
        var exibeLacunas = function () {
            
            $lacunas.empty();
            jogo.getLacunas().forEach(function (lacuna) {
                $('<li>')
                    .addClass('lacuna')
                    .text(lacuna)
                    .appendTo($lacunas);
            });
        };
    
        var mudaPlaceHolder = function (texto) {
    
            $entrada
            .val('')
            .attr('placeholder', texto);
        };
    
        var guardaPalavraSecreta = function () {
    
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
    
        var leChute = function(){

            try {
                var chute = $entrada.val().trim().substr(0, 1);
                $entrada.val('');
                jogo.processaChute(chute);
                exibeLacunas();
        
                if (jogo.ganhouOuPerdeu()) {
        
                    setTimeout(function () {
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

        var reinicia = function () {

            $lacunas.empty();
            mudaPlaceHolder('Palavra secreta');
            jogo.reinicia();
        };

        var inicia = function () {
    
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
        return { inicia: inicia };
    };