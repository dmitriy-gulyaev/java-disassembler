call mvn clean install
call mvn exec:java -Dexec.mainClass="com.example.utils.MakeExamples" -Dexec.args="from-mvn"