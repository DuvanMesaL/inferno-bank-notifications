resource "aws_lambda_function" "process" {
  function_name    = "${var.project}-${var.stage}-process"
  role             = aws_iam_role.lambda_role.arn
  runtime          = "nodejs20.x"
  handler          = "index.consumer"
  filename         = "${path.module}/app.zip"
  source_code_hash = filebase64sha256("${path.module}/app.zip")
  timeout          = 10

  environment {
    variables = {
      NOTIFICATIONS_TABLE = aws_dynamodb_table.notifications.name
    }
  }
}

resource "aws_lambda_function" "list" {
  function_name    = "${var.project}-${var.stage}-list"
  role             = aws_iam_role.lambda_role.arn
  runtime          = "nodejs20.x"
  handler          = "index.list"
  filename         = "${path.module}/app.zip"
  source_code_hash = filebase64sha256("${path.module}/app.zip")
  timeout          = 5

  environment {
    variables = {
      NOTIFICATIONS_TABLE = aws_dynamodb_table.notifications.name
    }
  }
}

resource "aws_lambda_event_source_mapping" "from_queue" {
  event_source_arn = aws_sqs_queue.events.arn
  function_name    = aws_lambda_function.process.arn
  batch_size       = 5
}
