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

# Expose port 9876 for Karma tests
EXPOSE 9876

# Run the tests using the Angular CLI command
CMD ng test --watch=false --browsers=ChromeHeadlessNoSandbox
