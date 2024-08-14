import { Sequelize } from 'sequelize';
import config from '../config/config.json';

const sequelize = new Sequelize(config.development);

const Student = sequelize.define('Student', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  primeira_nota: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  segunda_nota: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  nome_professor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  numero_sala: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default async (req, res) => {
  await sequelize.authenticate();

  if (req.method === 'GET') {
    try {
      const students = await Student.findAll();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const [updated] = await Student.update(req.body, {
        where: { id: req.query.id },
      });
      if (updated) {
        const student = await Student.findByPk(req.query.id);
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deleted = await Student.destroy({
        where: { id: req.query.id },
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
