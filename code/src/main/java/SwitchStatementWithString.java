class SwitchStatementWithString {

  int stringToInt(String str) {
    int returnValue;
    switch (str) {
    case "one":
      returnValue = 1;
      break;
    case "two":
    case "TWO":
      returnValue = 2;
      break;
    default:
      returnValue = 100;
    }
    return returnValue;
  }

}
// title = Switch statement with strings
