# Manually configure and run the server application in your self-hosted cloud server
1. Clone (at least) ScmServer source code to the server
2. Uncomment settings in application.properties
3. Set environment variables (defined in application.properties)
4. mvn package
5. java -jar <package_name_in_target_folder>