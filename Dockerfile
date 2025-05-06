FROM node:14-slim

# Create app directory in container
RUN mkdir -p /app/

# Set /app directory as default working directory
WORKDIR /app

# Copy all file from current dir to /app in container
COPY . /app/

# Install app dependencies
RUN npm install

# Exposing Port
EXPOSE 9001

CMD [ "npm", "start" ]
