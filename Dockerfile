# Use the official Node.js image as the base image
FROM node:14 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the Angular app
RUN npm run build --configuration=production

# Install NGINX
RUN apt-get install -y nginx

# Remove the default NGINX configuration
RUN rm /etc/nginx/nginx.conf

# Copy your custom NGINX configuration to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Angular app to the NGINX html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for NGINX
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
