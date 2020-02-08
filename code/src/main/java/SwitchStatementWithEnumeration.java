class SwitchStatementWithEnumeration {

  int m(Enumeration en) {
    switch (en) {
    case ONE:
      return 1000;
    case THREE:
      return 3000;
    case TWO:
      return 2000;
    default:
      return 0;
    }
  }

}
