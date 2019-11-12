FROM tomcat
LABEL maintainer="deepak@softwareyoga.com"
ADD ssl_certs /usr/local/tomcat/conf/ssl_certs
#RUN rm -rf /usr/local/tomcat/webapps/ROOT
ADD ROOT /usr/local/tomcat/webapps/ROOT
ADD server.xml /usr/local/tomcat/conf/

EXPOSE 8080
EXPOSE 8443
CMD ["catalina.sh", "run"]