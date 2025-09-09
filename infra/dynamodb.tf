resource "aws_dynamodb_table" "notifications" {
  name         = local.table_name
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "userId"
  range_key = "notifId"

  attribute {
    name = "userId"
    type = "S"
  }
  attribute {
    name = "notifId"
    type = "S"
  }

  tags = {
    Project = var.project
    Stage   = var.stage
  }
}
