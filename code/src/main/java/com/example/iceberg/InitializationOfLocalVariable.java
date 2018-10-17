package com.example.iceberg;

public class InitializationOfLocalVariable {

    void initialized() {
        int localVar = 89;
        this.hashCode();
    }

    void notInitialized() {
        int localVar;
        this.hashCode();
    }


}
