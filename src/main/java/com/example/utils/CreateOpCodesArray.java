package com.example.utils;

public class CreateOpCodesArray {

  public static void main(String[] args) {

    String CPINDX_08 = "2";
    String CPINDX_16 = "3";
    String OFFSET_16 = "4";
    String INVINT_64 = "5";
    String LCLVAR_08 = "6";
    String iinc_16 = "7";
    String VALUE_08 = "8";
    String VALUE_16 = "9";
    String TABLESWITCH = "10";
    String LOOKUPSWITCH = "11";
    String WIDE = "12";
    String MULTIANEWARRAY_TYPE = "13";
    String NEWARRAY_TYPE = "14";

    final String[][] opcodes = new String[256][3];

    // Constants
    opcodes[0] = new String[] { "nop", null, "Do nothing" };
    opcodes[1] = new String[] { "aconst_null", null, "null" };
    opcodes[2] = new String[] { "iconst_m1", null, "int constant -1" };
    opcodes[3] = new String[] { "iconst_0", null, "int constant 0" };
    opcodes[4] = new String[] { "iconst_1", null, "int constant 1" };
    opcodes[5] = new String[] { "iconst_2", null, "int constant 2" };
    opcodes[6] = new String[] { "iconst_3", null, "int constant 3" };
    opcodes[7] = new String[] { "iconst_4", null, "int constant 4" };
    opcodes[8] = new String[] { "iconst_5", null, "int constant 5" };
    opcodes[9] = new String[] { "lconst_0", null, "long constant 0" };
    opcodes[10] = new String[] { "lconst_1", null, "long constant 1" };
    opcodes[11] = new String[] { "fconst_0", null, "float 0" };
    opcodes[12] = new String[] { "fconst_1", null, "float 1" };
    opcodes[13] = new String[] { "fconst_2", null, "float 2" };
    opcodes[14] = new String[] { "dconst_0", null, "double 0" };
    opcodes[15] = new String[] { "dconst_1", null, "double 1" };
    opcodes[16] = new String[] { "bipush", VALUE_08, "byte, sign-extended to an int value" };
    opcodes[17] = new String[] { "sipush", VALUE_16, "short, sign-extended to an int value" };
    opcodes[18] = new String[] { "ldc", CPINDX_08, "item from run-time constant pool" };
    opcodes[19] = new String[] { "ldc_w", CPINDX_16, "item from run-time constant pool (wide index}" };
    opcodes[20] = new String[] { "ldc2_w", CPINDX_16, "long or double from run-time constant pool (wide index}" };

    // Loads
    opcodes[21] = new String[] { "iload", LCLVAR_08, "int from local variable" };
    opcodes[22] = new String[] { "lload", LCLVAR_08 /* ? */ , "long from local variable" };
    opcodes[23] = new String[] { "fload", LCLVAR_08, "float from local variable" };
    opcodes[24] = new String[] { "dload", LCLVAR_08 /* ? */ , "double from local variable" };
    opcodes[25] = new String[] { "aload", LCLVAR_08, "reference from local variable" };

    opcodes[26] = new String[] { "iload_0", null, "int from local variable 0" };
    opcodes[27] = new String[] { "iload_1", null, "int from local variable 1" };
    opcodes[28] = new String[] { "iload_2", null, "int from local variable 2" };
    opcodes[29] = new String[] { "iload_3", null, "int from local variable 3" };

    opcodes[30] = new String[] { "lload_0", null, "long from local variable 0" };
    opcodes[31] = new String[] { "lload_1", null, "long from local variable 1" };
    opcodes[32] = new String[] { "lload_2", null, "long from local variable 2" };
    opcodes[33] = new String[] { "lload_3", null, "long from local variable 3" };

    opcodes[34] = new String[] { "fload_0", null, "float from local variable 0" };
    opcodes[35] = new String[] { "fload_1", null, "float from local variable 1" };
    opcodes[36] = new String[] { "fload_2", null, "float from local variable 2" };
    opcodes[37] = new String[] { "fload_3", null, "float from local variable 3" };

    opcodes[38] = new String[] { "dload_0 ", null, "double from local variable 0" };
    opcodes[39] = new String[] { "dload_1 ", null, "double from local variable 1" };
    opcodes[40] = new String[] { "dload_2 ", null, "double from local variable 2" };
    opcodes[41] = new String[] { "dload_3 ", null, "double from local variable 3" };

    opcodes[42] = new String[] { "aload_0", null, "reference from local variable 0" };
    opcodes[43] = new String[] { "aload_1", null, "reference from local variable 1" };
    opcodes[44] = new String[] { "aload_2", null, "reference from local variable 2" };
    opcodes[45] = new String[] { "aload_3", null, "reference from local variable 3" };
    opcodes[46] = new String[] { "iaload", null, "int from array" };
    opcodes[47] = new String[] { "laload", null, "long from array" };
    opcodes[48] = new String[] { "faload", null, "float from array" };
    opcodes[49] = new String[] { "daload", null, "double from array" };
    opcodes[50] = new String[] { "aaload", null, "reference from array" };
    opcodes[51] = new String[] { "baload", null, "byte or boolean from array" };
    opcodes[52] = new String[] { "caload", null, "char from array" };
    opcodes[53] = new String[] { "saload", null, "short from array" };

    // Stores
    opcodes[54] = new String[] { "istore", LCLVAR_08, "int into local variable" };
    opcodes[55] = new String[] { "lstore", LCLVAR_08 /* ? */ , "long into local variable" };
    opcodes[56] = new String[] { "fstore", LCLVAR_08, "float into local variable" };
    opcodes[57] = new String[] { "dstore", LCLVAR_08 /* ? */ , "double into local variable" };
    opcodes[58] = new String[] { "astore", LCLVAR_08, "reference into local variable" };
    opcodes[59] = new String[] { "istore_0", null, "int into local variable 0" };
    opcodes[60] = new String[] { "istore_1", null, "int into local variable 1" };
    opcodes[61] = new String[] { "istore_2", null, "int into local variable 2" };
    opcodes[62] = new String[] { "istore_3", null, "int into local variable 3" };
    opcodes[63] = new String[] { "lstore_0", null, "long 0 into local variable" };
    opcodes[64] = new String[] { "lstore_1", null, "long 1 into local variable" };
    opcodes[65] = new String[] { "lstore_2", null, "long 2 into local variable" };
    opcodes[66] = new String[] { "lstore_3", null, "long 3 into local variable" };
    opcodes[67] = new String[] { "fstore_0", null, "float 0 into local variable" };
    opcodes[68] = new String[] { "fstore_1", null, "float 1 into local variable" };
    opcodes[69] = new String[] { "fstore_2", null, "float 2 into local variable" };
    opcodes[70] = new String[] { "fstore_3", null, "float 3 into local variable" };
    opcodes[71] = new String[] { "dstore_0", null, "double 0 into local variable" };
    opcodes[72] = new String[] { "dstore_1", null, "double 1 into local variable" };
    opcodes[73] = new String[] { "dstore_2", null, "double 2 into local variable" };
    opcodes[74] = new String[] { "dstore_3", null, "double 3 into local variable" };
    opcodes[75] = new String[] { "astore_0", null, "reference into local variable 0" };
    opcodes[76] = new String[] { "astore_1", null, "reference into local variable 1" };
    opcodes[77] = new String[] { "astore_2", null, "reference into local variable 2" };
    opcodes[78] = new String[] { "astore_3", null, "reference into local variable 3" };
    opcodes[79] = new String[] { "iastore", null, "into int array" };
    opcodes[80] = new String[] { "lastore", null, "into long array" };
    opcodes[81] = new String[] { "fastore", null, "into float array" };
    opcodes[82] = new String[] { "dastore", null, "into double array" };
    opcodes[83] = new String[] { "aastore", null, "into reference array" };
    opcodes[84] = new String[] { "bastore", null, "into byte or boolean array" };
    opcodes[85] = new String[] { "castore", null, "into char array" };
    opcodes[86] = new String[] { "sastore", null, "into short array" };

    // Stack
    opcodes[87] = new String[] { "pop", null, "Pop the top operand stack value" };
    opcodes[88] = new String[] { "pop2", null, "Pop the top one or two operand stack values" };
    opcodes[89] = new String[] { "dup", null, "Duplicate the top operand stack value" };
    opcodes[90] = new String[] { "dup_x1", null, "Duplicate the top operand stack value and insert two values down" };
    opcodes[91] = new String[] { "dup_x2", null,
        "Duplicate the top operand stack value and insert two or three values down" };
    opcodes[92] = new String[] { "dup2", null, "Duplicate the top one or two operand stack values" };
    opcodes[93] = new String[] { "dup2_x1", null,
        "Duplicate the top one or two operand stack values and insert two or three values down" };
    opcodes[94] = new String[] { "dup2_x2", null,
        "Duplicate the top one or two operand stack values and insert two, three, or four values down" };
    opcodes[95] = new String[] { "swap", null, "Swap the top two operand stack values" };

    // Math
    opcodes[96] = new String[] { "iadd", null, "Add int" };
    opcodes[97] = new String[] { "ladd", null, "Add long" };
    opcodes[98] = new String[] { "fadd", null, "Add float" };
    opcodes[99] = new String[] { "dadd", null, "Add double" };
    opcodes[100] = new String[] { "isub", null, "Subtract int" };
    opcodes[101] = new String[] { "lsub", null, "Subtract long" };
    opcodes[102] = new String[] { "fsub", null, "Subtract float" };
    opcodes[103] = new String[] { "dsub", null, "Subtract double" };
    opcodes[104] = new String[] { "imul", null, "Multiply int" };
    opcodes[105] = new String[] { "lmul", null, "Multiply long" };
    opcodes[106] = new String[] { "fmul", null, "Multiply float" };
    opcodes[107] = new String[] { "dmul", null, "Multiply double" };
    opcodes[108] = new String[] { "idiv", null, "Divide int" };
    opcodes[109] = new String[] { "ldiv", null, "Divide long" };
    opcodes[110] = new String[] { "fdiv", null, "Divide float" };
    opcodes[111] = new String[] { "ddiv", null, "Divide double" };
    opcodes[112] = new String[] { "irem", null, "Remainder int" };
    opcodes[113] = new String[] { "lrem", null, "Remainder long" };
    opcodes[114] = new String[] { "frem", null, "Remainder float" };
    opcodes[115] = new String[] { "drem", null, "Remainder double" };
    opcodes[116] = new String[] { "ineg", null, "Negate int" };
    opcodes[117] = new String[] { "lneg", null, "Negate long" };
    opcodes[118] = new String[] { "fneg", null, "Negate float" };
    opcodes[119] = new String[] { "dneg", null, "Negate double" };
    opcodes[120] = new String[] { "ishl", null, "Shift left int" };
    opcodes[121] = new String[] { "lshl", null, "Shift left long" };
    opcodes[122] = new String[] { "ishr", null, "Arithmetic shift right int" };
    opcodes[123] = new String[] { "lshr", null, "Arithmetic shift right long" };
    opcodes[124] = new String[] { "iushr", null, "Logical shift right int" };
    opcodes[125] = new String[] { "lushr", null, "Logical shift right long" };
    opcodes[126] = new String[] { "iand", null, "Boolean AND int" };
    opcodes[127] = new String[] { "land", null, "Boolean AND long" };
    opcodes[128] = new String[] { "ior", null, "Boolean OR int" };
    opcodes[129] = new String[] { "lor", null, "Boolean OR long" };
    opcodes[130] = new String[] { "ixor", null, "Boolean XOR int" };
    opcodes[131] = new String[] { "lxor", null, "Boolean XOR long" };
    opcodes[132] = new String[] { "iinc", iinc_16, "Increment local variable by constant" };

    // Conversions
    opcodes[133] = new String[] { "i2l", null, "int to long" };
    opcodes[134] = new String[] { "i2f", null, "int to float" };
    opcodes[135] = new String[] { "i2d", null, "int to double" };
    opcodes[136] = new String[] { "l2i", null, "long to int" };
    opcodes[137] = new String[] { "l2f", null, "long to float" };
    opcodes[138] = new String[] { "l2d", null, "long to double" };
    opcodes[139] = new String[] { "f2i", null, "float to int" };
    opcodes[140] = new String[] { "f2l", null, "float to long" };
    opcodes[141] = new String[] { "f2d", null, "float to double" };
    opcodes[142] = new String[] { "d2i", null, "double to int" };
    opcodes[143] = new String[] { "d2l", null, "double to long" };
    opcodes[144] = new String[] { "d2f", null, "double to float" };
    opcodes[145] = new String[] { "i2b", null, "int to byte" };
    opcodes[146] = new String[] { "i2c", null, "int to char" };
    opcodes[147] = new String[] { "i2s", null, "int to short" };

    // Comparisons
    opcodes[148] = new String[] { "lcmp", null, "Compare long" };
    opcodes[149] = new String[] { "fcmpl", null, "Compare float (lower?}" };
    opcodes[150] = new String[] { "fcmpg", null, "Compare float (greater?}" };
    opcodes[151] = new String[] { "dcmpl", null, "Compare double" };// todo
    opcodes[152] = new String[] { "dcmpg", null, "Compare double" };// todo
    opcodes[153] = new String[] { "ifeq", OFFSET_16, "value = 0" };
    opcodes[154] = new String[] { "ifne", OFFSET_16, "value ≠ 0" };
    opcodes[155] = new String[] { "iflt", OFFSET_16, "value < 0" };
    opcodes[156] = new String[] { "ifge", OFFSET_16, "value ≤ 0" };
    opcodes[157] = new String[] { "ifgt", OFFSET_16, "value > 0" };
    opcodes[158] = new String[] { "ifle", OFFSET_16, "value ≥ 0" };
    opcodes[159] = new String[] { "if_icmpeq", OFFSET_16, "value1 = value2" };
    opcodes[160] = new String[] { "if_icmpne", OFFSET_16, "value1 ≠ value2" };
    opcodes[161] = new String[] { "if_icmplt", OFFSET_16, "value1 < value2" };
    opcodes[162] = new String[] { "if_icmpge", OFFSET_16, "value1 ≥ value2" };
    opcodes[163] = new String[] { "if_icmpgt", OFFSET_16, "value1 > value2" };
    opcodes[164] = new String[] { "if_icmple", OFFSET_16, "value1 ≤ value2" };
    opcodes[165] = new String[] { "if_acmpeq", OFFSET_16,
        "Branch if reference comparison succeeds: if value1 = value2" };
    opcodes[166] = new String[] { "if_acmpne", OFFSET_16,
        "Branch if reference comparison succeeds: if value1 ≠ value2" };

    // Control
    opcodes[167] = new String[] { "goto", OFFSET_16, "Branch always" };
    opcodes[168] = new String[] { "jsr", OFFSET_16, "Jump subroutine" };
    opcodes[169] = new String[] { "ret", LCLVAR_08, "Return from subroutine" };
    opcodes[170] = new String[] { "tableswitch", TABLESWITCH, "Access jump table by index and jump" };
    opcodes[171] = new String[] { "lookupswitch", LOOKUPSWITCH, "Access jump table by key match and jump" };
    opcodes[172] = new String[] { "ireturn", null, "Return int from method" };
    opcodes[173] = new String[] { "lreturn", null, "Return long from method" };
    opcodes[174] = new String[] { "freturn", null, "Return float from method" };
    opcodes[175] = new String[] { "dreturn", null, "Return double from method" };
    opcodes[176] = new String[] { "areturn", null, "Return reference from method" };
    opcodes[177] = new String[] { "return", null, "Return void from method" };

    // References
    opcodes[178] = new String[] { "getstatic", CPINDX_16, "Get static field from class" };
    opcodes[179] = new String[] { "putstatic", CPINDX_16, "Set static field in class" };
    opcodes[180] = new String[] { "getfield", CPINDX_16, "Fetch field from object" };
    opcodes[181] = new String[] { "putfield", CPINDX_16, "Set field in object" };

    opcodes[182] = new String[] { "invokevirtual", CPINDX_16, "Invoke instance method; dispatch based on class" };
    opcodes[183] = new String[] { "invokespecial", CPINDX_16,
        "Invoke instance method; special handling for superclass, private, and instance initialization method invocations" };
    opcodes[184] = new String[] { "invokestatic", CPINDX_16, "Invoke a class (static} method" };
    opcodes[185] = new String[] { "invokeinterface", INVINT_64, "Invoke interface method" };
    opcodes[186] = new String[] { "invokedynamic", INVINT_64, "Invoke dynamic method" };

    opcodes[187] = new String[] { "new", CPINDX_16, "Create new object" };
    opcodes[188] = new String[] { "newarray", NEWARRAY_TYPE, "Create new array" };
    opcodes[189] = new String[] { "anewarray", CPINDX_16, "Create new array of reference" };
    opcodes[190] = new String[] { "arraylength", null, "Get length of array" };
    opcodes[191] = new String[] { "athrow", null, "Throw exception or error" };
    opcodes[192] = new String[] { "checkcast", CPINDX_16, "Check whether object is of given type" };
    opcodes[193] = new String[] { "instanceof", CPINDX_16, "Determine if object is of given type" };
    opcodes[194] = new String[] { "monitorenter", null, "Enter monitor for object" };
    opcodes[195] = new String[] { "monitorexit", null, "Exit monitor for object" };

    // Extended

    opcodes[196] = new String[] { "wide", WIDE, "Extend local variable index by additional bytes" };

    opcodes[197] = new String[] { "multianewarray", MULTIANEWARRAY_TYPE, "Create new multidimensional array" };
    opcodes[198] = new String[] { "ifnull", OFFSET_16, "Branch if reference is null" };
    opcodes[199] = new String[] { "ifnonnull", OFFSET_16, "Branch if reference not null" };

    opcodes[200] = new String[] { "goto_w", null/** TODO OFFSET_32 */
        , "Branch always (wide index)" };
    opcodes[201] = new String[] { "jsr_w", null/** TODO OFFSET_32 */
        , "Jump subroutine (wide index)" };

    for (int i = 0; i < opcodes.length; i++) {
      if (i > 0) {
        System.out.print("|");
      }
      String v = opcodes[i][0];
      if (v == null) {
        v = "";
      }
      System.out.print(v);
    }

  }

}