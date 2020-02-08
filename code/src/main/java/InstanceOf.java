class InstanceOf {

  void m(Object o) {
    if (o instanceof Number) {
      ((Number) o).doubleValue();
    }
  }

}
