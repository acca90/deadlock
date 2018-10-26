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
            duration: findVelocidade(lane) + "s",
            timingFunction: 'linear',
            complete: function () {
                $car.remove();
            }
        });
    };
    /**
     * Identificia a velocidade indicada para cada lane
     */
    const findVelocidade = function ( lane ) {
        let lane1 = 2;
        let lane2 = 3;
        let lane3 = 2;
        let lane4 = 3;
        switch (lane) {
            case 1: {
                if (lane1 == 1.5) {
                    lane1 = 3;
                } else {
                    lane1 = 1.5;
                }
                return lane1;
            }
            case 2: {
                if (lane2 == 3) {
                    lane2 = 1.5;
                } else {
                    lane2 = 3;
                }
                return lane2;
            }
            case 3: {
                if (lane3 == 1.5) {
                    lane3 = 3;
                } else {
                    lane3 = 1.5;
                }
                return lane3;
            }
            case 4: {
                if (lane4 == 3) {
                    lane4 = 1.5;
                } else {
                    lane4 = 3;
                }
                return lane4;
            }
            default: return 1;
        }
    };
    /**
     * Inicia viagem de carro na lane informada
     * @param lane
     */
    const viagemSegura = function (lane ) {
        let $car = createCar(lane);
        defineKeyframe(lane);
        playKeyframe($car,lane);
    };
    /**
     * Inicia intervalo
     */
    const setIntervaloNormal = function () {
        let lane = 1;
        intervalo = window.setInterval(function() {
            viagemSegura(lane++);
            if (lane > 4) {
                lane = 1;
            }
        }, 1000);
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
        setIntervaloNormal();
    };
    /**
     * Rodar novamente simulação
     */
    const rerun = function () {
        stop();
        setIntervaloNormal();
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
     * Métodos públicos
     */
    return {
        init: init,
        run: run,
        rerun: rerun,
        lock: lock
    };
})(jQuery);

