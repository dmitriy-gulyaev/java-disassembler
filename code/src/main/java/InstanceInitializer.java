class InstanceInitializer {

  int x = 2000;

  {
    y = 30;
  }

  int y = this.x + 100;

  int z;

  InstanceInitializer(String str) {
    this.z = Integer.parseInt(str);
  }

  InstanceInitializer(Long lng) {
    this.z = lng.intValue();
  }

  InstanceInitializer() {
  }
}
