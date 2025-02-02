class Usuario{
    constructor(idUsuario, correo, contrasenia){
        this._idUsuario = idUsuario;
        this._correo = correo;
        this._contrasenia = contrasenia;
    }

    get idUsuario(){
        return this._idUsuario;
    }

    set idUsuario(value){
        if(typeof value !== 'number' || value <=0){
            throw new Error('El id del usuario debe ser un numero positivo');
        }
    }

    get correo(){
        return this._correo;
    }

    set correo(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._correo = value;
        }else{
            throw new Error('El correo debe ser un string no vacio');
        }
    }

    get contrasenia(){
        return this._contrasenia;
    }

    set contrasenia(value){
        if(typeof value === 'string' && value.trim() !== ''){
            this._contrasenia = value;
        }else{
            throw new Error('La contrasenia debe ser un string no vacio');
        }
    }
}

module.exports = Usuario;