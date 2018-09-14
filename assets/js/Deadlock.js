const Deadlock = (function () {
    /**
     * Controlador do canvas
     */
    const areaCanvas = {
        canvas: document.getElementById('thadSimulationGaveMeHeadache'),
        iniciar: function () {
            this.context = this.canvas.getContext("2d");
        }
    };
    /**
     * Inicializa simulação de deadlock
     */
    const init = function () {
        let component = new Component(30,30,'red',100,100);
        areaCanvas.iniciar();
    };
    /**
     * Métodos públicos
     */
    return {
        init: init
    };
})();