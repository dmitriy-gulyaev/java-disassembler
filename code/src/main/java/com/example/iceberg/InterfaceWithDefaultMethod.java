package com.example.iceberg;

public interface InterfaceWithDefaultMethod {

  void m1();

  default void m2() {
  }

  default void m3() {
    new String().hashCode();
  }

}
