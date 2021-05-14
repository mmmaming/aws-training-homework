1. 启动minikube 
`minikube start`

2. 将本地docker 仓库指向minikube中的docker 仓库(只对当前terminal生效)
`eval $(minikube docker-env)`

3. build  docker image
`docker build -t app:latest .`

4.创建create deployment yaml 文件,其中sepc中的imagePullPolicy要设置为Never，改变k8s pull image的方式.

5.运行yaml文件
`kubectl apply -f create-deployment.yaml`

6. 启动dashboard 或者通过命令查看集群
`minikube dashboard` 

`kubectl get deployments`

7.使用NodePort的方式创建service并暴露8080端口（注意应用里的端口应该和这里的端口保持一致）
`kubectl expose deployment k8s-demo-deployment --type=NodePort --port=8080`

8. 使用节点端口信息访问服务（返回minikube中的ip和端口）
`minikube service k8s-demo-deployment --url`

9.通过Ingress资源访问minikube内部应用. 首先开启Ingress插件
`minikube addons enable ingress`
`kubectl apply -f ./create-ingress.yaml`

10.在/etc/hosts中添加以下内容，然后访问hello-world.info即可(注： ip地址可以通过minikube ip获得)
`192.168.64.2 hello-world.info`

11.使用port-forward将本地请求转发到pod
`kubectl port-forward demo-76bc476459-kktcz 7001:8080`

12. 本地访问127.0.0.1:7001
`curl 127.0.0.1:7001`

13. 扩容
`kubectl scale deployments/demo --replicas=4`

14. 缩容
`kubectl scale deployments/demo --replicas=2`
