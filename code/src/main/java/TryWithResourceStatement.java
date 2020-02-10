import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;

class TryWithResourceStatement {

  void m1() throws E {
    try (A a = new A()) {
      a.hashCode();
    }
  }

  void m2() throws E {
    try (A a = new A()) {
      a.hashCode();
    } catch (Exception e) {
        throw e;
    }
  }

  class A implements AutoCloseable {
    public void close() throws E{
      throw new E();
    }
  }

  class E extends Exception {
  }

}
