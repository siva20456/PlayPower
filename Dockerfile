# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the SQLite database file
COPY models/mydatabase.db ./models/mydatabase.db

# Expose the port the app runs on
EXPOSE 3006

# Define the command to run the app
CMD ["node", "src/app.js"]
