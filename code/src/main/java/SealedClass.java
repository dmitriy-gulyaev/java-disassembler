sealed class SealedClass permits _S1, _S2 {}
final class _S1 extends SealedClass {}
final class _S2 extends SealedClass {}