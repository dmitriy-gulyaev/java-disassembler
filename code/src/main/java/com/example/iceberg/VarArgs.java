package com.example.iceberg;

import java.util.Arrays;

public class VarArgs {

    public static void printVarArgs(String... args) {
        System.out.println(Arrays.toString(args));
    }

    public static void print(int i) {
        String.format("Value of i = %s.", i);
    }

    private void doPrint() {
        printVarArgs("one", "two");
        printVarArgs(null);
        printVarArgs();
    }

}
