package com.example.iceberg;

public class AdditiveOperatorWithLongAndIntOperands {

  public int m1(long long1, int int1) {
    return (int) (long1 + int1);
  }

  public long m2(long long1, long long2) {
    return long1 + long2;
  }

  public long m3(int int1, int int2) {
    return int1 + int2;
  }

  public long m4(int int1, int int2) {
    return (int) (long) (int) (long) (int) (long) (int1 + int2);
  }

}
