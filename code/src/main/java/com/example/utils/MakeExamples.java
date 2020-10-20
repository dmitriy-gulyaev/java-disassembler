package com.example.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Locale;

public class MakeExamples {

  static PrintWriter out;

  static String currentDate = new SimpleDateFormat("yyyy-MM-dd", Locale.US).format(new Date());

  public static void main(String[] args) throws IOException {

    if (args.length == 0 || !args[0].equals("from-mvn")) {
      return;
    }

    String version = System.getProperty("java.version");

    String srcDir = "src\\main\\java\\";
    String binDir = "target\\classes\\";
    String outDir = "..\\docs\\examples\\";

    PrintWriter examplesIndex = new PrintWriter(new File(outDir, "index.html"));
    
    examplesIndex.write("<!DOCTYPE html>");
    examplesIndex.write("<html>");
    examplesIndex.write("<head><link type=\"text/css\" rel=\"stylesheet\" href=\"../iceberg.css\"/></head>");
    examplesIndex.write("<body><h2>Examples</h2><ol>");

    File dirFile = new File(binDir);
    for (File file : dirFile.listFiles()) {

      if (file.isDirectory()) {
        continue;
      }

      String htmlFileName = file.getName().replace(".class", ".html");

      if (!htmlFileName.contains("$")) {
        examplesIndex.write("\n<li><a href=\"" + htmlFileName + "\">" + htmlFileName + "</a></li>");
      } else {
        continue;
      }

      System.out.println(file);
      out = new PrintWriter(new File(outDir, htmlFileName));
      ow("<!DOCTYPE html>");
      ow("<html>");
      ow("<head>");
      ow("<title>" + file.getName() + "</title>");
      ow("<link type=\"text/css\" rel=\"stylesheet\" href=\"../iceberg.css\"/>");
      ow("<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">");
      ow("</head>");

      ow("<body>");
      ow("<h4>" + file.getName() + "</h4><hr/>");

      File srcFile = new File(srcDir, file.getName().replace(".class", ".java"));
      StringBuilder comment = new StringBuilder();

      if (srcFile.exists()) {
        ow("<h3>Source code</h3>");
        ow("<table width=100% class=\"ct\">");
        int lineCounter = 0;
        try (BufferedReader br = new BufferedReader(new FileReader(srcFile))) {
          String line;
          while ((line = br.readLine()) != null) {
            lineCounter++;
            if (line.startsWith("//")) {
              comment.append(line.substring(2));
              comment.append(' ');
              continue;
            }

            line = line.replace("<", "&lt;").replace("<", "&gt;");
            line = line.replaceAll(
                "(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while) ",
                "<b class=\"keyword\">$1</b> ");

            ow(String.format("<tr><td class=\"ln\">%s</td><td class=\"cl\">%s</td></tr>", lineCounter, line));
          }
        }

        ow("</table>");
      }

      ow("<h3>Bytecode</h3>");
      ow("<div id=\"list\" style=\"border:1px solid #000000\"></div>");
      ow("<script src=\"../iceberg-min.js\"></script>");
      ow("<script>");

      try (FileInputStream fis = new FileInputStream(file)) {
        byte[] b = new byte[(int) file.length()];
        fis.read(b);
        String code = Base64.getEncoder().encodeToString(b);
        ow("main(\"" + code + "\", true);");
      }

      ow("</script>");

      if (comment.length() > 0) {
        ow("<h3>Comment</h3>");
        ow(comment.toString());
        ow("<br/>");
      }

      ow("<br/>Java compiler version: <b>" + version + "</b><br/>");

      ow("<br/><b><a href=\"..\\examples\\index.html\">Other examples</a></b>");
      ow("&nbsp;&nbsp;<a href=\"..\\index.html\">Main page</a>");

      ow("</body></html>");
      out.close();

    }

    examplesIndex.write("\n</ol>");
    examplesIndex.write("<a href=\"..\\index.html\">Main page</a>");
    examplesIndex.write("</body></html>");

    examplesIndex.close();

  }

  private static void ow(String string) {
    out.write(string + "\r\n");
  }

}
