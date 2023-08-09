# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the application code into the container
COPY . .

# Install Chromium and other necessary dependencies
RUN apt-get update \
    && apt-get -y install chromium

# Set the Chrome binary path as an environment variable
ENV CHROME_BIN=/usr/bin/chromium

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install application dependencies
RUN npm install

# Build the Angular app
RUN ng build

# Install NGINX
RUN apt-get install -y nginx

# Remove the default NGINX configuration
RUN rm /etc/nginx/nginx.conf

# Copy your custom NGINX configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular app to the NGINX html directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
