
public class Synchronized {

  synchronized void m1() {
    this.hashCode();
  }

  void m2() {
    synchronized (this) {
      this.hashCode();
    }
  }

}
