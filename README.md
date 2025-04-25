# seminario1041B_front

This is a progect for seminario de actualizaccion class

## Nginx install and configure steps in aws EC2

 Assuming that you're connected to your aws EC2 server via ssh, you can follow these steps to install and configure Nginx on it:
- Execute ``sudo yum update`` to updates local package list index
- Execute ``sudo yum install nginx`` to install nginx package
- Execute ``sudo service nginx start`` to start nginx server
- Execute ``sudo service nginx status`` to verifiy nginx server status

## Building project in aws ECC2
Assuming that you have updated your project, you can follow these steps to building it in Nginx server: 
- Run ``npm run build``
- Run ``scp -r dist/seminario1041-b-front/browser/  /usr/share/nginx/html/`` to copy builded app to webserver folder

