class TryWithResources {

    void m() throws Exception {
        try (
            AutoCloseable a1 = newA();
            AutoCloseable a2 = newA();
            AutoCloseable a3 = newA();) {
        }
    }

    private AutoCloseable newA() {
        return new java.io.FileReader(
                java.io.FileDescriptor.err);
    }

}
