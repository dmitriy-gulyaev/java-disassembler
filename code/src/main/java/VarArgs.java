import java.util.Arrays;

class VarArgs {

  static void printVarArgs(String... args) {
    System.out.println(Arrays.toString(args));
  }

  static void print(int i) {
    String.format("Value of i = %s.", i);
  }

  private void doPrint() {
    printVarArgs("one", "two");
    printVarArgs(null);
    printVarArgs();
  }

}
