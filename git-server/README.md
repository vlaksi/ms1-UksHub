# git-server

A lightweight Git Server Docker image built with Alpine Linux.

## Menu


<details>
    <summary> SSH Keys </summary> 
    
### SSH Keys

How generate a pair keys in client machine:

    $ ssh-keygen -t rsa

How upload quickly a public key to host volume:

    $ scp ~/.ssh/id_rsa.pub user@host:~/git-server/keys    

</details>


<details>
    <summary> Docker </summary> 


### Build Image

Redirect to the git-server (where is a Dockerfile) & run: 

    $ docker build -t uks-git-server .

### Docker-Compose

You can edit docker-compose.yml file in base directory and run this container along with other project containers with:

    $ docker-compose up -d

</details>
    
<details>
    <summary> Basic Usage </summary>

### Basic Usage

How to run the container in port 2222 with two volumes: keys volume for public keys and repos volume for git repositories:

    $ docker run -d -p 2222:22 -v ~/git-server/keys:/git-server/keys -v ~/git-server/repos:/git-server/repos uks-git-server

How to use a public key:

    Copy them to keys folder:
    - From host: $ cp ~/.ssh/id_rsa.pub ~/git-server/keys
    - From remote: $ scp ~/.ssh/id_rsa.pub user@host:~/git-server/keys
    You need restart the container when keys are updated:
    $ docker restart <container-id>

How to check that container works (you must to have a key):

    $ ssh git@<ip-docker-server> -p 2222
    ...
    Welcome to git-server-docker!
    You've successfully authenticated, but I do not
    provide interactive shell access.
    ...

How to create a new repo:

    $ mkdir myrepo
    $ cd myrepo
    $ git init --shared=true
    $ git add .
    $ git commit -m "my first commit"
    $ cd ..
    $ git clone --bare myrepo myrepo.git

How to upload a repo:

    From host:
    $ mv myrepo.git ~/git-server/repos
    From remote:
    $ scp -r myrepo.git user@host:~/git-server/repos

How clone a repository:

    $ git clone ssh://git@<ip-docker-server>:2222/git-server/repos/myrepo.git

</details>
