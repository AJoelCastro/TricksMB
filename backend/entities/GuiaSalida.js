class GuiaSalida{
    constructor(idGuiSalida,idSalida,idCliente,cantidad,fechaSalida){
        this._idGuiaSalida = idGuiaSalida;
        this._idSalida = idSalida;
        this._idCliente = idCliente;
        this._cantidad = cantidad;
        this._fechaSalida = fechaSalida;
    }

    get idGuiaSalida(){
        return this._idGuiaSalida;
    }

    set idGuiaSalida(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id de la guia de salida debe ser un numero positivo');
        }
    }

    get idSalida(){
        return this._idSalida;
    }

    set idSalida(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id de la salida debe ser un numero positivo');
        }
    }

    get idCliente(){
        return this._idCliente;
    }

    set idCliente(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del cliente debe ser un numero positivo');
        }
    }

    get cantidad(){
        return this._cantidad;
    }

    set cantidad(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('La cantidad debe ser un numero positivo');
        }
    }

    get fechaSalida(){
        return this._fechaSalida;
    }

    set fechaSalida(value) {
        if (value instanceof Date && !isNaN(value)) {
            const fechaActual = new Date();
            fechaActual.setHours(0, 0, 0, 0); // Normaliza la fecha actual (ignora la hora)

            const valueNormalizado = new Date(value);
            valueNormalizado.setHours(0, 0, 0, 0); // Normaliza la fecha proporcionada

            if (valueNormalizado >= fechaActual) {
                this._fechaSalida = valueNormalizado.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            } else {
                throw new Error('La fecha de salida no puede ser anterior a la fecha actual');
            }
        } else {
            throw new Error('La fecha de salida debe ser un objeto Date válido');
        }
    }
}