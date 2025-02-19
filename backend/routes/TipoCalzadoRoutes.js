const expres = express();
const tipoCalzadoController = require('../controllers/TipoCalzadoController')
const authMiddleware = require('../middlewares/authMiddleware');

expres.get('/todos',authMiddleware,tipoCalzadoController.getAllTipoCalzado);
expres.get('/nombre',authMiddleware,tipoCalzadoController.getTipoCalzadoByNombre);
module.exports = expres;