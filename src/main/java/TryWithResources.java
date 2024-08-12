class TryWithResources {

    void m() throws Exception {
        try (
            AutoCloseable a1 = newAC();
            AutoCloseable a2 = newAC();
            AutoCloseable a3 = newAC();) {
        }
    }

    private AutoCloseable newAC() {
        return new java.io.FileReader(
                java.io.FileDescriptor.err);
    }

}
