class Modelo{
    constructoe(idModelo, idTipo,Nombre, Imagen){
        this._idModelo = idModelo;
        this._idTipo = idTipo;
        this._Nombre = Nombre;
        this._Imagen = Imagen;
    }

    get idModelo(){
        return this._idModelo;
    }

    set idModelo(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del modelo debe ser un número positivo');
        }
        this._idModelo = value;
    }

    get idTipo(){
        return this._idTipo;
    }

    set idTipo(value){
        if(typeof value !== 'number' || value <= 0){
            throw new Error('El id del tipo debe ser un número positivo');
        }
        this._idTipo = value;
    }

    get Nombre(){
        return this._Nombre;
    }

    set Nombre(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._Nombre = value;
        }else{
            throw new Error('El nombre debe ser un string no vacío');
        }
    }

    get Imagen(){
        return this._Imagen;
    }

    set Imagen(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._Imagen = value;
        }else{
            throw new Error('La imagen debe ser un string no vacío');
        }
    }
}

module.exports = Modelo;