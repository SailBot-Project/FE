pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sailbot/react-app"
        DOCKER_CREDENTIALS = "docker-hub-credentials"
        IMAGE_TAG = "latest"
        DEPLOY_SERVER = "54.180.152.40"
        DEPLOY_USER = "ec2-user"
        CONTAINER_NAME = "frontend-container"
    }
    options {
        disableConcurrentBuilds()  // 동시에 여러 빌드 실행 방지
        buildDiscarder(logRotator(numToKeepStr: '10')) // 오래된 빌드 자동 삭제
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    sh """
                    docker buildx create --use || true  # 이미 buildx 인스턴스가 있으면 패스
                    docker buildx inspect --bootstrap  # buildx 활성화 확인
                    docker buildx build --platform linux/amd64 -t ${DOCKER_IMAGE}:${IMAGE_TAG} --push .
                    """
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sh """
                        ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_SERVER << EOF
                        echo "Stopping and removing existing container..."
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                        
                        echo "Pulling new Docker image..."
                        docker pull $DOCKER_IMAGE
                        
                        echo "Starting new container..."
                        docker run -d -p 80:80 --name $CONTAINER_NAME $DOCKER_IMAGE
                        
                        EOF
                        """
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${DOCKER_IMAGE}:${IMAGE_TAG} || true"
            }
        }
    }

    post {
        success {
            echo "Docker Hub에 성공적으로 업로드됨!"
        }
        failure {
            echo "빌드 또는 업로드 실패"
        }
    }
}