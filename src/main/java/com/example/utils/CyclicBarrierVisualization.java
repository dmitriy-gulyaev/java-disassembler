package com.example.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.atomic.AtomicInteger;

public class CyclicBarrierVisualization extends Thread {

	static AtomicInteger atomicInteger = new AtomicInteger();

	static PrintWriter out;

	private static final int TOP = 50;

	private int value = 0;
	private final long sleepTime;

	private static CyclicBarrier cyclicBarrier = new CyclicBarrier(5);

	private static CyclicBarrierVisualization[] a = new CyclicBarrierVisualization[5];
	private static Map<Integer, Integer>[] ma = new Map[5];

	public CyclicBarrierVisualization(long sleepTime) {
		this.sleepTime = new Random().nextInt(90);
	}

	public static void main(String[] args) throws FileNotFoundException {

		a[0] = new CyclicBarrierVisualization(15);
		a[1] = new CyclicBarrierVisualization(10);
		a[2] = new CyclicBarrierVisualization(30);
		a[3] = new CyclicBarrierVisualization(20);
		a[4] = new CyclicBarrierVisualization(10);

		ma[0] = new HashMap<Integer, Integer>();
		ma[1] = new HashMap<Integer, Integer>();
		ma[2] = new HashMap<Integer, Integer>();
		ma[3] = new HashMap<Integer, Integer>();
		ma[4] = new HashMap<Integer, Integer>();

		for (CyclicBarrierVisualization cyclicBarrierEx : a) {
			cyclicBarrierEx.start();
		}

		long start = System.currentTimeMillis();

		for (int i = 0; atomicInteger.get() != 5; i++) {
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
			}
			command(i);
		}

		long duration = System.currentTimeMillis() - start;

		out = new PrintWriter(new File(CyclicBarrierVisualization.class.getSimpleName() + ".html"));

		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println("<head>");
		out.println("<title>" + CyclicBarrierVisualization.class.getSimpleName() + "</title>");
		out.println("<style>");

		for (int j = 0; j < ma.length; j++) {
			Map<Integer, Integer> map = ma[j];
			String name = a[j].getName();

			out.println("#div" + name + " {border-radius: 7px; left: 0px; width: 80px; height: 80px; top:"
					+ (TOP + j * 90)
					+ "px; background: #aaaaaa; animation-timing-function: linear; position: absolute ; animation: "
					+ name + " " + duration + "ms;}");

			out.println("@keyframes " + name + " {");

			for (Integer key : map.keySet()) {
				int v = map.get(key);
				out.print(" " + key + "% {left: " + (v * 10) + "px;}");
			}
			out.println("}");

			a[j].interrupt();

		}

		out.println("</style>");
		out.println("</head>");
		out.println("<body>");

		out.println(
				"<div id='barrier' style='border:1px solid; background: #000000; position: absolute; width:3px; height:460px; left:580px; top: "
						+ (TOP - 10) + "px'></div>");

		for (int j = 0; j < a.length; j++) {
			out.println("<div style='text-align: center' id='div" + a[j].getName() + "'>" + a[j].getName() + "</div>");

			out.println("<div style='border:1px dotted; position: absolute; width:1000px; height:0px; left:0px; top:"
					+ (TOP + 40 + j * 90) + "px'></div>");
		}

		out.println("</body>");
		out.println("</html>");

		out.close();
		System.out.println("DONE");
	}

	private static void command(int i) {
		for (int j = 0; j < a.length; j++) {
			CyclicBarrierVisualization cyclicBarrierEx = a[j];
			ma[j].put(i, cyclicBarrierEx.getValue());
		}
	}

	@Override
	public void run() {
		boolean signaled = false;
		while (true) {

			value++;

			try {
				Thread.sleep(sleepTime);

				if (value == 50 && !signaled) {
					cyclicBarrier.await();
					signaled = true;
				}

				if (value > 99) {
					int ig = atomicInteger.incrementAndGet();
					System.out.println(ig);
					return;
				}

			} catch (InterruptedException e) {
				// System.out.println("return");
				return;
			} catch (BrokenBarrierException e) {
				// System.out.println("broken");
				return;
			}
		}

	}

	public int getValue() {
		return value;
	}

}
