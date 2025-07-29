# How to configure and run this server application
1. Clone ScmServer source code to the server
2. Download and install JDK (if it has not been installed). [Instruction](https://www.geeksforgeeks.org/installation-guide/download-and-install-java-development-kit-jdk-on-windows-mac-and-linux/)
3. Download and install Apache Maven (if it has not been installed). [Instruction](https://medium.com/nerd-for-tech/how-to-resolve-the-mvn-is-not-recognized-as-an-internal-or-external-command-operable-program-or-145914fcaaab).
4. Uncomment settings in `src/main/resources/application.properties`
5. Set environment variables which are defined in `application.properties` file (server_addr, db_name, db_username, db_password, port). Command in Windows PowerShell: `$env:<variable_name>="<value>"`
6. Run `mvn package`
7. Run `java -jar <package_name_in_target_folder>` (e.g. `java -jar target/ScmServer-0.0.1-SNAPSHOT.jar`)