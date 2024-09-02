const inquirer = require('inquirer');

const options = [
    {
        type: 'list',
        name: 'action',
        message: 'Please choose an option:',
        choices: ['Web', 'ggMapScrap', 'Exit']
    }
];

const runProgram = async () => {
    while (true) {
        const answers = await inquirer.prompt(options);

        if (answers.action === 'Web') {
            
            require('./Web/index.js');
        } else if (answers.action === 'ggMapScrap') {
            
            require('./ggMapScrap/index.js');
        } else if (answers.action === 'Exit') {
            console.log('Exiting program...');
            
        }
    }
};

runProgram();
