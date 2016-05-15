provider "aws" {
    profile = "keyboardwritescode"
    region = "us-east-1"
}

resource "aws_dynamodb_table" "example-user" {
    name = "KeyboardwritescodeAdtUser"
    read_capacity = 5
    write_capacity = 5
    hash_key = "userId"
    range_key = "email"
    attribute {
        name = "email"
        type = "S"
    }
    attribute {
        name = "userId"
        type = "S"
    }
    local_secondary_index {
        name = "KeyboardwritescodeAdtUserIndex"
        range_key = "email"
        projection_type = "INCLUDE"
        non_key_attributes = [ "email" ]
    }
}
