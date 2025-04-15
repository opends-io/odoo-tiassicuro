pipeline {
    agent any

    parameters {
         string(name: "target-server", defaultValue: "locahost")
    }
    stages {
        stage('start') {
            steps {
                script {
                    echo 'Starting the pipeline...'
                    sh 'ls -s'
                    sh 'ssh root@$target-server ls -l'
                    sh 'ssh root@target-server  mkdir -p /var/opt/wgo'
                    sh 'rsync -az addons/ root@target-server :/var/opt/wgo'
                }
            }
        }
    }
}