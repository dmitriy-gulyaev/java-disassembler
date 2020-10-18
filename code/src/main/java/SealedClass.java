sealed class SealedClass permits C1, C2, C3 {}
final class C1 extends SealedClass {}
final class C2 extends SealedClass {}
final class C3 extends SealedClass {}