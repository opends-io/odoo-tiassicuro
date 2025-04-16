pipeline {
    agent any

    parameters {
         string(name: "targetserver", defaultValue: "192.168.1.115")
    }
    stages {
        stage('start') {
            steps {
                script {
                    echo 'Starting the pipeline...'
                    sh 'ls -s'
                    sh 'ssh root@$targetserver ls -l'
                    sh 'ssh root@$targetserver  mkdir -p /var/opt/wgo'
                    sh 'ssh root@$targetserver systemctl status odoo'
                    sh 'ssh root@$targetserver systemctl stop odoo'
                    sh 'ssh root@$targetserver systemctl status odoo'
                    sh 'rsync -az addons/ root@$targetserver:/var/opt/wgo/'
                    sh 'ssh root@$targetserver systemctl start odoo'
                    sh 'ssh root@$targetserver systemctl status odoo'
                }
            }
        }
    }
}