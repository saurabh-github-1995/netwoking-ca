Thanks for downloading this theme!

Theme Name: DevFolio
Theme URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
Author: BootstrapMade.com
Author URL: https://bootstrapmade.com




https://aspetraining.com/resources/blog/deploying-your-first-web-app-to-tomcat-on-docker docker tomcat
https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04 docker installation


docker build -t webapp . 
docker run -d -p 80:8080 webapp


docker run -t -i --privileged webapp /bin/bash



ADD portfolio.war /usr/local/tomcat/webapps/
COPY server.xml /usr/local/tomcat/conf/


rsa-key-20191106


certbot certonly --webroot -w /usr/local/tomcat/webapps/ -d isaurabh.me



docker run --name some-nginx -d -p 8080:80 some-content-nginx



docker save -o C:\Windows\System32\cmd.exe myimages


docker system prune -a



https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index


docker run -d -p 80:8080 -p 8443:8443 webapp



https://medium.com/@nh3500/how-to-create-self-assigned-ssl-for-local-docker-based-lamp-dev-environment-on-macos-sierra-ab606a27ba8a


SSLCertificateFile      /etc/letsencrypt/live/[dir]/cert.pem
SSLCertificateKeyFile   /etc/letsencrypt/live/[dir]/privkey.pem
SSLCertificateChainFile /etc/letsencrypt/live/[dir]/chain.pem



certbot certonly --standalone -d isaurabh.me -n --force-renewal


docker run -p 80:80 -p 443:443 68b57f0b6302 apache2-foreground
