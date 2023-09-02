FROM node:6.9.2
LABEL maintainer=siggame@mst.edu

ADD . vis
WORKDIR vis

RUN npm install --ignore-scripts
RUN npm run bundle

EXPOSE 8080

CMD ["npm", "run", "visualizer"]
