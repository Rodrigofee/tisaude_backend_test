module.exports = (sequelize, DataTypes) => {
    const Motivo = sequelize.define('Motivo', {
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        motivo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Motivo;
};


