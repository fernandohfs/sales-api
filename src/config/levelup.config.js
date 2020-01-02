require('dotenv').config();

const prompt = require('prompt');
require = require('esm')(module);

process.env.DEBUG = false;

const serverConfig = require('./server.config').default;

(async () => {   
    const server = await serverConfig.start();
    const UsersDao = require('../api/users/users.dao').default;

    let users = await UsersDao.findAll({params: {}, query: {}});
    printUsers(users); 

    let result = await levelUp(users);    
    console.log(result);

    await server.stop();
})();

function printUsers(users) {
    console.log('List Users:');
    console.log('-----------------------------');
    console.log(' id | name | type ')
    console.log('-----------------------------');;
    users.records.map(user => {
        console.log(` ${user.id}, ${user.name}, ${user.type.description} `);
    });    
    console.log('-----------------------------');
}

function levelUp(users) {
    return new Promise((resolve, reject) => {
        prompt.start();

        prompt.get([{
            name: 'id',
            description: 'Select user for level up (By ID)',
            type: 'number',
            required: true
        }], async (err, result) => {
            if (err) reject(err);
            
            let user = users.records.filter(user => user.id === result.id);
            
            if (user.length > 0) {
                user = user[0];
                user.type = 2;
                await user.save();

                resolve(`User ${user.name} level up!`) 
            }

            resolve('User not found!');
        });
    });
}