const express = require('express');
const router = express.Router();
const db = require('../models');

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Operações relacionadas aos alunos
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   age:
 *                     type: integer
 *                     example: 20
 *                   first_semester_grade:
 *                     type: number
 *                     format: float
 *                     example: 8.5
 *                   second_semester_grade:
 *                     type: number
 *                     format: float
 *                     example: 9.0
 *                   professor_name:
 *                     type: string
 *                     example: Dr. Smith
 *                   classroom_number:
 *                     type: string
 *                     example: 101
 */
router.get('/students', async (req, res) => {
  try {
    const students = await db.Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Adiciona um novo aluno
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 20
 *               first_semester_grade:
 *                 type: number
 *                 format: float
 *                 example: 8.5
 *               second_semester_grade:
 *                 type: number
 *                 format: float
 *                 example: 9.0
 *               professor_name:
 *                 type: string
 *                 example: Dr. Smith
 *               classroom_number:
 *                 type: string
 *                 example: 101
 *     responses:
 *       201:
 *         description: Aluno criado
 */
router.post('/students', async (req, res) => {
  try {
    const student = await db.Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 first_semester_grade:
 *                   type: number
 *                   format: float
 *                 second_semester_grade:
 *                   type: number
 *                   format: float
 *                 professor_name:
 *                   type: string
 *                 classroom_number:
 *                   type: string
 *       404:
 *         description: Aluno não encontrado
 */
router.get('/students/:id', async (req, res) => {
  try {
    const student = await db.Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               first_semester_grade:
 *                 type: number
 *                 format: float
 *               second_semester_grade:
 *                 type: number
 *                 format: float
 *               professor_name:
 *                 type: string
 *               classroom_number:
 *                 type: string
 *     responses:
 *       200:
 *         description: Aluno atualizado
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/students/:id', async (req, res) => {
  try {
    const [updated] = await db.Student.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const student = await db.Student.findByPk(req.params.id);
      res.json(student);
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Remove um aluno pelo ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do aluno
 *     responses:
 *       204:
 *         description: Aluno removido
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/students/:id', async (req, res) => {
  try {
    const deleted = await db.Student.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Aluno não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
