# Use Node.js base image
FROM node:14

# Install necessary dependencies, including Chrome
RUN apt-get update \
    && apt-get install -yq libgconf-2-4 libxi6 libgconf-2-4

RUN apt-get update \
    && apt-get -q -y install google-chrome-stable

# Set the Chrome binary path as an environment variable
ENV CHROME_BIN=/usr/bin/google-chrome

# Set the working directory
WORKDIR /app

# Copy the application code into the container
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install application dependencies
RUN npm install

# Expose port 9876 for Karma tests
EXPOSE 9876

# Run the tests using the Angular CLI command
CMD ng test --watch=false --browsers=ChromeHeadless
