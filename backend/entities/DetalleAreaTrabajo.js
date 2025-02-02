class DetalleAreaTrabajo{
    constructor(idDetalleAreaTrabajo,idAreaTrabajo,idDetallePedido,cantidadAvance,comentario,fechaActualizacion){
        this._idDetalleAreaTrabajo = idDetalleAreaTrabajo;
        this._idAreaTrabajo = idAreaTrabajo;
        this._idDetallePedido = idDetallePedido;
        this._cantidadAvance = cantidadAvance;
        this._comentario = comentario;
        this._fechaActualizacion = fechaActualizacion;
    }

    get idDetalleAreaTrabajo(){
        return this._idDetalleAreaTrabajo;
    }

    set idDetalleAreaTrabajo(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del detalle de area de trabajo debe ser un numero positivo');
        }
    }

    get idAreaTrabajo(){
        return this._idAreaTrabajo;
    }

    set idAreaTrabajo(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del area de trabajo debe ser un numero positivo');
        }
    }

    get idDetallePedido(){
        return this._idDetallePedido;
    }

    set idDetallePedido(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del detalle de pedido debe ser un numero positivo');
        }
    }

    get cantidadAvance(){
        return this._cantidadAvance;
    }

    set cantidadAvance(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('La cantidad de avance debe ser un numero positivo');
        }
    }

    get comentario(){
        return this._comentario;
    }

    set comentario(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._comentario = value;
        }else{
            throw new Error('El comentario debe ser un string no vacio');
        }
    }

    get fechaActualizacion(){
        return this._fechaActualizacion;
    }

    set fechaActualizacion(value){
        if (value instanceof Date && !isNaN(value)) {
            const fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0); // Normaliza la fecha actual (ignora la hora)

            const valueNormalizado = new Date(value);
            valueNormalizado.setHours(0, 0, 0, 0); // Normaliza la fecha proporcionada

            if (valueNormalizado >= fechaActual) {
                this._fechaSalida = valueNormalizado.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            } else {
                throw new Error('La fecha de actualizacion debe ser la fecha actual');
            }
        } else {
            throw new Error('La fecha de actualizacion debe ser una fecha valida');
        }      
    }
}

module.exports = DetalleAreaTrabajo;