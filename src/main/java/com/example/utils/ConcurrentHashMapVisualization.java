package com.example.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class ConcurrentHashMapVisualization extends Thread {

  private static final int SIZE = 100;

  static Map<Integer, String> hashMap = new HashMap<>();
  static Map<Integer, String> concurrentHashMap = new ConcurrentHashMap<>();

  public static void main(String[] args) throws InterruptedException, FileNotFoundException {

    Thread t1 = new ConcurrentHashMapVisualization();
    Thread t2 = new ConcurrentHashMapVisualization();
    Thread t3 = new ConcurrentHashMapVisualization();
    Thread t4 = new ConcurrentHashMapVisualization();

    t1.start();
    t2.start();
    t3.start();
    t4.start();

    t1.join();
    t2.join();
    t3.join();
    t4.join();

    System.out.println(hashMap.keySet().size());
    System.out.println(concurrentHashMap.keySet().size());

    printTable();
    System.out.println("done");
  }

  private static void printTable() throws FileNotFoundException {
    PrintWriter out = new PrintWriter(new File(ConcurrentHashMapVisualization.class.getSimpleName() + ".html"));
    out.print("<html>");

    out.print("<head><style>.cVALUE{background:#dddddd}.cnull{background:#ff0000}</style></head>");

    out.print("<body>");

    out.print("<span>Array of HashMap</span>");
    prnt(hashMap, out);

    out.print("<span>Array of ConcurrentHashMap</span>");
    prnt(concurrentHashMap, out);

    out.print("</body></html>");
    out.close();
  }

  private static void prnt(Map<Integer, String> map, PrintWriter out) {
    out.print("<table cellspacing=10 cellpadding=10 border=0>");

    int row = 0;
    int col = 0;
    for (Integer key : map.keySet()) {
      if (col == 0) {
        out.print("<tr>");
      }

      String v = map.get(row * 10 + col);
      out.print("<td class='c" + v + "'>" + key + "=" + v + "</td>");
      col++;
      if (col == 10) {
        out.print("</tr>");
        col = 0;
        row++;
      }
    }
    out.print("</table>");
  }

  @Override
  public void run() {
    for (int i = 0; i < SIZE; i++) {
      hashMap.putIfAbsent(i, "VALUE");
      concurrentHashMap.putIfAbsent(i, "VALUE");
    }
  }

}
