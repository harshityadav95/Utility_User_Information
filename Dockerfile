# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production=false

# Copy the rest of the app
COPY . .

# Build the Svelte app
RUN npm run build

# Expose Vite preview port
EXPOSE 4173

# Start the app in preview mode
CMD ["npm", "run", "preview", "--", "--host"]
