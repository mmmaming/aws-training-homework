#### 创建Deployment
1. 使用`kubectl create` 创建管理Pod的Deployment
> `kubectl create deployment hello-node --image=k8s.gcr.io/echoserver:1.4`

2. 查看Deployment
> `kubectl get deployments`

3. 查看Pod
> `kubectl get pods`

4. 查看集群事件
> `kubectl get events`

5. 查看`kubectl`配置
> `kubectl config view`

#### 创建Service

1. 使用 kubectl expose 命令将 Pod 暴露给公网：
   
> `kubectl expose deployment hello-node --type=LoadBalancer --port=8080`

`--type=LoadBalancer` 参数表明你希望将你的 Service 暴露到集群外部。

2. 查看创建的 Service

> `kubectl get services`

3. 运行service
> `minikube service hello-node`

#### 清理Service
```
kubectl delete service hello-node
kubectl delete deployment hello-node
```

可选地，停止 Minikube 虚拟机（VM）：

`minikube stop`

可选地，删除 Minikube 虚拟机（VM）：

`minikube delete`
