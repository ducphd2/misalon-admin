
# # Stage 1: Build React app
# FROM node:14-alpine as build

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json yarn.lock ./

# # Install dependencies
# RUN yarn install --frozen-lockfile

# # Copy the source code
# COPY . /app/

# # Build the app
# RUN yarn build

# # Stage 2: Serve the React app using Nginx
# FROM nginx:stable 

# # Copy the built app from the previous stage
# COPY --from=build /app/build /var/www/dist/
# COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

# # Expose the port
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]




# set the base image
# n/b: for production, node is only used for building 
# the static Html and javascript files
# as react creates static html and js files after build
# these are what will be served by nginx
# use alias build to be easier to refer this container elsewhere
# e.g inside nginx container
FROM node:14-alpine as build
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY . /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache dependencies

RUN yarn install

#build the project for production
RUN yarn build
# set up production environment
# the base image for this is an alpine based nginx image
FROM nginx:alpine
# copy the build folder from react to the root of nginx (www)
COPY --from=build /app/build /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx.conf /etc/nginx/conf.d
# --------- /only for those using react router ----------
# expose port 80 to the outer world
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]