import java.net.MalformedURLException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;

class MultiCatchExceptions {

  void catchMalformedURLExceptionAndParseException() {
    try {
      malformedURLException();
      parseException();
    } catch (MalformedURLException | ParseException exception) {
      exception.hashCode();
    }
  }

  void catchMalformedURLException() {
    try {
      malformedURLException();
    } catch (MalformedURLException exception) {
      exception.hashCode();
    }
  }

  void catchParseException() {
    try {
      parseException();
    } catch (ParseException exception) {
      exception.hashCode();
    }
  }

  void malformedURLException() throws MalformedURLException {
    new URL("");
  }

  void parseException() throws ParseException {
    new SimpleDateFormat("").parse("");
  }

}
