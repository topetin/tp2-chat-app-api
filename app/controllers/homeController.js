const homeController = {};

homeController.goHome = (req, res) => {
    res.status(200).json({status: 200, code: 'OK'})
}

module.exports = homeController;