package com.example.iceberg;

public class MultidimensionalArray {

  public int[][] m1() {
    return new int[10][20];
  }

  public int[][][][][][][][][][] m2() {
    return new int[10][20][10][20][10][20][10][20][10][20];
  }

  public int m3(int[][] ia) {
    return ia[80][50];
  }

  public int m4(int[][][] ia) {
    return ia[80][50][10];
  }

}
