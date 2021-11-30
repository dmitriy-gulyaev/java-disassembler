import java.util.Comparator;

class AnonymousClass {

  void m() {
    new Comparator<String>() {
      @Override
      public int compare(String a0, String a1) {
        return 10;
      }
    };
  }

}
