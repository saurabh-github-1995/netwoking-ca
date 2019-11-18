FROM php:7.1-apache
RUN apt-get update && \
    apt-get install -y \
        zlib1g-dev
		
COPY portfolio /var/www/html/portfolio		
COPY isaurabh /etc/apache2/ssl/isaurabh
COPY dev.conf /etc/apache2/sites-enabled/dev.conf
RUN docker-php-ext-install mysqli pdo pdo_mysql zip mbstring
RUN a2enmod rewrite
RUN a2enmod ssl
RUN service apache2 restart