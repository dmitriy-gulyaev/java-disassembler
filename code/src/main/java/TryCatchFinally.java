class TryCatchFinally {

    void m(Object o) {
        try {
            o.notify();
        } catch (Exception e) {
            e.notify();
        } finally {
            o.notifyAll();
        }

    }
}
