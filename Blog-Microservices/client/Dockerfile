# Use minimal version of node as the base image
FROM node:alpine

# Configuring environment variables to workaround create-react-app deployment bugs
ENV CI=true
ENV WDS_SOCKET_PORT=0

# Change the working directory inside the container to ./app
WORKDIR /app

# Copy package.json file first, to minimize cache invalidation and thus improve rebuild time
COPY ./package.json ./

# Install all required dependencies inside the intermediate container
RUN npm install

# Copy over ALL files inside the build context to the intermediate container
COPY ./ ./

# Set the primary startup command in the output image to be "npm start"
CMD ["npm", "start"]