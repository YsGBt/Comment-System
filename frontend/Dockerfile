# Use an official Node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite will run on in development mode
EXPOSE 5173

# Command to run the Vue.js development server
# IMPORTANT: Use '--host 0.0.0.0' to ensure Vite binds to all interfaces, 
# making it accessible from outside the container via Docker port mapping.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]