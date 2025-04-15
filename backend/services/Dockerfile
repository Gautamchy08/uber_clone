# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the backend code
COPY . .

# Expose the backend port (change if you're using a different one)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
