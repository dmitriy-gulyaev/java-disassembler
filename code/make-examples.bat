set JAVA_HOME=c:\Program Files\Java\jdk-16\
call mvn clean install
set JAVA_HOME=c:\Program Files\Java\jdk-16\
"%JAVA_HOME%\bin\java.exe" --enable-preview -classpath target\classes com.example.utils.MakeExamples from-mvn