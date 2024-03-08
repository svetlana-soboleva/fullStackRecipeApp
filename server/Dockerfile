# Start from the updated base image
FROM node:18.19.0-alpine3.18 AS builder

WORKDIR /recipeApp

COPY ../package*.json .
COPY client/package*.json client/
COPY server/package*.json server/
RUN npm ci


COPY server/ server/


WORKDIR /recipeApp/server
RUN npm run build

EXPOSE 3000

# Default command
CMD ["npm", "run", "start"]
