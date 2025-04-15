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
                    sh 'ssh root@$server "ls -l"'
                }
            }
        }
    }
}