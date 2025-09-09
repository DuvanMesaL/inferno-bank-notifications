

# Inferno Bank - Notifications Microservice

Microservicio encargado de la **gestión y envío de notificaciones** dentro del ecosistema de **Inferno Bank**.
Se integra con los microservicios de `users` y `transactions` para comunicar eventos relevantes a través de diferentes canales.

## 🚀 Características

* Procesamiento de eventos de otros microservicios mediante **SQS**.
* Persistencia de notificaciones en **DynamoDB**.
* Exposición de endpoints a través de **API Gateway**.
* Funciones serverless implementadas en **AWS Lambda**.
* Despliegue con **Terraform** (IaC).

## 📂 Estructura del proyecto

```
infra/              # Definiciones de infraestructura con Terraform
  apigw.tf          # API Gateway para exponer endpoints
  dynamodb.tf       # Tabla DynamoDB para almacenar notificaciones
  iam.tf            # Roles y políticas IAM
  lambda.tf         # Configuración de Lambdas
  sqs.tf            # Cola SQS para eventos de integración
  variables.tf      # Variables de configuración
  outputs.tf        # Valores de salida de Terraform
app/                # Código de la aplicación
msg.json            # Ejemplo de payload de notificación
README.md           # Documentación del microservicio
```

## ⚙️ Requisitos previos

* [Node.js 20+](https://nodejs.org/)
* [Terraform](https://www.terraform.io/downloads.html)
* [AWS CLI](https://aws.amazon.com/cli/) configurado con credenciales válidas

## 🛠️ Despliegue

1. Inicializar Terraform:

   ```bash
   terraform init
   ```
2. Revisar y aplicar la infraestructura:

   ```bash
   terraform plan
   terraform apply
   ```
3. Obtener el endpoint de la API:

   ```bash
   terraform output api_invoke_url
   ```

## 🌐 Endpoints principales

* `POST /notifications/send` → Enviar una nueva notificación.
* `GET /notifications/{id}` → Obtener notificación por ID.
* `GET /notifications/user/{userId}` → Listar notificaciones de un usuario.

## 🔗 Integraciones

* **Users Microservice**: genera notificaciones al registrar usuarios o actualizar datos.
* **Transactions Microservice**: emite eventos de movimientos y transacciones para notificar al cliente.

## 📜 Licencia

Proyecto académico para **Sistemas Distribuidos** –Fundiacion Universitaria Colombo Internacional.
Uso interno con fines educativos. 


