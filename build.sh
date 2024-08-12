export JAVA_HOME=/home/dima/work/tools/jdk/jdk-21/
mvn clean install
mvn exec:java -Dexec.mainClass="com.example.utils.MakeExamples"
mvn exec:java -Dexec.mainClass="com.example.utils.MakeIndex"
