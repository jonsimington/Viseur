FROM --platform=linux/amd64 node:18-alpine
LABEL maintainer=siggame@mst.edu

RUN apk add --no-cache python3 make g++

ADD . vis
WORKDIR vis

RUN npm install
RUN npm run bundle

EXPOSE 8080

CMD ["npm", "run", "visualizer"]
