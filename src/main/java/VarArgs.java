import java.util.Arrays;

class VarArgs {

  void accept(String... args) {
    Arrays.toString(args);
  }

  void acceptOne() {
    accept("one");
  }

  void acceptTwo() {
    accept("one", "two");
  }

  void acceptNull() {
    accept(null);
  }

  void acceptNone() {
    accept();
  }
}
