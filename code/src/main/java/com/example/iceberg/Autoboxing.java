package com.example.iceberg;

public class Autoboxing {

  int m1(String str) {
    Integer v = str.hashCode();
    return v;
  }

  int m2(String str) {
    int v = str.hashCode();
    return v;
  }

}
