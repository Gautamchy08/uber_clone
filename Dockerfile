# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Move build folder to backend
WORKDIR /app
RUN mv frontend/build backend/public

# Expose the port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
