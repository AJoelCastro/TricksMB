const db = require('../config/db');
const CodQR = require('qrcode');

class CajaDAO{

    static async createCaja(idCaracteristica){
        try{
            const query = `INSERT INTO Caja (Caracteristicas_idCaracteristicas, CodigoQR) VALUES (?, ?)`;
            const [result] = await db.execute(query, [idCaracteristica, "tempQR"]);

            const idCaja = result.insertId;
            const URL = `http://tricks.com/caja/${idCaja}`;
            const qrImage = await CodQR.toDataURL(URL);

            await db.query(`UPDATE Caja SET CodigoQR = ? WHERE idCaja = ?`, [qrImage, idCaja]);

            return {idCaja, idCaracteristica, qrImage};
        }catch(error){
            console.error(error);
            throw error;
        }
    } 

    static async getAllCajaByPedido(idCaracteristica){
        try{
            const query = `
                SELECT * 
                FROM Caja
                WHERE Caracteristicas_idCaracteristicas = ?
            `;
            const [rows] = await db.execute(query, [idCaracteristica]);
            return rows;
        }catch(error){
            console.error(error);
            throw error;
        }


    }

}

module.exports = CajaDAO;