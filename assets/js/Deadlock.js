const Deadlock = (function($) {
    /**
     * Intervalor da janela
     */
    let intervalo;
    let next = true;
    /**
     * Cria elementos
     */
    const createCar = function () {
        let $car = $("<div class='car'></div>");
        if (!next) {
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
            }
        ]);
    };
    /**
     * Roda animação para o carro e a lane informada
     */
    const playKeyframe = function ( $car ) {
        $car.playKeyframe({
            name: next ? 'esquerda' : 'direita',
            duration: '3s',
            timingFunction: 'linear',
            complete: function () {
                setTimeout(() => {
                    $car.remove();
                    goNext(!next);
                }, 1000)
            }
        });
    };
    /**
     * Inicia a próxima viagem
     */
    const goNext = function ( newNext ) {
        next = newNext;
        let $car = createCar();
        playKeyframe($car);
    };
    /**
     * Para simulações
     */
    const stop = function () {
        $('.car').remove();
        window.clearInterval(intervalo);

    };
    /**
     * Rodar normal
     */
    const run = function () {
        defineKeyframe();
        let $car = createCar();
        playKeyframe($car);
    };
    /**
     * Rodar novamente simulação
     */
    const rerun = function () {
        stop();
        run();
    };
    /**
     * Executa animação de deadlock
     */
    const lock = function () {
        countCarOnLane1 = 0;
        countCarOnLane2 = 0;
        countCarOnLane3 = 0;
        countCarOnLane4 = 0;
        laneRef = 1;
        stop();
        setIntervaloDeadlock();
    };
    /**
     * Realiza deadlock
     */
    const setIntervaloDeadlock = function () {
        let viagem = 1;
        defineViagemLock();
        intervalo = window.setInterval(function() {
            viagemLock(viagem++);
            if (viagem == 50) {
                window.clearInterval(intervalo);
            }
        }, 1000);

    };
    let laneRef = 1;
    let countCarOnLane1 = 0;
    let countCarOnLane2 = 0;
    let countCarOnLane3 = 0;
    let countCarOnLane4 = 0;
    /**
     * Verifica em qual lane a viagem deve ser realizada
     */
    const findLane = function ( viagem ) {
        let lane = laneRef++;
        if (lane == 4) {
            laneRef = 1;
        }
        return lane;
    };
    /**
     * Verifica se a viagem é possível
     */
    const viagemLock = function ( viagem ) {
        let lane = findLane();
        if (lane == 1) {
            ++countCarOnLane1;
            if (countCarOnLane1 <= 12) {
                viagemLockGo(1,viagem);
            }
        }
        if (lane == 2) {
            ++countCarOnLane2;
            if (countCarOnLane2 <= 12) {
                viagemLockGo(2,viagem);
            }
        }
        if (lane == 3) {
            ++countCarOnLane3;
            if (countCarOnLane3 <= 5) {
                viagemLockGo(3,viagem);
            }
        }
        if (lane == 4) {
            ++countCarOnLane4;
            if (countCarOnLane4 <= 5) {
                viagemLockGo(4,viagem);
            }
        }
    };
    /**
     * Realiza uma viagem lockada
     */
    const viagemLockGo = function ( lane, viagem ) {
        let $car = createCar(lane);
        playViagemLock($car,viagem);
    };
    /**
     * Define keyframe para lane informada
     */
    const defineViagemLock = function () {
        $.keyframe.define([
            // VIAGENS DA LANE 1
            {
                name: 'viagem1',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '550px' }
            },
            {
                name: 'viagem5',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '500px' }
            },
            {
                name: 'viagem9',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '450px' }
            },
            {
                name: 'viagem13',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '400px' }
            },
            {
                name: 'viagem17',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '350px' }
            },
            {
                name: 'viagem21',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '300px' }
            },
            {
                name: 'viagem25',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '250px' }
            },
            {
                name: 'viagem29',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '200px' }
            },
            {
                name: 'viagem33',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '150px' }
            },
            {
                name: 'viagem37',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '100px' }
            },
            {
                name: 'viagem41',
                '0%': { 'margin-left': '5px' },
                '100%': { 'margin-left': '50px' }
            },
            {
                name: 'viagem45',
                '0%': { 'margin-left': '0px' },
                '100%': { 'margin-left': '0px' }
            },

            // VIAGENS DA LANE 2
            {
                name: 'viagem2',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '0px' }
            },
            {
                name: 'viagem6',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '50px' }
            },
            {
                name: 'viagem10',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '100px' }
            },
            {
                name: 'viagem14',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '150px' }
            },
            {
                name: 'viagem18',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '200px' }
            },
            {
                name: 'viagem22',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '250px' }
            },
            {
                name: 'viagem26',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '300px' }
            },
            {
                name: 'viagem30',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '350px' }
            },
            {
                name: 'viagem34',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '400px' }
            },
            {
                name: 'viagem38',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '450px' }
            },
            {
                name: 'viagem42',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '500px' }
            },
            {
                name: 'viagem46',
                '0%': { 'margin-left': '550px' },
                '100%': { 'margin-left': '550px' }
            },

            // VIAGENS LANE 3

            {
                name: 'viagem3',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '0px' }
            },
            {
                name: 'viagem7',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '50px' }
            },
            {
                name: 'viagem11',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '100px' }
            },
            {
                name: 'viagem11',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '170px' }
            },
            {
                name: 'viagem15',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '400px' }
            },
            {
                name: 'viagem19',
                '0%': { 'margin-top': '450px' },
                '100%': { 'margin-top': '450px' }
            },
            // VIAGENS LANE 4
            {
                name: 'viagem4',
                '0%': { 'margin-top': '0px' },
                '100%': { 'margin-top': '450px' }
            },
            {
                name: 'viagem8',
                '0%': { 'margin-top': '0px' },
                '100%': { 'margin-top': '400px' }
            },
            {
                name: 'viagem12',
                '0%': { 'margin-top': '0px' },
                '100%': { 'margin-top': '300px' }
            },
            {
                name: 'viagem16',
                '0%': { 'margin-top': '0px' },
                '100%': { 'margin-top': '100px' }
            },
            {
                name: 'viagem16',
                '0%': { 'margin-top': '0px' },
                '100%': { 'margin-top': '50px' }
            }
        ]);
    };
    /**
     * Roda animação para o carro e a lane informada
     */
    const playViagemLock = function ( $car, viagem ) {
        $car.playKeyframe({
            name: 'viagem' + viagem,
            duration: "1.2s",
            timingFunction: 'linear',
        });
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
     * Métodos públicos
     */
    return {
        run: run,
        rerun: rerun,
        lock: lock,
        portugues: portugues,
        english: english
    };
})(jQuery);

