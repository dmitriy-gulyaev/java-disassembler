package com.example.iceberg;

public class InstanceInitializer {

  int x = 2000;

  {
    y = 30;
  }

  int y = this.x + 100;

  int z;

  public InstanceInitializer(String str) {
    this.z = Integer.parseInt(str);
  }

  public InstanceInitializer(Long lng) {
    this.z = lng.intValue();
  }

  public InstanceInitializer() {}
}
