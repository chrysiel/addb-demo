# étape de build
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# étape de production
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## npm install -D babel-loader @babel/core @babel/preset-env
## docker build -t vuejs/manager-one-demo .
## docker run -it -p 8080:80 --rm --name dockerized-vuejs-manager-one-demo vuejs/manager-one-demo