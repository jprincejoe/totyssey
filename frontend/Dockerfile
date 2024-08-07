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

ARG VITE_API_URL
RUN VITE_API_URL=${VITE_API_URL} npm run build

# Production stage
FROM caddy:2-alpine as production

COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=development /app/dist /srv