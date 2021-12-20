export JAVA_HOME=/home/dima/work/tools/jdk/jdk-17.0.1/
mvn clean install
mvn exec:java -Dexec.mainClass="com.example.utils.MakeExamples"
