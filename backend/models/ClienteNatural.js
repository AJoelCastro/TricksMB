const Cliente = require('./Cliente');

class NaturalClient extends Client {
    constructor(idClienteNatural, idCliente, telefono, nombre, dni) {
        super(idCliente, telefono);
        this._idClienteNatural = idClienteNatural;
        this._nombre = nombre;
        this._dni = dni;
    }

    get idClienteNatural() {
        return this._idClienteNatural;
    }
    
    set idClienteNatural(value) {
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del cliente natural debe ser un número positivo');
        }
        this.idClienteNatural = value;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(value) {
        if(typeof value === 'string' && value.trim() !=''){
            this._nombre = value;
        }else{
            throw new Error('El nombre debe ser un string no vacío'); 
        }
    }

    get dni() {
        return this._dni;
    }

    set dni(value) {
    if (typeof value === 'string' && value.trim() !== '') {
        this._dni = value;
    } else {
        throw new Error('El DNI debe ser una cadena de texto no vacía');
    }
}
}

module.exports = ClienteNatural;