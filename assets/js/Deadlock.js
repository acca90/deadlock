const Deadlock = (function($) {
    /**
     * Mapa de elementos
     */
    let elementMap = {};
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
        initElementMap();
        initEvents();
    };
    /**
     * Inicializa mapa de elementos
     */
    const initElementMap = function () {
        elementMap.container = $('#where-things-happens');
        elementMap.lanes = [$('#lane1'), $('#lane2'), $('#lane3'), $('#lane4')];
    };
    /**
     * Inicializa eventos
     */
    const initEvents = function () {
    };
    /**
     * Cria elementos
     */
    const createCar = function ( lane ) {
        let $car = $("<div lane="+lane+" class='car'><img class='car"+lane+"' src='assets/img/car2.png'></div>");
        elementMap.lanes[(lane-1)].append($car);
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
            duration: "3s",
            timingFunction: 'linear',
            direction: 'alternate',
            complete: function () {
                $car.remove();
                newCarTravelOnLane($car.attr('lane'));
            }
        });
    };
    /**
     * Rodar simulação
     */
    const run = function () {
        for (let lane of [1,2,3,4]) {
            newCarTravelOnLane(lane);
        }
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
     * Métodos públicos
     */
    return {
        init: init,
        run: run
    };
})(jQuery);