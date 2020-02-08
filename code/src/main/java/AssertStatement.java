class AssertStatement {

  short m(Long argument) {
    assert argument != null;
    assert argument > 10;
    assert argument > 70 : argument < 90;
    return argument.shortValue();
  }

}

// jls8 = jls-14.html#jls-14.10
