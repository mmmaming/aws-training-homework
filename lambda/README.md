1. 什么是Serverless

> Serverless 是指构建和运行不需要服务器管理的应用程序的概念。无服务器计算是一种**按需提供后端服务**的方法。无服务器提供程序允许用户编写和部署代码，而不必担心底层基础结构。从无服务器供应商处获得后端服务的公司将根据其计算费用，而不必保留和支付固定数量的带宽或服务器数量，因为该服务是自动扩展的。请注意，尽管称为无服务器，但仍使用物理服务器，但开发人员无需了解它们。

3. Create lambda function via aws cli with ZIP file and invoke

1. 创建两个S3 bucket， 分别是源bucket和目标bucket，负责存放源文件和copy后的文件.
2. 创建lambda函数的IAM策略和执行角色（从源S3bucket获取对象，将获取到的对象存到目标bucket，将日志写入cloudwatch logs）
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:PutLogEvents",
                "logs:CreateLogGroup",
                "logs:CreateLogStream"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::mybucket/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::mybucket-resized/*"
        }
    ]
}  
```
3. 创建lambda函数
4. 上传lambda函数到aws lambda
`aws lambda create-function --function-name ming-lambda-function1 --zip-file fileb://function.zip --handler index.handler --runtime nodejs12.x --role arn:aws:iam::160071257600:role/ming-lambda-s3-role --profile aws-training`
5. 配置S3以触发lambda
5.1 授予S3权限调用lambda
```
 aws lambda add-permission --function-name ming-lambda-function1 --principal s3.amazonaws.com \
--statement-id s3invoke --action "lambda:InvokeFunction" \
--source-arn arn:aws:s3:::ming-source \
--source-account 160071257600 --profile aws-training
```
5.2 在源S3中创建事件通知
```
事件名称 – lambda-trigger

事件类型 – All object create events

目标 – Lambda function

Lambda 函数 – CreateThumbnail
```
6. 更新lambda函数
`aws lambda update-function-code --function-name ming-lambda-function1 --zip-file fileb://function.zip  --profile aws-training`

