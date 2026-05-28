
// library identifier:"custom-lib@${env.BRANCH_NAME}",retriever:modernSCM(
//     [
//         $class:'GitSCMSource',
//         remote:'https://github.com/gvyshnaviyadav-ops/my-jenkins-lib.git',
//         credentialsID:'github-pat'
//         ]
//     )

pipeline {
    agent any

    stages {
        stage('Load Library') {
            steps {
                script {
                    def libBranch = env.BRANCH_NAME 
                      echo "Loading library branch: ${libBranch}"

                     library "my-jenkins-lib@${libBranch}"
                    //library "my-jenkins-lib@${env.BRANCH_NAME}"
                }
            }
        }

        stage('Checkout') {
            steps {
                git url: 'https://github.com/gvyshnaviyadav-ops/full_sd.git', branch: "${env.BRANCH_NAME}"
            }
        }

        stage('Build') {
            steps {
                
                script {
                     withCredentials([usernamePassword(
                credentialsId: 'docker-registry-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                
                sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                buildApp("${BUILD_NUMBER}","$DOCKER_USER")
                }}
            }
        }
        stage('security scan'){
            steps{
                script{
                     withCredentials([usernamePassword(
                credentialsId: 'docker-registry-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                
                sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
              sh "docker run  -v \${WORKSPACE}:/workspace --rm aquasec/trivy image --severity CRITICAL --exit-code 0 --format json  --output /workspace/trivy-frontend.json $DOCKER_USER/todo-frontend:${BUILD_NUMBER}"
               sh "docker run  -v \${WORKSPACE}:/workspace --rm aquasec/trivy image --severity CRITICAL --exit-code 0 --format json --output /workspace/trivy-backend.json  $DOCKER_USER/todo-backend:${BUILD_NUMBER}"
              //sh 'ls -la trivy-*.json'
                }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                     withCredentials([usernamePassword(
                credentialsId: 'docker-registry-creds',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
            )]) {
                    deployApp("todoapp","${BUILD_NUMBER}","${DOCKER_USER}")}
                }
            }
        }
    }
    post{
    always{
         archiveArtifacts artifacts: 'trivy-*.json', allowEmptyArchive: true
    }
}
}

