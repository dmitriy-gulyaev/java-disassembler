class TryWithResource {

    void m1() throws Exception {
        try (AutoCloseable a = newAC()) {
            a.hashCode();
        }
    }

    void m2() {
        try (AutoCloseable a = newAC()) {
            a.hashCode();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private AutoCloseable newAC() {
        return new java.io.FileReader(
                java.io.FileDescriptor.err);
    }

}
