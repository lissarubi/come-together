const { exec } = require('child_process');
const axios = require('axios');
const prompts = require('prompts');
const colors = require('colors');

async function go(apps) {
  data = {
    name: 'ederson',
    apps: apps,
  };

  try {
    const response = await axios.put('http://localhost:3333/users', data);
  } catch (err) {
    console.log(err);
  }
}

function come() {
  return axios.get('http://localhost:3333/users').then((resp) => resp.data);
}

async function useCome() {
  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'Username: ',
    },
    {
      type: 'text',
      name: 'password',
      message: 'Password: ',
    },
  ];

  (async () => {
    const response = await prompts(questions);
    const username = response.username;
    const password = response.password;

    try {
      const users = await come();
      for (i = 1; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
          (async () => {
            query = `sudo apt-get install ${users[i].apps} -y`;
            console.log(
              'installing packages: ' + `${users[i].apps}`.green.bold,
            );
            const cont = await prompts({
              type: 'text',
              name: 'cont',
              message: 'You want to continue? [Y/N]',
            });
            if (
              cont.cont == 'y' ||
              cont.cont == 'yes' ||
              cont.cont == 'Y' ||
              cont.cont == 'YES'
            ) {
              exec(query, (error, stdout, stderr) => {
                if (error) {
                  console.log(`error: ${error.message}`);
                  return;
                }
                if (stderr) {
                  console.log(`stderr: ${stderr}`);
                }
              });
            } else {
              console.log('Cancelling the execution...'.red.bold);
            }
          })();
        } else {
          console.log('Verify your username and password please.'.red.bold);
        }
      }
    } catch (err) {
      console.log(err);
    }
  })();
}

async function useGo() {
  query =
    "zgrep -h ' install ' /var/log/dpkg.log* | sort | awk '{print $4}' | tr '\n' ' ' ";
  exec(query, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    const apps = stdout;

    go(apps);
  });
}

if (process.argv[2] == 'go') {
  useGo();
}

if (process.argv[2] == 'come') {
  useCome();
}
