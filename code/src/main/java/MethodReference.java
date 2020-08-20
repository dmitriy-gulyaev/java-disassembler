import java.util.Collections;
import java.util.TreeSet;
import java.util.function.BiConsumer;
import java.util.function.Supplier;

class MethodReference {

  BiConsumer<TreeSet<Integer>, Integer> biConsumer = TreeSet::add;

  Supplier<?> supplier = Collections::emptyList;

}
