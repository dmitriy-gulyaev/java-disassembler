package com.example.iceberg;

class OuterInnerNestedLocal {

    Integer fieldOuter = new Integer(10000);

    class Inner {
        void methodInner() {
            fieldOuter.hashCode();
        }
    }

    static class Nested {
        void methodNested() {}
    }


    void methodOuter() {
        Integer fieldLocal = new Integer(80000);
        final int fieldLocalFinal = 90000;

        class Local {
            void methodLocal() {}
        }

        class LocalWithAccesToOuter {
            void methodLocalWithAccesToOuter() {
                fieldLocal.hashCode();
                new Integer(fieldLocalFinal);
            }
        }

        new Inner().methodInner();
        new Nested().methodNested();
        new Local().methodLocal();
        new LocalWithAccesToOuter().methodLocalWithAccesToOuter();

    }
}

// Inner and local classes are similar to each other, with the exception of <tt
// class='keyword'>EnclosingMethod</tt> attribute in local class. Both classes have single
// constructor with one parameter - reference to outer class. Reference is saved as 
// synthetic instance variable <tt class='keyword'>this$0</tt> and may be used further for access to
// outer class. Reference to outer class is passed as constructor parameter and saved even if
// inner/local don't use it (according to source code).
