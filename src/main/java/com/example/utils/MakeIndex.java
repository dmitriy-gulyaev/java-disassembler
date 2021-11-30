package com.example.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class MakeIndex {

	private final static String VERSION = "15";

	public static void main(String[] args) throws IOException {
		make(false);
		make(true);
	}

	public static void make(boolean isBig) throws IOException {

		Path cssFilePath = Paths.get(isBig ? "index-big.html" : "index.html");

		try (PrintWriter pw = new PrintWriter(Files.newOutputStream(cssFilePath))) {

			pw.write("<!DOCTYPE html>");

			pw.write("<html>");
			pw.write("  <head>");
			pw.write("    <link type=\"text/css\" rel=\"stylesheet\" href=\"iceberg.css\"/>");
			pw.write("    <meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">");
			pw.write("    <meta name=\"keywords\" content=\"Java, Java disassembler, JVM\"/>");
			pw.write("    <meta name=\"description\" content=\"Online Java disassembler\"/>");
			pw.write(
					"    <meta name=\"google-site-verification\" content=\"1Z7AfvwEAWtyYor_fhRUcH1YuJJ3kAf7_8uA3mtaulI\" />");
			pw.write("  </head>");
			pw.write("  <title>Online Java Disassembler</title>");
			pw.write("  <body id=\"drop_zone\">");

			pw.write(
					"<div id=\"outline\">Online Java Disassembler<br/><br/><a href=\"examples/index.html\">Examples</a></div>");
			pw.write("<div class=\"list\" id=\"list\"><div style=\"margin:80px; width:70%; font-size: 28px\">");
			pw.write("<h2>Java disassembler</h2>");

			pw.write(
					"This is online Java disassembler, which transforms compiled Java classes into a set of bytecode instructions, "
							+ "presented in HTML format.<br/><br/>" + "Disassembly is performed in accordance with the "
							+ "<a href=\"https://docs.oracle.com/javase/specs/jvms/se" + VERSION + "/html/index.html\">"
							+ "Java® Virtual Machine Specification, Java SE " + VERSION
							+ " Edition</a> namely<br/><br/>"
							+ "<a target=\"_blank\" href=\"https://docs.oracle.com/javase/specs/jvms/se" + VERSION
							+ "/html/jvms-4.html\">Chapter 4. The class File Format</a>" + " and <br/>"
							+ "<a target=\"_blank\" href=\"https://docs.oracle.com/javase/specs/jvms/se" + VERSION
							+ "/html/jvms-6.html\">Chapter 6. The Java Virtual Machine Instruction Set</a>"
							+ ".<br/><br/> "
							+ "To disassemble compiled Java class file (*.class) <b>drag-and-drop</b> file to this page "
							+ "or choose file using <b><label><input type=\"file\" style=\"display: none;\" id=\"files\">"
							+ "<a style=\"text-decoration: underline;\">this link</a></label></b>. <br/><br/>"
							+ "Also see <a href=\"examples/index.html\">examples</a> of disassembled classes.</div></div>");

			pw.write("</body>");
			if (isBig) {
				pw.write("<script src=\"iceberg.js\"></script>");
			} else {
				pw.write("<script src=\"iceberg-min.js\"></script>");
			}

			pw.write("</html>");

		}

	}

}
