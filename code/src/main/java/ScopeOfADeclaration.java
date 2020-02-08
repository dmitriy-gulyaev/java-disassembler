class ScopeOfADeclaration {

  static Integer varr = 1;

  static void m() {
    String varr = "23";
    varr.hashCode();
    ScopeOfADeclaration.varr.hashCode();
  }

}
