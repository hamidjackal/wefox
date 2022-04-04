FROM node:alpine

WORKDIR /app
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY .eslintrc.js .
RUN npm install 
COPY . .

CMD ["npm","run","start:prod"]