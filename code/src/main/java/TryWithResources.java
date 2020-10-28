class TryWithResources {

    void m1() throws Exception {
        try (AutoCloseable a = newA()) {
            a.hashCode();
        }
    }

    void m2() {
        try (AutoCloseable a = newA()) {
            a.hashCode();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    void m3() throws Exception {
        try (
            AutoCloseable a1 = newA();
            AutoCloseable a2 = newA();
            AutoCloseable a3 = newA();) {
        }
    }

    private AutoCloseable newA() {
        return null;
    }

}
