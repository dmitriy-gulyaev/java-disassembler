class PatternMatchingForInstanceof {

    void m(Object obj) {
        if (obj instanceof String s) {
            s.charAt(1);
        }
    }

}