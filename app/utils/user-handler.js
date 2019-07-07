/**
 * public - genera un color random para el usuario
 */
function getRandomColor() {
    var length = 6
    var chars = '0123456789ABCDEF'
    var hex = '#'
    while(length--) hex += chars[(Math.random() * 16) | 0]
    return hex
}

module.exports = { getRandomColor }