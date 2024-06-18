FROM node:lts-alpine

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Generate prisma client
RUN npx prisma generate

# Build app
RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/index.js" ]
