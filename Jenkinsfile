pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sailbot/react-app"
        DOCKER_CREDENTIALS = "docker-hub-credentials"
        IMAGE_TAG = "latest"
    }
    options {
        disableConcurrentBuilds()  // 동시에 여러 빌드 실행 방지
        buildDiscarder(logRotator(numToKeepStr: '10')) // 오래된 빌드 자동 삭제
    }

    triggers {
        pollSCM('H/5 * * * *') // 5분마다 GitHub 변경 사항 확인
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
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
            echo "빌드 또는 업로드 실패!!!!!"
        }
    }
}