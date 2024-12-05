# Use a lightweight Node.js image for the build stage
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js app
RUN npm run build

# Use a minimal image for the runtime stage
FROM node:18-alpine as runtime

# Set the working directory
WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN npm install --production

# Expose the default Next.js port
EXPOSE 3000

# Command to start the Next.js server
CMD ["npm", "run", "start"]
