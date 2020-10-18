set JAVA_HOME=c:\Program Files\Java\jdk-15\
call mvn clean install
set JAVA_HOME=c:\Program Files\Java\jdk-15\
rem call mvn exec:java -Dexec.mainClass="com.example.utils.MakeExamples" -Dexec.args="from-mvn" -D--enable-preview
"%JAVA_HOME%\bin\java.exe" --enable-preview -classpath target\classes com.example.utils.MakeExamples from-mvn