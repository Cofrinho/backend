import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = new Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para gerenciamento de usuários
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do usuário
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *           example: Andrei Albrecht
 *         cpf:
 *           type: string
 *           description: CPF único do usuário
 *           example: "123.456.789-00"
 *         birth_date:
 *           type: string
 *           format: date
 *           description: Data de nascimento do usuário
 *           example: "1990-06-10"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: andrei@example.com
 *         phone:
 *           type: string
 *           description: Número de telefone
 *           example: "+55 51 99999-9999"
 *         avatar_url:
 *           type: string
 *           format: uri
 *           description: URL para o avatar do usuário
 *           example: "https://example.com/avatar.jpg"
 *         email_verified_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data/hora da verificação do email
 *           example: "2025-06-10T12:00:00Z"
 *         last_login_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data/hora do último login
 *           example: "2025-06-10T12:30:00Z"
 *         deactivated_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Data/hora da desativação do usuário
 *           example: null
 *       required:
 *         - name
 *         - cpf
 *         - birth_date
 *         - email
 *         - phone
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags:
 *       - users
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123abc"
 *                   nome:
 *                     type: string
 *                     example: "Andrei Albrecht"
 *                   email:
 *                     type: string
 *                     example: "andrei@example.com"
 */
router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID
 *     tags:
 *       - users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser removido
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso (sem conteúdo)
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', UserController.delete);

export { router as userRoutes };
