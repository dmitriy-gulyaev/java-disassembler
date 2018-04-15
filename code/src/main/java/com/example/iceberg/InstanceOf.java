package com.example.iceberg;

public class InstanceOf {

  public void m(Object o) {
    if (o instanceof Number) {
      ((Number) o).doubleValue();
    }
  }

}
