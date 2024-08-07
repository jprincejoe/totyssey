# Node and tag, development stage
FROM node:18-bookworm-slim as development

# Set working directory
WORKDIR /app

# Copy package.json to working directory (/app)
COPY package*.json ./

# Install the depdendencies, using ci (clean install) to install exact versions in package.json
RUN npm ci

# Copy everything from our current directory (where the Dockerfile is) to the working directory (/app)
COPY . .

# Run build command first so it's done before the production stage and only have JS in the dist and not TS
RUN npm run build

# Start the server with the command from package.json
CMD ["npm", "run", "dev"]

# Node and tag, production stage
FROM node:18-bookworm-slim as production

# Set working directory
WORKDIR /app

# Copy package.json to working directory (/app)
COPY package*.json ./

# Install the depdendencies, using ci (clean install) to install exact versions in package.json, and do so only for production (won't install dev dependencies)
RUN npm ci --only=production

# Copy dist so we only have JS and not TS files
COPY --from=development /app/dist ./dist

# Run it from the dist folder
CMD ["node", "dist/index.js"]