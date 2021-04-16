module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        complemento: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cep: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        risco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valido: {
            type: DataTypes.BOOLEAN
        }
    });

    return User;
};


