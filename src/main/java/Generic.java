import java.util.Collections;
import java.util.List;

class Generic<GEN extends Number> {

  byte m1(GEN t) {
    return t.byteValue();
  }

  List<GEN> m2(GEN t) {
    return Collections.singletonList(t);
  }

}
