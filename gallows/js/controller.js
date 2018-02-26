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
    
            // passa para o jogo o chute digitado pelo usuário
            jogo.setPalavraSecreta($entrada.val().trim());
            
                // limpa o campo de entrada 
            
                $entrada.val('');
            
                // exibe para o usuário as lacunas de jogo.getLacunas();
                exibeLacunas();
            
                // muda o texto do placeholder para `chute`.
                mudaPlaceHolder('chute');
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