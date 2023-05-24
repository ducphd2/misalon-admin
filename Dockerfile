
# Stage 1: Build React app
FROM node:14-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . /app/

# Build the app
RUN yarn build

# Stage 2: Serve the React app using Nginx
FROM nginx:stable 

# Copy the built app from the previous stage
COPY --from=build /app/build /var/www/dist/
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
