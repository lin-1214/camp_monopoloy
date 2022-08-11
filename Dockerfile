FROM node:14.17-alpine
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/
# RUN yarn install-all

# Bundle app source
COPY . .
ENV PORT=3000
ENV NODE_ENV=production
ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL:-}
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL:-}
RUN yarn build-frontend

EXPOSE 3000
CMD [ "node", "index.js" ]