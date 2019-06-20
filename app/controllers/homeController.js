const path = require('path')
const homeController = {};

const homeView = path.join(__dirname, '../../public/views/index.html')

homeController.goHome = (req, res) => {
    res.status(200).json({status: 200, code: 'OK'})
}

module.exports = homeController;