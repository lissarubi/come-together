const { exec } = require("child_process")
const axios = require('axios')

async function execQuery(apps){
    data = ({
        name: "ederson",
        apps: apps
    })

    const response = await axios.put('http://localhost:3333/users', data
    ).then(console.log(apps))
}

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

    execQuery(apps)
});