pipeline {
    agent any

    tools {
        jdk 'JDK21'        // Make sure JDK 21 is installed in Jenkins
        maven 'MAVEN_HOME'
    }

    environment {
        BACKEND_DIR = 'car-backend'
        FRONTEND_DIR = 'car-frontend'

        TOMCAT_URL = 'http://54.172.46.66:9091/manager/text'
        TOMCAT_USER = 'admin'
        TOMCAT_PASS = 'admin'

        BACKEND_WAR = 'backend.war'
        FRONTEND_WAR = 'frontend.war'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Sathvik31060/fullstack-project.git', branch: 'main'
            }
        }

        stage('Setup Node') {
            steps {
                script {
                    def nodeHome = tool name: 'NODE_HOME', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }
            }
        }

        stage('Build Frontend (Vite)') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'chmod +x node_modules/.bin/vite'  // Fix permission
                    sh 'npm run build'
                }
            }
        }

        stage('Package Frontend as WAR') {
            steps {
                dir("${env.FRONTEND_DIR}") {
                    sh """
                        rm -rf frontend_war
                        mkdir -p frontend_war/WEB-INF
                        cp -r dist/* frontend_war/
                        jar -cvf ../${FRONTEND_WAR} -C frontend_war .
                    """
                }
            }
        }

        stage('Build Backend (Spring Boot WAR)') {
            steps {
                dir("${env.BACKEND_DIR}") {
                    sh 'mvn clean package -DskipTests'
                    sh "cp target/*.war ../${BACKEND_WAR}"
                }
            }
        }

        stage('Deploy Backend to Tomcat (/springapp1)') {
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

        stage('Deploy Frontend to Tomcat (/frontapp1)') {
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
            echo "✅ Backend deployed: http://54.172.46.66:9091/springapp1"
            echo "✅ Frontend deployed: http://54.172.46.66:9091/frontapp1"
        }
        failure {
            echo "❌ Build or deployment failed"
        }
    }
}
