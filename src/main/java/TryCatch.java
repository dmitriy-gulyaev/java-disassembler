class TryCatch {

  void m(Object obj) {
    try {
      obj.hashCode();
    } catch (Exception e) {
      e.getMessage();
    }
  }

}
