# movie_api
using html, js, github

# 2.10 code to to import local data into remote database
mongoimport --host myflixdb-shard-00-01.fy3kg.mongodb.net:27017 --ssl --username <username> --password <password> --authenticationDatabase admin --db <database> --collection <collections> --type json --file <file path>
