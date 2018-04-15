package com.example.iceberg;

public class LoopEnumeration {

  void m() {
    for (Enumeration enm : Enumeration.values()) {
      enm.hashCode();
    }
  }

}
