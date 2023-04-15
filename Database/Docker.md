# Runing DB on Docker

## Instructions 
<hr>

### Install Windows Subsystem for Linux
This makes running Docker images a little easier
- https://learn.microsoft.com/en-us/windows/wsl/install

### Install Docker Desktop
- https://www.docker.com/products/docker-desktop/

### Install DBeaver 
A better DBMS
- https://dbeaver.io/download/


### Pulling Docker Images

Open your WSL Terminal and run this command. This will create the local image and allow you to start/stop it. This works on Mac/Windows/Linux so we should be good.

```
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=superSketchyPassword -p 3306:3306 -d docker.io/library/mariadb:10.3
```

### DBeaver 
- Create a new connection
- Use the server: ```localhost```
- User: ```root```
- Password: ```superSketchyPassword```
- Port: ```3306```

Test your connection, if that works finish and the run the creation script db-create.sql
