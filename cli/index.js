const { exec } = require("child_process")
const axios = require('axios')
const inquirer = require('inquirer')

function stdin(){
    var questions = [{
        type: 'input',
        name: 'input',
        message: "What's your name?",
      }]
      
      inquirer.prompt(questions).then(answers => {
        const value = answers["input"]
        return value
      })
}

async function go(apps){
    data = ({
        name: "ederson",
        apps: apps
    })

    try {
        const response = await axios.put('http://localhost:3333/users', data)
    }catch(err){
        console.log(err)
    }
}


function come(){
    return axios.get('http://localhost:3333/users').then(resp => resp.data)
}

async function useCome(){
    var questions = [{
        type: 'input',
        name: 'name',
        message: "Your Username: ",
      }]
      
      inquirer.prompt(questions).then(answers => {
        const name = answers["name"]
        afterName(name)
      })
    async function afterName(name){
            try{
            const users = await come()
            for (i = 0; i < users.length; i++){
                if (users[i].name == name){
                    
                    console.log(`installing packages: ${users[i].apps}`)
                    beforeContinue(users, i)
                    function beforeContinue(users, i){
                        var questions = [{
                            type: 'input',
                            name: 'continue',
                            message: "You want to continue? [Y/N]",
                          }]
                          
                          inquirer.prompt(questions).then(answers => {
                            line = answers["continue"]
                            const apps = users[i].apps
                            if (line == "Y" || line == "y" || line == "YES" || line == "yes"){
                                query = `sudo apt-get install ${apps} -y`
                                exec(query, (error, stdout, stderr) => {
                                    if (error) {
                                        console.log(`error: ${error.message}`);
                                        return;
                                    }
                                    if (stderr) {
                                        console.log(`stderr: ${stderr}`);
                                    }
                                });
                            }
                            else{
                                console.log("Cancelling the execution")
                            }
                          })
                    }
                }
            }
        } catch(err) {
            console.log(err)
        }
    }

}

async function useGo(){
    query = "zgrep -h ' install ' /var/log/dpkg.log* | sort | awk '{print $4}' | tr '\n' ' ' "
    exec(query, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        const apps = stdout
    
        go(apps)
    });
}

if (process.argv[2] == 'go'){
    useGo()
}

if (process.argv[2] == 'come'){
    useCome()
}
