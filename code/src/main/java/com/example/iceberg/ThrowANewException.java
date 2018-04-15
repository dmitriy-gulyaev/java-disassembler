package com.example.iceberg;

public class ThrowANewException {

	void m1() {
		throw new NullPointerException();
	}

	void m2() {
		NullPointerException npe = new NullPointerException();
		throw npe;
	}

}
