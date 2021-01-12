import bcrypt from 'bcryptjs'

const user = [
    {
        name: 'Admin user',
        email: 'admin@example.ua',
        isAdmin: true,
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'John Doe',
        email: 'john@example.ru',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jack',
        email: 'jack@example.ru',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default user