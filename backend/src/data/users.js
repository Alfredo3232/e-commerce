import bcrypt from "bcrypt";

const users = [
    {
        name     : "Admin User",
        email    : "admin@mail.com",
        password : bcrypt.hashSync("123456", 10),
        isAdmin  : true
    },
    {
        name     : "Juan Doe",
        email    : "juan@mail.com",
        password : bcrypt.hashSync("123456", 10),
        isAdmin  : false
    },
    {
        name     : "Juana Doe",
        email    : "juana@mail.com",
        password : bcrypt.hashSync("123456", 10),
        isAdmin  : false
    }
];

export default users;