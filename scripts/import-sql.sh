#!/usr/bin/env bash

# Get the current directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Set the database credentials
MYSQL_USER="root"
MYSQL_PASSWORD="root"
MYSQL_DATABASE="wordpress_db"

# Specify the path to your SQL dump file (relative to the script's directory)
SQL_DUMP_FILE="$SCRIPT_DIR/../sql/wordpress_db.sql"

# Check if the SQL dump file exists
if [ ! -f "$SQL_DUMP_FILE" ]; then
  echo "SQL dump file not found: $SQL_DUMP_FILE"
  exit 1
fi

# Import the SQL dump file into the MySQL container
docker-compose exec -T mysql mysql -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < "$SQL_DUMP_FILE"

if [ $? -eq 0 ]; then
  echo "SQL dump imported successfully."
else
  echo "Failed to import SQL dump."
  exit 2
fi
