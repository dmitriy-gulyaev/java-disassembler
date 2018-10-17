package com.example.iceberg;

public class WhileAndDoWhile {

  static int mWhile(int inputParam) {
    while (inputParam < 100) {
      inputParam += 1;
    }
    return inputParam;
  }

  static int mDoWhile(int inputParam) {
    do {
      inputParam += 1;
    } while (inputParam < 100);
    return inputParam;
  }

}
