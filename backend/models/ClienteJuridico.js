const Cliente = require('./Cliente');

class ClienteJuridico extends Cliente {
    constructor(idClienteJuridico, idCliente,telefono, RazonSocial, Ruc, RepresentanteLegal) {
        super(idCliente, telefono);
        this._idClienteJuridico = idClienteJuridico;
        this._RazonSocial = RazonSocial;
        this._Ruc = Ruc;
        this._RepresentanteLegal = RepresentanteLegal;
    }
    
    get idClienteJuridico() {
        return this._idClienteJuridico;
    }
    
    set idClienteJuridico(value) {
        if(typeof value !== 'number' || values <=0){
            throw new Error('El id del cliente jurídico debe ser un número positivo');
        }
        this.idClienteJuridico = value;
    }

    get RazonSocial() {
        return this._RazonSocial;
    }

    set RazonSocial(value) {
        if(typeof value === 'string' && value.trim() !== '') {
            this._RazonSocial = value;
        } else{
            throw new Error('La razón social debe ser un string no vacío');
        }
    }

    get Ruc() {
        return this._Ruc;
    }

    set Ruc(value) {
        if(typeof value === 'string' && value.trim() !== '') {
            this._Ruc = value;
        } else{ 
            throw new Error('El RUC debe ser un string no vacío');
        }
    }

    get RepresentanteLegal() {
        return this._RepresentanteLegal;
    }

    set RepresentanteLegal(value) {
    if (typeof value === 'string' && value.trim() !== '') {
        this._RepresentanteLegal = value;
    } else {
        throw new Error('El representante legal debe ser un string no vacío');
    }
}

}

module.exports = ClienteJuridico;