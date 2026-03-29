FROM --platform=linux/amd64 node:18-alpine
LABEL maintainer=siggame@mst.edu

RUN apk add --no-cache python3 make g++

COPY . /vis
WORKDIR /vis

RUN npm install
RUN npm run bundle

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", ".", "-l", "8080"]
