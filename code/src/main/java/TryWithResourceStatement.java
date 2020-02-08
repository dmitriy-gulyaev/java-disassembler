import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;

class TryWithResourceStatement {

  void m(Reader reader) throws IOException {
    try (BufferedReader br = new BufferedReader(reader)) {
      br.toString();
    }
  }

}
