class PatternMatchingForSwitch {

    int methodForNotNull(Object object) {
        return switch (object) {
            case String  s -> s.length();
            case Integer i -> i.intValue();
            default        -> 0;
        };
    }

    int methodForNullable(Object object) {
        return switch (object) {
            case null      -> 100;
            case Integer i -> i.intValue();
            case String  s -> s.length();
            default        -> 0;
        };
    }

}