const Deadlock = (function($) {
    /**
     * Intervalor da janela
     */
    let intervalo;
    /**
     * Animações
     */
    const animation = [
        {
            begin: { 'margin-left': '5px' },
            end: { 'margin-left': '550px' }
        },
        {
            begin: { 'margin-left': '550px' },
            end: { 'margin-left': '0px' }
        },
        {
            begin: { 'margin-top': '465px' },
            end: { 'margin-top': '5px' },
        },
        {
            begin: { 'margin-top': '5px' },
            end: { 'margin-top': '465px' },
        }
    ];
    /**
     * Inicializa simulação de deadlock
     */
    const init = function () {
    };
    /**
     * Cria elementos
     */
    const createCar = function ( lane ) {
        let $car = $("<div class='car'></div>");
        $('#lane' + lane).append($car);
        return $car;
    };
    /**
     * Define keyframe para lane informada
     */
    const defineKeyframe = function ( lane ) {
        $.keyframe.define({
            name: 'lane'+lane,
            '0%': animation[lane-1].begin,
            '100%': animation[lane-1].end
        });
    };
    /**
     * Roda animação para o carro e a lane informada
     */
    const playKeyframe = function ( $car, lane ) {
        $car.playKeyframe({
            name: 'lane' + lane,
            duration: Math.floor((Math.random() * 5) + 1) + "s",
            timingFunction: 'linear',
            direction: 'alternate',
            complete: function () {
                $car.remove();
            }
        });
    };
    /**
     * Inicia viagem de carro na lane informada
     * @param lane
     */
    const newCarTravelOnLane = function (lane ) {
        let $car = createCar(lane);
        defineKeyframe(lane);
        playKeyframe($car,lane);
    };
    /**
     * Inicia intervalo
     */
    const setIntervalo = function () {
        intervalo = window.setInterval(function() {
            let lane = Math.floor((Math.random() * 4) + 1);
            newCarTravelOnLane(lane);
        }, 1000);
    };
    /**
     * Rodar simulação
     */
    const run = function () {
        let $button = $('#btn1');
        if ($button.val() == 'Iniciar') {
            setIntervalo();
            $button.val('Reiniciar')
        } else {
            clean();
            setIntervalo();
        }
    };
    /**
     * Para animação
     */
    const stop = function () {
        let $button = $('#btn2');
        if ($button.val() == 'Parar') {
            window.clearInterval(intervalo);
            $('.car').pauseKeyframe();
            $button.val('Continuar')
        } else {
            setIntervalo();
            $('.car').resumeKeyframe();
            $button.val('Parar')
        }
    };
    /**
     * Limpa simulação
     */
    const clean = function () {
        window.clearInterval(intervalo);
        $('.car').remove();
        $('#btn2').val('Parar')
    };
    /**
     * Métodos públicos
     */
    return {
        init: init,
        run: run,
        stop: stop
    };
})(jQuery);

