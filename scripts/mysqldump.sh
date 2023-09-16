#!/usr/bin/env bash

# Nasty hack to emulate `realpath` on OSX
SCRIPT_PATH=$(perl -e 'use Cwd "abs_path"; print abs_path(shift)' "$0")

# Hardcode the database name here
MYSQL_DATABASE="wordpress_db"

printf "\e[36mDumping database tables...\e[0m\n"
if ! docker-compose -f "$(dirname "$SCRIPT_PATH")/../docker-compose.yml" exec db mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" -hlocalhost --all-databases -v --skip-comments -r /docker-entrypoint-initdb.d/"$MYSQL_DATABASE".sql && gzip -9vf /docker-entrypoint-initdb.d/"$MYSQL_DATABASE".sql; then
  printf "\e[31mFAIL\e[0m\tFailed to dump database\n"
  exit 2
fi

printf "\e[32mOK\e[0m\n"

# Set the name of the SQL dump file
SQL_DUMP_FILE="$MYSQL_DATABASE.sql.gz"

# Download the SQL dump to the local machine
if ! docker cp "$(docker-compose -f "$(dirname "$SCRIPT_PATH")/../docker-compose.yml" ps -q db):/docker-entrypoint-initdb.d/$SQL_DUMP_FILE" "$(dirname "$SCRIPT_PATH")/../sql/$SQL_DUMP_FILE"; then
  printf "\e[31mFAIL\e[0m\tFailed to download SQL dump\n"
  exit 3
fi

printf "\e[32mDownloaded SQL dump to sql/$SQL_DUMP_FILE\e[0m\n"
