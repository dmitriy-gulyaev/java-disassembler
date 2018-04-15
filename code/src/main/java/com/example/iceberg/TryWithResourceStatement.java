package com.example.iceberg;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;

public class TryWithResourceStatement {

    void m(Reader reader) throws IOException {
        try (BufferedReader br = new BufferedReader(reader)) {
            br.toString();
        }
    }

}
