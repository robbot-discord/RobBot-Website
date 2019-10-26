pipeline {
    agent {
        kubernetes {
            defaultContainer 'kaniko'
            yaml """
kind: Pod
spec:
    containers:
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      imagePullPolicy: IfNotPresent
      command:
      - /busybox/sh
      tty: true
"""
        }
    }
    
    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '5', numToKeepStr: '20')
        timeout(15)
        disableConcurrentBuilds()
    }

    parameters {
        credentials credentialType: 'com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl', defaultValue: 'aws_jenkins_s3', description: 'AWS Credentials to use to publish', name: 'AWS_CREDENTIALS', required: true
        string defaultValue: 'www.robbot.app', description: 'AWS S3 Bucket to push to', name: 'AWS_S3_BUCKET', trim: true
    }

    stages {
        stage("Checkout") {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: scm.branches,
                    doGenerateSubmoduleConfigurations: true,
                    extensions: scm.extensions + [[$class: 'SubmoduleOption', parentCredentials: true]],
                    userRemoteConfigs: scm.userRemoteConfigs
                ])
            }
        }
        stage("Build and Deploy"){
            steps {
                echo "Params used:"
                echo "${params}"
                echo "---"

                echo "env | sort"
                sh "env | sort"
                echo "---"

                withCredentials([usernamePassword(credentialsId: "${params.AWS_CREDENTIALS}", passwordVariable: 'awsSecretAccessKey', usernameVariable: 'awsAccessKeyId')]) {
                    sh "/kaniko/executor " +
                        "-f `pwd`/build.Dockerfile " +
                        "-c `pwd` " +
                        "--build-arg 'awsAccessKeyId=${awsAccessKeyId}' " +
                        "--build-arg 'awsSecretAccessKey=${awsSecretAccessKey}' " +
                        "--build-arg 'targetS3Bucket=${params.AWS_S3_BUCKET}' "+
                        "--no-push"
                }
            }
        }
    }
}
