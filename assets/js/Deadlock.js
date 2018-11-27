const Deadlock = (function($) {
    /**
     * Intervalor da janela
     */
    let next = true;
    /**
     * Cria elementos
     */
    const createCar = function ( posicao ) {
        let $car = $("<div class='car'></div>");
        if ((!next && posicao == null) || posicao == 'direita') {
            $car.addClass('direita');
        }
        $('#lane').append($car);
        return $car;
    };
    /**
     * Define keyframe para lane informada
     */
    const defineKeyframe = function () {
        $.keyframe.define([
            {
                name: 'esquerda',
                '0%': { 'margin-left': '-130px' },
                '100%':  { 'margin-left': '630px' }
            },
            {
                name: 'direita',
                '0%':  { 'margin-left': '630px' },
                '100%': { 'margin-left': '-130px' }
            },
            {
                name: 'esquerda-lock',
                '0%': { 'margin-left': '-130px' },
                '100%':  { 'margin-left': '210px' }
            },
            {
                name: 'direita-lock',
                '0%':  { 'margin-left': '630px' },
                '100%': { 'margin-left': '325px' }
            },
        ]);
    };
    /**
     * Função executada ao finalizar animação
     */
    const timeOutFunction = function ( $car ) {
        setTimeout(function() {
            let x = Math.floor((Math.random() * 10) + 1)
            if (x == 10) {
                lock();
            } else {
                $car.remove();
                goNext(!next,timeOutFunction);
            }
        }, 1000);
    };
    /**
     * Roda animação para o carro e a lane informada
     */
    const playKeyframe = function ( $car, animacao, timeOutFunction ) {
        $car.playKeyframe({
            name: animacao,
            duration: '3s',
            timingFunction: 'linear',
            complete: function () {
                if (timeOutFunction) {
                    timeOutFunction($car);
                }
            }
        });
    };
    /**
     * Inicia a próxima viagem
     */
    const goNext = function ( newNext, timeOutFunction ) {
        next = newNext;
        if (timeOutFunction == timeOutFunctionSemLock) {
            if (next) {
                semaforoEsquerda();
            } else {
                semaforoDireita();
            }
            setTimeout(function () {
                playKeyframe(createCar(null), (next ? 'esquerda' : 'direita'), timeOutFunction);
            },1000);
        } else {
            playKeyframe(createCar(null), (next ? 'esquerda' : 'direita'), timeOutFunction);
        }
    };
    /**
     * Para simulações
     */
    const stop = function () {
        $('.car').remove();
    };
    /**
     * Rodar normal
     */
    const run = function () {
        defineKeyframe();
        let $car = createCar(null);
        playKeyframe($car,'esquerda',timeOutFunction);
    };
    /**
     * Rodar novamente simulação
     */
    const rerun = function () {
        $('#where-things-happens').removeClass('esquerda direita');
        stop();
        run();
    };
    /**
     * Executa animação de deadlock
     */
    const lock = function () {
        stop();
        let $car1 = createCar('esquerda');
        let $car2 = createCar('direita');
        playKeyframe($car1,'esquerda-lock',null);
        playKeyframe($car2,'direita-lock',null);
        setTimeout(function () {
            semDeadlock();
        },10000)
    };
    /**
     * Muda idioma para português
     */
    const portugues = function () {
        $('#ingles').hide();
        $('#portugues').show();
    };
    /**
     * Muda idioma para inglês
     */
    const english = function () {
        $('#portugues').hide();
        $('#ingles').show();
    };
    /**
     * Roda modelo impedindo deadlock
     */
    const semDeadlock = function () {
        stop();
        next = true;
        let $car = createCar(null);
        semaforoEsquerda();
        playKeyframe($car,'esquerda',timeOutFunctionSemLock);
    };
    /**
     * Mostra o semaforo pela esquerda
     */
    const semaforoEsquerda = function () {
        $('#where-things-happens').addClass('esquerda').removeClass('direita');
    };
    /**
     * Mostra o semaforo pela direita
     */
    const semaforoDireita = function () {
        $('#where-things-happens').addClass('direita').removeClass('esquerda');
    };
    /**
     * Função timeOut sem lock
     */
    const timeOutFunctionSemLock = function ( $car ) {
        setTimeout(function() {
            $car.remove();
            goNext(!next,timeOutFunctionSemLock);
        }, 1000);
    };
    /**
     * Métodos públicos
     */
    return {
        run: run,
        rerun: rerun,
        semDeadlock: semDeadlock,
        portugues: portugues,
        english: english
    };
})(jQuery);

