Thanks for downloading this theme!

Theme Name: DevFolio
Theme URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
Author: BootstrapMade.com
Author URL: https://bootstrapmade.com




https://aspetraining.com/resources/blog/deploying-your-first-web-app-to-tomcat-on-docker docker tomcat
https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04 docker installation



docker run -p 80:8080 mywebapp


docker run -t -i webapp /bin/bash



ADD portfolio.war /usr/local/tomcat/webapps/
COPY server.xml /usr/local/tomcat/conf/