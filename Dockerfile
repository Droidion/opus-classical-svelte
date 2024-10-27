# Use the official Bun image as the base
FROM oven/bun:1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN bun run build

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["bun", "run", "start"]