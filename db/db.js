const Sequelize = require('sequelize')
const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/search.db'
})

const Search = db.define('search', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    count: {
        type: Sequelize.INTEGER,
        default: 0,
    }
})

module.exports = {
    db,
    Search
}