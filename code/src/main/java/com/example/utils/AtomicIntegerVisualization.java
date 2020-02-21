package com.example.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Stream;

public class AtomicIntegerVisualization extends Thread {

  private static final int SIZE = 10000;

  static Integer[] a = new Integer[SIZE];
  static AtomicInteger[] aia = new AtomicInteger[SIZE];

  public static void main(String[] args) throws InterruptedException, FileNotFoundException {

    for (int i = 0; i < a.length; i++) {
      a[i] = 0;
      aia[i] = new AtomicInteger();
    }

    Thread t1 = new AtomicIntegerVisualization();
    Thread t2 = new AtomicIntegerVisualization();
    Thread t3 = new AtomicIntegerVisualization();
    Thread t4 = new AtomicIntegerVisualization();

    t1.start();
    t2.start();
    t3.start();
    t4.start();

    t1.join();
    t2.join();
    t3.join();
    t4.join();

    System.out.println(Stream.of(a).mapToInt(Integer::intValue).sum());

    printTable();
    System.out.println("done");
  }

  private static void printTable() throws FileNotFoundException {
    PrintWriter out = new PrintWriter(new File(AtomicIntegerVisualization.class.getSimpleName() + ".html"));
    out.print("<html>");

    out.print("<head><style>.c4{background:#dddddd}.c3,.c2,.c1{background:#000000}</style></head>");

    out.print("<body>");

    
    out.print("<span>Array of Integer</span>");
    out.print("<table cellspacing=1 border=0>");
    for (int row = 0; row < 99; row++) {
      out.print("<tr>");
      for (int col = 0; col < 99; col++) {
        out.print("<td class='c" + a[row * 100 + col] + "'></td>");
      }
      out.print("</tr>");
    }
    out.print("</table>");

    out.print("<span>Array of AtomicInteger</span>");
    out.print("<table cellspacing=1 border=0>");
    for (int row = 0; row < 99; row++) {
      out.print("<tr>");
      for (int col = 0; col < 99; col++) {
        out.print("<td class='c" + aia[row * 100 + col].get() + "'></td>");
      }
      out.print("</tr>");
    }
    out.print("</table>");

    out.print("</body></html>");
    out.close();
  }

  @Override
  public void run() {
    for (int i = 0; i < a.length; i++) {
      a[i] = a[i] + 1;
      aia[i].incrementAndGet();
    }
  }

}
