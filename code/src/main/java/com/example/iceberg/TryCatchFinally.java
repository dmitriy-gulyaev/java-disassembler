package com.example.iceberg;

import java.io.File;
import java.io.IOException;

public class TryCatchFinally {

  void m(File file) throws IOException {
    String str = "string";
    try {
      str.charAt(111);
    } catch (Exception e) {
      e.getMessage();
    } finally {
      str.hashCode();
      str.isEmpty();
    }
  }

}
