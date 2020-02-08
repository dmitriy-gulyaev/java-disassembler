class TryCatchFinally {

  void m() {
    String str = "string";
    try {
      str.charAt(111);
    } catch (StringIndexOutOfBoundsException e) {
      e.getMessage();
    } finally {
      str.hashCode();
    }
  }

}
