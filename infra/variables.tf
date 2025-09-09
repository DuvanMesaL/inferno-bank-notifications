variable "project" {
  type    = string
  default = "inferno-bank-notifications"
}

variable "stage" {
  type    = string
  default = "dev"
}

locals {
  table_name = "notifications-table"
  queue_name = "inferno-bank-notifications-${var.stage}-events"
}
