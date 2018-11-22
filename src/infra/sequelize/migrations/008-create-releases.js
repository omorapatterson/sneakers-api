module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('releases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      sku: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      hot: {
        type: Sequelize.BOOLEAN
      },
      children: {
        type: Sequelize.BOOLEAN
      },
      price: {
        type: Sequelize.REAL
      },
      gender: {
        type: Sequelize.STRING
      },
      style: {
        type: Sequelize.UUID,
        references: {
          model: 'styles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('releases')
  }
}
