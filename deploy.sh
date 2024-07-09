#!/bin/bash
# Name: deploy.sh
# Date: Tuesday, 9 July 2024 09.00 WIB
# Usage: Ubuntu Linux Server Deployment Shell Script
# Author: Hendi Santika
# https://s.id/hendisantika
# -------------------------------------------------------------------
ssh -p "${SERVER_PORT}" "${SERVER_USERNAME}"@"${SERVER_HOST}" -i key.txt -t -t -o StrictHostKeyChecking=no << 'ENDSSH'
cd ~/user-management
cat .env
set +a
source .env
start=$(date +"%s")
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ECR_REGISTRY
docker pull $AWS_ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

if [ "$(docker ps -qa -f name=$CONTAINER_NAME)" ]; then
    if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        echo "Container is running -> stopping it..."
        docker system prune -af
        docker stop $CONTAINER_NAME;
        docker rm $CONTAINER_NAME
    fi
fi

docker run -d --rm -p 3000:3000 --env-file .env --name $CONTAINER_NAME  $AWS_ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
exit
ENDSSH

if [ $? -eq 0 ]; then
  exit 0
else
  exit 1
fi

end=$(date +"%s")

diff=$(($end - $start))

echo "Deployed in : ${diff}s"
