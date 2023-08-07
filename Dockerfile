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

# Build the Angular app (replace 'your-build-command' with the actual build command for your Angular app)
RUN npm run your-build-command

# Use a smaller and more efficient base image for serving the Angular app
FROM nginx:latest

# Copy the built Angular app files from the previous stage to the nginx container
COPY --from=build-stage /app/dist/your-app-name /usr/share/nginx/html

# Expose the port on which the Angular app will run (default is 80 for Nginx)
EXPOSE 80

# Start Nginx to serve the Angular app
CMD ["nginx", "-g", "daemon off;"]
