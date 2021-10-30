const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const yup = require('yup');

class UserController {
    async show(req, res) {
        var users = await User.find();
        console.log(users);
        return res.status(200).json({
            error: false,
            users
        });
    }

    async store(req, res) {
        /**
         * Validação utilizando yup schema
         * Inicio
         */
        let schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({
                error: true,
                message: "Dados do usuário inválidos."
            });
        }
        /**
         * Validação utilizando yup schema
         * Final
         */

        let userExist = await User.findOne({ email: req.body.email });
        if (userExist) return res.status(400).json({
            error: true,
            message: "Este email não pode ser usado, pois já está cadastrado."
        });

        const { name, email, password } = req.body;
        const data = { name, email, password };
        data.password = await bcrypt.hash(data.password, 8);

        await User.create(data, (error) => {
            if (error) return res.status(400).json({
                error: true,
                message: "Erro ao tentar inserir um usuário no banco no MongoDB."
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso."
            })
        });
    }
}

module.exports = new UserController();