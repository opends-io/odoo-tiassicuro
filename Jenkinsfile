pipeline {
    agent any

    parameters {
         string(name: "targetserver", defaultValue: "192.168.1.117")
    }
    stages {
        stage('start') {
            steps {
                script {
                    echo 'Starting the pipeline...'
                    sh 'ls -s'
                    sh 'ssh root@$targetserver ls -l'
                    sh 'ssh root@$targetserver  mkdir -p /var/opt/wgo'
                    sh 'rsync -az addons/ root@$targetserver:/var/opt/wgo/'
                }
            }
        }
    }
}