import java.util.Comparator;
import java.util.List;

class AnonymousClass {

    void m(List<String> list) {
        list.sort(new Comparator<String>() {
            @Override
            public int compare(String arg0, String arg1) {
                return 10;
            }
        });
    }

}
