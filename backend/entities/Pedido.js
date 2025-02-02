class Pedido{
    constructor(idPedido, idCliente, codigoOrden,cantidad, fechaPedido, fechaEntrega, serieInicio, serieFinal) {
        this._idPedido = idPedido;
        this._idCliente = idCliente;
        this._codigoOrden = codigoOrden;
        this._cantidad = cantidad;
        this._fechaPedido = fechaPedido;
        this._fechaEntrega = fechaEntrega;
        this._serieInicio = serieInicio;
        this._serieFinal = serieFinal;
        this._detallePedido = [];
    }
    
    get idPedido(){
        return this._idPedido;
    }

    set idPedido(value) {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('idPedido debe ser un número positivo');
        }
        this._idPedido = value;
    }

    get idCliente(){
        return this._idCliente;
    }

    set idCliente(value){
        if (typeof value !== 'number' || value <= 0) {
            throw new Error('idCliente debe ser un número positivo');
        }
        this._idCliente = value;
    }

    get codigoOrden(){
        return this._codigoOrden;
    }

    set codigoOrden(value){
        if (typeof value === 'string' && value.trim() !== '') {
            this._codigoOrden = value;
        } else {
            throw new Error('codigoOrden debe ser un string no vacío');
        }
    }

    get cantidad(){
        return this._cantidad;
    }

    set cantidad(value){
        if (typeof value === 'number' && value > 0) {
            this._cantidad = value;
        } else {
            throw new Error('La cantidad debe ser un número positivo');
        }
    }

    get fechaPedido(){
        return this._fechaPedido;
    }

    set fechaPedido(value){
        if (value instanceof Date && !isNaN(value)) {
            const fechaActual = new Date();
            if (value >= fechaActual) {
                this._fechaPedido = value;
            } else {
                throw new Error('La fecha no puede ser anterior a la fecha actual');
            }
        } else {
            throw new Error('La fecha debe ser un objeto Date válido');
        }
    }

    get fechaEntrega(){
        return this._fechaEntrega;
    }

    set fechaEntrega(value){
        if (value instanceof Date && !isNaN(value)) {
            const fechaActual = new Date();
            if (value >= fechaActual) {
                this._fechaEntrega = value;
            } else {
                throw new Error('La fecha no puede ser anterior a la fecha actual');
            }
        } else {
            throw new Error('La fecha debe ser un objeto Date válido');
        }
    }

    get serieInicio(){
        return this._serieInicio;
    }

    set serieInicio(value) {
        if (typeof value === 'number' && value >= 0) {
            this._serieInicio = value;
        } else {
            throw new Error('serieInicio debe ser un número positivo');
        }
    }

    get serieFinal(){
        return this._serieFinal;
    }

    set serieFinal(value){
        if (typeof value === 'number' && value >= 0) {
            this._serieFinal = value;
        } else {
            throw new Error('serieInicio debe ser un número positivo');
        }
    }

    get detallePedido(){
        return this._detallePedido;
    }

    set detallePedido(value) {
        if (Array.isArray(value)) {
            this._detalles = value;
        } else {
            throw new Error('detalles debe ser un array');
        }
    }

    agregarDetalle(detalle) {
        this._detallePedido.push(detalle);
    }
}
module.exports = Pedido;