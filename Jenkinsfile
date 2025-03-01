pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "sailbot/react-app"
        DOCKER_CREDENTIALS = "docker-hub-credentials"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         script {
        //             sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
        //         }
        //     }
        // }

        // stage('Login to Docker Hub') {
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
        //             sh "echo \$DOCKER_HUB_PASSWORD | docker login -u \$DOCKER_HUB_USERNAME --password-stdin"
        //         }
        //     }
        // }

        // stage('Push to Docker Hub') {
        //     steps {
        //         script {
        //             sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
        //         }
        //     }
        // }

        // stage('Cleanup') {
        //     steps {
        //         sh "docker rmi ${DOCKER_IMAGE}:${IMAGE_TAG} || true"
        //     }
        // }
    }

    post {
        success {
            echo "Docker Hub에 성공적으로 업로드됨!!!!!!!!!"
        }
        failure {
            echo "빌드 또는 업로드 실패!!!!!!"
        }
    }
}