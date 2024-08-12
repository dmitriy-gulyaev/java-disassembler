class WhileAndDoWhile {

  int mWhile(int inputParam) {
    while (inputParam < 100) {
      inputParam += 1;
    }
    return inputParam;
  }

  int mDoWhile(int inputParam) {
    do {
      inputParam += 1;
    } while (inputParam < 100);
    return inputParam;
  }

}
