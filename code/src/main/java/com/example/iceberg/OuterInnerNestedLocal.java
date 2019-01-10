package com.example.iceberg;

public class OuterInnerNestedLocal {

    String fieldO = "";

    class Inner {
        void mI() {
            fieldO.hashCode();
        }
    }

    static class Nested {
    }


    void mO() {
        class Local {
            void mL() {
                fieldO.hashCode();
            }
        }
    }

}

// Inner and local classes are similar to each other, with the exception of <tt>EnclosingMethod</tt>
// attribute in local class. Both classes have single constructor with one parameter - reference to
// outer class.
