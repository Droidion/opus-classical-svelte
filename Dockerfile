# Use the official Bun image as the base image
FROM oven/bun:latest as builder
# Set the working directory in the container
WORKDIR /app
# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./
# Install dependencies
RUN bun install --frozen-lockfile
# Copy the rest of the application code
COPY . .
# Build the SvelteKit app
RUN bun run build
# Start a new stage for a smaller final image
FROM oven/bun:latest
WORKDIR /app
# Copy the built app from the previous stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
# Install only production dependencies
RUN bun install --frozen-lockfile
# Expose the port the app runs on
EXPOSE 9000
# Command to run the application
ENTRYPOINT ["bun", "./build"]