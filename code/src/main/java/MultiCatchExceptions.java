import java.net.MalformedURLException;
import java.text.ParseException;

class MultiCatchExceptions {

  void catchMalformedURLExceptionAndParseException() throws MalformedURLException, ParseException {
    try {
      malformedURLException();
      parseException();
    } catch (MalformedURLException | ParseException exception) {
      exception.hashCode();
      throw exception;
    }
  }

  void catchMalformedURLExceptionAndParseException2() throws MalformedURLException, ParseException {
    try {
      malformedURLException();
      parseException();
    } catch (Exception exception) {
      throw exception;
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
  }

  void parseException() throws ParseException {
  }

}
