class Cliente {
    constructor(idCliente, telefono) {
        this._idCliente = idCliente;
        this._telefono = telefono;
    }

    get idCliente() {
        return this._idCliente;
    }
    set idCliente(value) {
        if(typeof value !== 'number' || value <=0) {
            throw new Error('El id del cliente debe ser un número positivo');
        }
        this._idCliente = value;
    }

    get telefono() {
        return this._telefono;
    }
    
    set telefono(value) {
        if(typeof value !== 'number' || values<=0) {
            throw new Error('El teléfono debe ser un número positivo');
        }
        this._telefono = value; 
    }
}

module.exports = Cliente;