module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Estudante', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nota_primeiro_semestre: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      nota_segundo_semestre: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      nome_professor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_sala: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Student;
  };
  