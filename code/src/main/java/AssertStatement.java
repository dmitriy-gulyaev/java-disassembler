class AssertStatement {

  static {
    assert 1 == 2;
  }

  void m1(int argument) {
    assert argument > 10;
  }

  void m2(int argument) {
    assert argument > 20 : "abc";
  }

  void m3(int argument) {
    assert argument > 30 : 123;
  }

  void m4(int argument) {
    assert argument > 40 : new java.util.concurrent.DelayQueue();
  }

}

// Assert statement in method m2 results in invoke of AssertionError(Object) constructor since AssertionError(String) although exists but is private.
