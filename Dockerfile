# Use the official Chrome Headless Docker image
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the application code into the container
COPY . .

# Install Node.js
RUN apk add --update nodejs npm

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install application dependencies
RUN npm install

# Expose port 9876 for Karma tests
EXPOSE 9876

# Run the tests using the Angular CLI command
CMD ng test --watch=false --browsers=ChromeHeadless
