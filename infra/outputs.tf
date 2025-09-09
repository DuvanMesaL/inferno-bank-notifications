output "api_invoke_url" {
  value = "https://${aws_api_gateway_rest_api.api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com/${aws_api_gateway_stage.stage.stage_name}"
}

output "notifications_table_name" {
  value = aws_dynamodb_table.notifications.name
}

output "notifications_queue_url" {
  value = aws_sqs_queue.events.id
}
