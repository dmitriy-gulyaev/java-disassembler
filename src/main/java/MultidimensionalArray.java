class MultidimensionalArray {

  int[][] m0() {
    return new int[10][];
  }

  int[][] m1() {
    return new int[10][20];
  }

  int[][][][][][][][][][] m2() {
    return new int[10][20][10][20][10][20][10][20][10][20];
  }

  int m3(int[][] ia) {
    return ia[80][50];
  }

  int m4(int[][][] ia) {
    return ia[80][50][10];
  }

}
