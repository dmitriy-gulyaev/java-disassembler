class InstanceInitializer {

    int x = 100;

    int z;

    InstanceInitializer(String str) {
        this.x = Integer.parseInt(str);
    }

    InstanceInitializer() {
    }

    {x = 30;}
}

// Initialization of instance fields is performed in body of each contructor.
// If there are several constructors - initialization code is duplicated.