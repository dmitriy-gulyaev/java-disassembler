class LoopEnumeration {

  void m() {
    for (Enumeration enm : Enumeration.values()) {
      enm.hashCode();
    }
  }

}
