# Use an official Node.js runtime as the base image
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy the package files
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application source code
COPY . .

# Expose the port Vue uses
EXPOSE 8080

# Run the Vue development server
CMD ["npm", "run", "serve"]
