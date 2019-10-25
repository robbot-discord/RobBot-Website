FROM node:12-alpine AS build
WORKDIR /home/node

COPY . .
RUN npm ci 
RUN npm run build

FROM python:3-alpine AS publish
WORKDIR /usr/src
RUN pip3 install awscli

ARG awsAccessKeyId
ARG awsSecretAccessKey

RUN aws configure --set aws_access_key_id ${awsAccessKeyId} && \
    aws configure --set aws_secret_access_key ${awsSecretAccessKey}

COPY --from=build /home/node/dist/ .

ARG targetS3Bucket
RUN aws s3 cp . s3://${targetS3Bucket}/ --recursive 

# Noop, we never want to save this container
CMD ["/bin/sh"]
