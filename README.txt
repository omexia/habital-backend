How to install mongo DB

1) first download from the official page the cominity server version
    https://www.mongodb.com/download-center/community
2) then extract the content from the tar file
    tar xzf mongodb-osx-ssl-x86_64.tgz
3) then move all the content to the folder 
    sudo mkdir /usr/local/mongodb
    sudo mv * /usr/local/mongodb
4) create the folder /data/db/
    sudo mkdir /data/db/
5) change the permissions over the directory:
    whoami
    sudo chown hectorcuellar /data/db
6) Add the all the paths on the enviroment variables
    cd
    open .bash_profile
    Edit the file and put the following lines:

    export MONGO_PATH=/usr/local/mongodb
    export PATH=$PATH:$MONGO_PATH/bin

    create the file .bash_profile if not exist with the command touch
    touch name_file

    once you put that lines refresh the file .bash_profile with the command source:
    source .bash_profile 

7) finally you have to execute the mongo daemon for run mongo on your machine
and then execute the mongo for open the terminal 

8) see the existing databases with the command 
 show dbs 
 use some_db
 show collections




