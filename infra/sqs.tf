resource "aws_sqs_queue" "events" {
  name = local.queue_name

  visibility_timeout_seconds = 30
  message_retention_seconds  = 345600
  receive_wait_time_seconds  = 10

  tags = {
    Project = var.project
    Stage   = var.stage
  }
}
