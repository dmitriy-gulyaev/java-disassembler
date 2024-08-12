package com.example.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.Locale;

public class MakeExamples {

  private static String version = System.getProperty("java.version");
  private static final String srcDir = "src/main/java/";
  private static final String binDir = "target/classes/";
  private static final String outDir = "docs/examples/";

  public static void main(String[] args) throws IOException {

    if (args.length == 0 || !args[0].equals("from-mvn")) {
      // return;
    }

    try (PrintWriter examplesIndex = new PrintWriter(Files.newOutputStream(Paths.get(outDir, "index.html")))) {
      examplesIndex.println("<!DOCTYPE html>");
      examplesIndex.println("<html>");
      examplesIndex.println("<head>");
      examplesIndex.println("<title>Examples</title>");
      examplesIndex.println("<link type=\"text/css\" rel=\"stylesheet\" href=\"../iceberg.css\"/>");
      examplesIndex.println("<style>ol {margin-left:20px} li {margin: 3px}</style>");
      examplesIndex.println("</head>");
      examplesIndex.println("<body><h2>Examples</h2><ol>");
      Files.list(Paths.get(binDir)).sorted().forEach(path -> each(path, examplesIndex));
      examplesIndex.println("\n</ol>");
      examplesIndex.println("<div class='mainpage'><a href=\"..\\index.html\">Main page</a></div>");
      examplesIndex.println("</body></html>");
    }

  }

  private static void each(Path binClassPath, PrintWriter examplesIndex) {
    try {
      if (Files.isDirectory(binClassPath)) {
        return;
      }

      String title = title(binClassPath);

      String htmlFileName = binClassPath.getFileName().toString().replace(".class", ".html");

      if (htmlFileName.startsWith("_")) {
        return;
      }

      if (!htmlFileName.contains("$")) {
        examplesIndex.write(
            "\n<li><a href=\"" + htmlFileName + "\">" + title + "</a></li>");
      } else {
        return;
      }

      System.out.println(binClassPath);
      File srcFile = new File(srcDir, binClassPath.getFileName().toString().replace(".class", ".java"));

      SourceFile sourceFile = getSourceFile(srcFile);
      if (sourceFile == null) {
        return;
      }

      PrintWriter out = new PrintWriter(new File(outDir, htmlFileName));
      out.println("<!DOCTYPE html>");
      out.println("<html>");
      out.println("<head>");
      out.println("<title>" + title + "</title>");
      out.println("<link type=\"text/css\" rel=\"stylesheet\" href=\"../iceberg.css\"/>");
      out.println("<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">");
      out.println("</head>");

      out.println("<body>");
      out.println("<h4>" + title + "</h4><hr/>");

      out.println(sourceFile.lines);

      out.println("<h3>Bytecode</h3>");

      printBinClass(out, binClassPath);
      String className = binClassPath.getFileName().toString().replace(".class", "");
      Class<?> clazz = MakeIndex.class.getClassLoader().loadClass(className);

      processNested(clazz.getPermittedSubclasses(), binClassPath, "permitted", out);
      processNested(clazz.getNestMembers(), binClassPath, "nested", out);
      /*
       * if (clazz.getNestMembers().length > 1) {
       * 
       * for (Class<?> nested : clazz.getNestMembers()) {
       * 
       * if (!nested.getName().contains("$")) { continue; }
       * 
       * Path n = binClassPath.getParent().resolve(nested.getName() + ".class");
       * System.out.println("  nested: " + n); printBinClass(out, n); } }
       */
      if (sourceFile.comment.length() > 0) {
        out.println("<h3>Comment</h3>");
        out.println(sourceFile.comment.toString());
        out.println("<br/>");
      }

      out.println("<br/>Java compiler version: <b>" + version + "</b><br/>");

      out.println("<div class='otherexm'><a href=\"..\\examples\\index.html\">Other examples</a></div>");
      out.println("<div class='mainpage'><a href=\"..\\index.html\">Main page</a></div>");

      out.println("</body></html>");
      out.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private static void processNested(Class<?>[] classes, Path binClassPath, String type, PrintWriter printWriter)
      throws IOException {
    if (classes != null && classes.length > 1) {

      for (Class<?> nested : classes) {

        if ("nested".equals(type) && !nested.getName().contains("$")) {
          continue;
        }

        Path n = binClassPath.getParent().resolve(nested.getName() + ".class");
        System.out.println("  " + type + ": " + n);
        printBinClass(printWriter, n);
      }

    }
  }

  private static void printBinClass(PrintWriter out, Path path) throws IOException {
    String container = path.getFileName().toString().replace('.', '_').toLowerCase();
    out.println("<br/>");
    out.println("<div id=\"" + container + "\" style=\"border:1px solid #000000\"></div>");
    out.println("<script src=\"../iceberg.min.js\"></script>");
    out.println("<script>");

    byte[] b = Files.readAllBytes(path);
    String code = Base64.getEncoder().encodeToString(b);
    out.println("main(\"" + code + "\", true,\"" + container + "\");");

    out.println("</script>");
  }

  private static SourceFile getSourceFile(File srcFile) throws IOException {
    if (!srcFile.exists()) {
      return null;
    }

    final StringBuilder lines = new StringBuilder();
    final StringBuilder comment = new StringBuilder();

    lines.append("<h3>Source code</h3>\r\n");
    lines.append("<table width=100% class=\"ct\">\r\n");
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
            "(record|sealed|permits|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while) ",
            "<b class=\"keyword\">$1</b> ");

        lines.append(String.format("<tr><td class=\"ln\">%s</td><td class=\"cl\">%s</td></tr>\r\n", lineCounter,
            line));
      }
    }

    lines.append("</table>");
    return new SourceFile(comment, lines.toString());

  }

  private static String title(Path binClassPath) {
    String name = binClassPath.getFileName().toString().replace(".class", "");
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < name.length(); i++) {

      char c = name.charAt(i);
      if (i > 0) {
        if (Character.isUpperCase(c)) {
          sb.append(' ');
          sb.append(Character.toLowerCase(c));
          continue;
        }
      }
      sb.append(c);
    }
    return sb.toString();
  }

  static class SourceFile {
    private final StringBuilder comment;
    private final String lines;

    public SourceFile(StringBuilder comment, String lines) {
      this.comment = comment;
      this.lines = lines;
    }
  }

}
