class TryCatchFinally {

  void m(Object obj) {
    try {
      obj.hashCode();
    } catch (StringIndexOutOfBoundsException e) {
      e.getMessage();
    } finally {
      obj.getClass();
    }

  }
}
