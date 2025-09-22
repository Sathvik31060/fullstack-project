pipeline {
    agent any

    tools {
        jdk 'JDK_HOME'
        maven 'MAVEN_HOME'
    }

    environment {
        BACKEND_DIR = 'car-backend/car-backend-main'
        FRONTEND_DIR = 'car-frontend/car-frontend-main'

        TOMCAT_URL = 'http://54.172.46.66:9091/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'back2.war'
        FRONTEND_WAR = 'car-frontend.war'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Sathvik31060/fullstack-project.git', branch: 'main'
            }
        }

        stage('Build Frontend (Vite)') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    script {
                        def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                        env.PATH = "${nodeHome}/bin:${env.PATH}"
                    }
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        mkdir -p car-frontend_war/WEB-INF
                        cp -r dist/* car-frontend_war/
                        jar -cvf ../../${FRONTEND_WAR} -C car-frontend_war .
                    """
                }
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'mvn clean package'
                    sh "cp target/*.war ../../${BACKEND_WAR}"
                }
            }
        }

        stage('Deploy Backend to Tomcat (/back2)') {
            steps {
                script {
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                          --upload-file ${BACKEND_WAR} \\
                          "${TOMCAT_URL}/deploy?path=/springapp1&update=true"
                    """
                }
            }
        }

        stage('Deploy Frontend to Tomcat (/car-frontend)') {
            steps {
                script {
                    sh """
                        curl -u ${TOMCAT_USER}:${TOMCAT_PASS} \\
                          --upload-file ${FRONTEND_WAR} \\
                          "${TOMCAT_URL}/deploy?path=/frontapp1&update=true"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Backend deployed: http://54.172.46.66:9091/back2"
            echo "✅ Frontend deployed: http://54.172.46.66:9091/car-frontend"
        }
        failure {
            echo "❌ Build or deployment failed"
        }
    }
}
