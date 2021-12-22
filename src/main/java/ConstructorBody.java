class ConstructorBody extends java.lang.AssertionError {

  ConstructorBody(int param) {
  }

  ConstructorBody(char param) {
    super(param);
  }

}
// If a constructor body does not begin with an explicit constructor invocation, then the constructor body implicitly begins with a superclass constructor invocation "super();", even if superclass has constructor with the same signature.