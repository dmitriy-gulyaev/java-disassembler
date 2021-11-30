class TryWithResource {

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

    private AutoCloseable newA() {
        return new java.io.FileReader(
                java.io.FileDescriptor.err);
    }

}
