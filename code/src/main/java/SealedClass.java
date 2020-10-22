sealed class SealedClass permits _SealedClass1, _SealedClass2 {}
final class _SealedClass1 extends SealedClass {}
final class _SealedClass2 extends SealedClass {}