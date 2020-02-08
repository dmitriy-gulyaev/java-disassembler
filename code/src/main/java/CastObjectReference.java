class CastObjectReference {

  void m() {
    Integer integer = new Integer(0);
    Object object = integer;
    Integer otherReference = (Integer) object;
  }

}
// Cast expression is transformed to execution of check that the reference belongs to specified
// type. Check is performed using <code><b>checkcast</b></code> instruction. Instruction <code>checkcast</code> may throw
// runtime exception ClassCastException if check had failed.
