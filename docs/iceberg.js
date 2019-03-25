/**
@preserve Copyright 2017-2019 Dmitriy Gulyaev.
 */
function main(dataView, isEmbedded, container) {

    if (isEmbedded) {
        dataView = base64ToArrayBuffer(dataView);
    }

    function base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return new DataView(bytes.buffer);
    }

    /** @const */
    var TABLE_WIDTH = "900px";

    /** @const */
    var BYTECODE_BEHAVIORS_FOR_METHOD_HANDLES = [
	null,
	"REF_getField",
	"REF_getStatic",
	"REF_putField",
	"REF_putStatic",
	"REF_invokeVirtual",
	"REF_invokeStatic",
	"REF_invokeSpecial",
	"REF_newInvokeSpecial",
	"REF_invokeInterface"];

    /** @const */
    var ACC_PUBLIC = ["PUBLIC", 0x0001];
    /** @const */
    var ACC_PRIVATE = ["PRIVATE", 0x0002];
    /** @const */
    var ACC_PROTECTED = ["PROTECTED", 0x0004];
    /** @const */
    var ACC_STATIC = ["STATIC", 0x0008];
    /** @const */
    var ACC_FINAL = ["FINAL", 0x0010];
    /** @const */
    var ACC_ABSTRACT = ["ABSTRACT", 0x0400];
    /** @const */
    var ACC_SYNTHETIC = ["SYNTHETIC", 0x1000];
    /** @const */
    var ACC_ENUM = ["ENUM", 0x4000];
    /** @const */
    var ACCESS_CLASS = [
        ACC_PUBLIC,
        ACC_FINAL,
        ["SUPER", 0x0020],
        ["VALUE_TYPE", 0x0100],
        ["INTERFACE", 0x0200],
        ACC_ABSTRACT,
        ACC_SYNTHETIC,
        ["ANNOTATION", 0x2000],
        ACC_ENUM
    ];
    /** @const */
    var ACCESS_METHOD = [
        ACC_PUBLIC,
        ACC_PRIVATE,
        ACC_PROTECTED,
        ACC_STATIC,
        ACC_FINAL,
        ["SYNCHRONIZED", 0x0020],
        ["BRIDGE", 0x0040],
        ["VARARGS", 0x0080],
        ["NATIVE", 0x0100],
        ACC_ABSTRACT,
        ["STRICT", 0x0800],
        ACC_SYNTHETIC
    ];
    /** @const */
    var ACCESS_FIELD = [
        ACC_PUBLIC,
        ACC_PRIVATE,
        ACC_PROTECTED,
        ACC_STATIC,
        ACC_FINAL,
        ["VOLATILE", 0x0040],
        ["TRANSIENT", 0x0080],
        ["FLATTENABLE", 0x0100],
        ACC_SYNTHETIC,
        ACC_ENUM
    ];

    /** @const */
    var CONSTANT_Class = 7;
    /** @const */
    var CONSTANT_Fieldref = 9;
    /** @const */
    var CONSTANT_Methodref = 10;
    /** @const */
    var CONSTANT_InterfaceMethodref = 11;
    /** @const */
    var CONSTANT_String = 8;
    /** @const */
    var CONSTANT_Integer = 3;
    /** @const */
    var CONSTANT_Float = 4;
    /** @const */
    var CONSTANT_Long = 5;
    /** @const */
    var CONSTANT_Double = 6;
    /** @const */
    var CONSTANT_NameAndType = 12;
    /** @const */
    var CONSTANT_Utf8 = 1;
    /** @const */
    var CONSTANT_MethodHandle = 15;
    /** @const */
    var CONSTANT_MethodType = 16;
    /** @const */
    var CONSTANT_InvokeDynamic = 18;

    /** @const */
    var ATTRIBUTES_ANNT = "AnnotationDefault";
    /** @const */
    var ATTRIBUTES_BOOT = "BootstrapMethods";
    /** @const */
    var ATTRIBUTES_CODE = "Code";
    /** @const */
    var ATTRIBUTES_CONS = "ConstantValue";
    /** @const */
    var ATTRIBUTES_DEPR = "Deprecated";
    /** @const */
    var ATTRIBUTES_ENCL = "EnclosingMethod";
    /** @const */
    var ATTRIBUTES_EXCP = "Exceptions";
    /** @const */
    var ATTRIBUTES_INNR = "InnerClasses";
    /** @const */
    var ATTRIBUTES_LINE = "LineNumberTable";
    /** @const */
    var ATTRIBUTES_LCVT = "LocalVariableTable";
    /** @const */
    var ATTRIBUTES_LCTT = "LocalVariableTypeTable";
    /** @const */
    var ATTRIBUTES_RIAN = "RuntimeInvisibleAnnotations";
    /** @const */
    var ATTRIBUTES_RIPA = "RuntimeInvisibleParameterAnnotations";
    /** @const */
    var ATTRIBUTES_RVAN = "RuntimeVisibleAnnotations";
    /** @const */
    var ATTRIBUTES_RVPA = "RuntimeVisibleParameterAnnotations";
    /** @const */
    var ATTRIBUTES_SIGN = "Signature";
    /** @const */
    var ATTRIBUTES_SRCD = "SourceDebugExtension";
    /** @const */
    var ATTRIBUTES_SRCF = "SourceFile";
    /** @const */
    var ATTRIBUTES_STAK = "StackMapTable";
    /** @const */
    var ATTRIBUTES_SYNT = "Synthetic";

    //https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html

    /** @const */
    var CPINDX_08 = 2;
    /** @const */
    var CPINDX_16 = 3;
    /** @const */
    var OFFSET_16 = 4;
    /** @const */
    var INVINT_64 = 5;
    /** @const */
    var LCLVAR_08 = 6;
    /** @const */
    var IINC_16 = 7;
    /** @const */
    var VALUE_08 = 8;
    /** @const */
    var VALUE_16 = 9;
    /** @const */
    var TABLESWITCH = 10;
    /** @const */
    var LOOKUPSWITCH = 11;
    /** @const */
    var WIDE = 12;
    /** @const */
    var MULTIANEWARRAY_TYPE = 13;
    /** @const */
    var NEWARRAY_TYPE = 14;

    /** @const */
    var REF_getField = 1;
    /** @const */
    var REF_getStatic = 2;
    /** @const */
    var REF_putField = 3;
    /** @const */
    var REF_putStatic = 4;
    /** @const */
    var REF_invokeVirtual = 5;
    /** @const */
    var REF_invokeStatic = 6;
    /** @const */
    var REF_invokeSpecial = 7;
    /** @const */
    var REF_newInvokeSpecial = 8;
    /** @const */
    var REF_invokeInterface = 9;

    var opcodes = new Array(256);

    var opCodeMnemonics = "nop|aconst_null|iconst_m1|iconst_0|iconst_1|iconst_2|iconst_3|iconst_4|iconst_5|lconst_0|lconst_1|fconst_0|fconst_1|fconst_2|dconst_0|dconst_1|bipush|sipush|ldc|ldc_w|ldc2_w|iload|lload|fload|dload|aload|iload_0|iload_1|iload_2|iload_3|lload_0|lload_1|lload_2|lload_3|fload_0|fload_1|fload_2|fload_3|dload_0 |dload_1 |dload_2 |dload_3 |aload_0|aload_1|aload_2|aload_3|iaload|laload|faload|daload|aaload|baload|caload|saload|istore|lstore|fstore|dstore|astore|istore_0|istore_1|istore_2|istore_3|lstore_0|lstore_1|lstore_2|lstore_3|fstore_0|fstore_1|fstore_2|fstore_3|dstore_0|dstore_1|dstore_2|dstore_3|astore_0|astore_1|astore_2|astore_3|iastore|lastore|fastore|dastore|aastore|bastore|castore|sastore|pop|pop2|dup|dup_x1|dup_x2|dup2|dup2_x1|dup2_x2|swap|iadd|ladd|fadd|dadd|isub|lsub|fsub|dsub|imul|lmul|fmul|dmul|idiv|ldiv|fdiv|ddiv|irem|lrem|frem|drem|ineg|lneg|fneg|dneg|ishl|lshl|ishr|lshr|iushr|lushr|iand|land|ior|lor|ixor|lxor|iinc|i2l|i2f|i2d|l2i|l2f|l2d|f2i|f2l|f2d|d2i|d2l|d2f|i2b|i2c|i2s|lcmp|fcmpl|fcmpg|dcmpl|dcmpg|ifeq|ifne|iflt|ifge|ifgt|ifle|if_icmpeq|if_icmpne|if_icmplt|if_icmpge|if_icmpgt|if_icmple|if_acmpeq|if_acmpne|goto|jsr|ret|tableswitch|lookupswitch|ireturn|lreturn|freturn|dreturn|areturn|return|getstatic|putstatic|getfield|putfield|invokevirtual|invokespecial|invokestatic|invokeinterface|invokedynamic|new|newarray|anewarray|arraylength|athrow|checkcast|instanceof|monitorenter|monitorexit|wide|multianewarray|ifnull|ifnonnull||||defaultvalue|withfield|||||||||||||||||||||||||||||||||||||||||||||||||||".split("|");
    var opCodeFlags = "||||||||||||||||8|9|2|3|3|6|6|6|6|6|||||||||||||||||||||||||||||6|6|6|6|6||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||7|||||||||||||||||||||4|4|4|4|4|4|4|4|4|4|4|4|4|4|4|4|6|10|11|||||||3|3|3|3|3|3|3|5|5|3|14|3|||3|3|||12|13|4|4||||3|3|||||||||||||||||||||||||||||||||||||||||||||||||||".split("|");
    var opCodeDescs = "Do nothing|null|int constant -1|int constant 0|int constant 1|int constant 2|int constant 3|int constant 4|int constant 5|long constant 0|long constant 1|float 0|float 1|float 2|double 0|double 1|byte, sign-extended to an int value|short, sign-extended to an int value|item from run-time constant pool|item from run-time constant pool (wide index}|long or double from run-time constant pool (wide index}|int from local variable|long from local variable|float from local variable|double from local variable|reference from local variable|int from local variable 0|int from local variable 1|int from local variable 2|int from local variable 3|long from local variable 0|long from local variable 1|long from local variable 2|long from local variable 3|float from local variable 0|float from local variable 1|float from local variable 2|float from local variable 3|double from local variable 0|double from local variable 1|double from local variable 2|double from local variable 3|reference from local variable 0|reference from local variable 1|reference from local variable 2|reference from local variable 3|int from array|long from array|float from array|double from array|reference from array|byte or boolean from array|char from array|short from array|int into local variable|long into local variable|float into local variable|double into local variable|reference into local variable|int into local variable 0|int into local variable 1|int into local variable 2|int into local variable 3|long 0 into local variable|long 1 into local variable|long 2 into local variable|long 3 into local variable|float 0 into local variable|float 1 into local variable|float 2 into local variable|float 3 into local variable|double 0 into local variable|double 1 into local variable|double 2 into local variable|double 3 into local variable|reference into local variable 0|reference into local variable 1|reference into local variable 2|reference into local variable 3|into int array|into long array|into float array|into double array|into reference array|into byte or boolean array|into char array|into short array|Pop the top operand stack value|Pop the top one or two operand stack values|Duplicate the top operand stack value|Duplicate the top operand stack value and insert two values down|Duplicate the top operand stack value and insert two or three values down|Duplicate the top one or two operand stack values|Duplicate the top one or two operand stack values and insert two or three values down|Duplicate the top one or two operand stack values and insert two, three, or four values down|Swap the top two operand stack values|Add int|Add long|Add float|Add double|Subtract int|Subtract long|Subtract float|Subtract double|Multiply int|Multiply long|Multiply float|Multiply double|Divide int|Divide long|Divide float|Divide double|Remainder int|Remainder long|Remainder float|Remainder double|Negate int|Negate long|Negate float|Negate double|Shift left int|Shift left long|Arithmetic shift right int|Arithmetic shift right long|Logical shift right int|Logical shift right long|Boolean AND int|Boolean AND long|Boolean OR int|Boolean OR long|Boolean XOR int|Boolean XOR long|Increment local variable by constant|int to long|int to float|int to double|long to int|long to float|long to double|float to int|float to long|float to double|double to int|double to long|double to float|int to byte|int to char|int to short|Compare long|Compare float (lower?}|Compare float (greater?}|Compare double|Compare double|value = 0|value ≠ 0|value < 0|value ≤ 0|value > 0|value ≥ 0|value1 = value2|value1 ≠ value2|value1 < value2|value1 ≥ value2|value1 > value2|value1 ≤ value2|Branch if reference comparison succeeds: if value1 = value2|Branch if reference comparison succeeds: if value1 ≠ value2|Branch always|Jump subroutine|Return from subroutine|Access jump table by index and jump|Access jump table by key match and jump|Return int from method|Return long from method|Return float from method|Return double from method|Return reference from method|Return void from method|Get static field from class|Set static field in class|Fetch field from object|Set field in object|Invoke instance method; dispatch based on class|Invoke instance method; special handling for superclass, private, and instance initialization method invocations|Invoke a class (static} method|Invoke interface method|Invoke dynamic method|Create new object|Create new array|Create new array of reference|Get length of array|Throw exception or error|Check whether object is of given type|Determine if object is of given type|Enter monitor for object|Exit monitor for object|Extend local variable index by additional bytes|Create new multidimensional array|Branch if reference is null|Branch if reference not null||||Provide a value class instance with all its instance variables set to their default value|Return an instance of a value class with an updated instance field|||||||||||||||||||||||||||||||||||||||||||||||||||".split("|");

    //The third reserved opcode, number 202 (0xca), has the mnemonic breakpoint and is intended to be used by debuggers to implement breakpoints.


    //-------------------------------code-------------------------------------

    function read_class(dataView, container) {
        var c = 0;

        function r() {
            var result = dataView.getUint8(c);
            c += 1;
            return result;
        }

        function r2() {
            var result = dataView.getUint16(c);
            c += 2;
            return result;
        }

        function r4() {
            var result = dataView.getUint32(c);
            c += 4;
            return result;
        }

        function getConstantPoolItem(index){
            return classFile.constant_pool[index];
        }

        function read_attribute() {
            var attribute_info = new Object();
            attribute_info.attribute_name_index = r2();
            attribute_info.attribute_length = r4();

            var attributeName = getConstantPoolItem(attribute_info.attribute_name_index).bytes;
            if (ATTRIBUTES_CODE == attributeName) {
                attribute_info.max_stack = r2();
                attribute_info.max_locals = r2();
                attribute_info.code_length = r4();
                attribute_info.code = new Array(attribute_info.code_length);
                for (var c = 0; c < attribute_info.code_length; c++) {
                    attribute_info.code[c] = r();
                }
                attribute_info.exception_table_length = r2();
                attribute_info.exception_table = new Array(attribute_info.exception_table_length);
                for (var e = 0; e < attribute_info.exception_table_length; e++) {
                    var exception_table_entry = new Object();
                    exception_table_entry.start_pc = r2();
                    exception_table_entry.end_pc = r2();
                    exception_table_entry.handler_pc = r2();
                    exception_table_entry.catch_type = r2();
                    attribute_info.exception_table[e] = exception_table_entry;
                }
                attribute_info.attributes_count = r2();
                attribute_info.attributes = new Array(attribute_info.attributes_count);
                for (var a = 0; a < attribute_info.attributes_count; a++) {
                    attribute_info.attributes[a] = read_attribute();
                }
                return attribute_info;
            } else if (ATTRIBUTES_CONS == attributeName) {
                attribute_info.constantvalue_index = r2();
                return attribute_info;
            } else if (ATTRIBUTES_SIGN == attributeName) {
                attribute_info.signature_index = r2();
                return attribute_info;
            } else if (ATTRIBUTES_ENCL == attributeName) {
                attribute_info.class_index = r2();
                attribute_info.method_index = r2();
                return attribute_info;
            } else if (ATTRIBUTES_BOOT == attributeName) {
                attribute_info.num_bootstrap_methods = r2();
                attribute_info.bootstrap_methods = new Array(attribute_info.num_bootstrap_methods);
                for (var a = 0; a < attribute_info.num_bootstrap_methods; a++) {
                    var bootstrap_method = new Object();
                    bootstrap_method.bootstrap_method_ref = r2();
                    bootstrap_method.num_bootstrap_arguments = r2();
                    bootstrap_method.bootstrap_arguments = new Array(bootstrap_method.num_bootstrap_arguments);
                    for (var args = 0; args < bootstrap_method.num_bootstrap_arguments; args++) {
                        bootstrap_method.bootstrap_arguments[args] = r2();
                    }
                    attribute_info.bootstrap_methods[a] = bootstrap_method;
                }
                return attribute_info;
            } else if (ATTRIBUTES_INNR == attributeName) {
                //attribute_info.signature_index = r2();
                attribute_info.number_of_classes = r2();
                attribute_info.classes = new Array(attribute_info.number_of_classes);
                for (var innr = 0; innr < attribute_info.number_of_classes; innr++) {
                    var iClass = {};
                    iClass.inner_class_info_index = r2();
                    iClass.outer_class_info_index = r2();
                    iClass.inner_name_index = r2();
                    iClass.inner_class_access_flags = r2();
                    attribute_info.classes[innr] = iClass;
                }
                return attribute_info;
            } else if (ATTRIBUTES_EXCP == attributeName) {
                attribute_info.number_of_exceptions = r2();
                attribute_info.exception_index_table = new Array(attribute_info.number_of_exceptions);
                for (var aln = 0; aln < attribute_info.number_of_exceptions; aln++) {
                    attribute_info.exception_index_table[aln] = r2();
                }
                return attribute_info;
            } else if (ATTRIBUTES_LINE == attributeName) {
                attribute_info.line_number_table_length = r2();
                attribute_info.line_number_table = new Array(attribute_info.line_number_table_length);
                for (var aln = 0; aln < attribute_info.line_number_table_length; aln++) {
                    var line_number_tableEntry = new Object();
                    line_number_tableEntry.start_pc = r2();
                    line_number_tableEntry.line_number = r2();
                    attribute_info.line_number_table[aln] = line_number_tableEntry;
                }
                return attribute_info;
            } else if (ATTRIBUTES_LCVT == attributeName || ATTRIBUTES_LCTT == attributeName) {
                var isATTRIBUTES_LCVT = ATTRIBUTES_LCVT == attributeName;
                attribute_info.local_variable_table_length = r2();
                attribute_info.local_variable_table = new Array(attribute_info.local_variable_table_length);
                for (var aln = 0; aln < attribute_info.local_variable_table_length; aln++) {
                    var local_variable_tableEntry = new Object();
                    local_variable_tableEntry.start_pc = r2();
                    local_variable_tableEntry.length = r2();
                    local_variable_tableEntry.name_index = r2();
                    local_variable_tableEntry.descriptor_OR_signature_index = r2();
                    local_variable_tableEntry.index = r2();
                    attribute_info.local_variable_table[aln] = local_variable_tableEntry;
                }
                return attribute_info;

            }
            /*else if (ATTRIBUTES_LCTT == attributeName) {
            // todo mix with ATTRIBUTES_LCVT
            attribute_info.local_variable_type_table_length = r2();
            attribute_info.local_variable_type_table = new Array(attribute_info.local_variable_type_table_length);
            for (var aln = 0; aln < attribute_info.local_variable_type_table_length; aln++) {
            var local_variable_tableEntry = new Object();
            local_variable_tableEntry.start_pc = r2();
            local_variable_tableEntry.length = r2();
            local_variable_tableEntry.name_index = r2();
            local_variable_tableEntry.signature_index = r2();
            local_variable_tableEntry.index = r2();
            attribute_info.local_variable_type_table[aln] = local_variable_tableEntry;
            }
            return attribute_info;

            }*/
            else if (ATTRIBUTES_SRCF == attributeName) {
                attribute_info.sourcefile_index = r2();
                return attribute_info;
            } else {
                //alert("Unhandled attribute: "+attributeName);
            }

            //alert(attribute_info.attribute_length);
            for (var a = 0; a < attribute_info.attribute_length; a++) {
                r();
            }
            return attribute_info;
        }

        function readFields() {
            for (var f = 0; f < classFile.fields_count; f++) {
                var field_info = new Object();
                field_info.access_flags = r2();
                field_info.name_index = r2();
                field_info.descriptor_index = r2();
                field_info.attributes_count = r2();
                field_info.attributes = new Array(field_info.attributes_count);

                for (var a = 0; a < field_info.attributes_count; a++) {
                    field_info.attributes[a] = read_attribute();
                }
                classFile.fields[f] = field_info;
            }
        }

        function readMethods() {
            for (var m = 0; m < classFile.methods_count; m++) {
                var method_info = new Object();
                method_info.access_flags = r2();
                method_info.name_index = r2();
                method_info.descriptor_index = r2();
                method_info.attributes_count = r2();
                method_info.attributes = new Array(method_info.attributes_count);

                for (var a = 0; a < method_info.attributes_count; a++) {
                    method_info.attributes[a] = read_attribute();
                }
                classFile.methods[m] = method_info;
            }
        }

        function read_interfaces() {
            for (var i = 0; i < classFile.interfaces_count; i++) {
                classFile.interfaces[i] = r2();
            }
        }

        function read_cp() {
            var tagcounter = 1;
            while (tagcounter < classFile.constant_pool_count) {

                var tag = r();
                var cpInfo = new Object();
                cpInfo.tag = tag;

                switch (tag) {

                case CONSTANT_Class:
                    cpInfo.name_index = r2();
                    break;

                case CONSTANT_Fieldref:
                case CONSTANT_Methodref:
                case CONSTANT_InterfaceMethodref:
                    cpInfo.class_index = r2();
                    cpInfo.name_and_type_index = r2();
                    break;

                case CONSTANT_String:
                    cpInfo.string_index = r2();
                    break;

                case CONSTANT_Integer:
                case CONSTANT_Float:
                    cpInfo.bytes = r4();
                    break;

                case CONSTANT_Long:
                case CONSTANT_Double:
                    cpInfo.high_bytes = r4();
                    cpInfo.low_bytes = r4();
                    break;

                case CONSTANT_NameAndType:
                    cpInfo.name_index = r2();
                    cpInfo.descriptor_index = r2();
                    break;

                case CONSTANT_Utf8:
                    cpInfo.length = r2();
                    var bytes = "";
                    var tempArray = new Array(cpInfo.length);

                    var x = -1;
                    for (var p = 0; p < cpInfo.length; p++) {
                        var tempChar = r();
                        if (tempChar == 208 || tempChar == 209) {
                            x = tempChar;
                            continue
                        }
                        if (x != -1) {
                            var y = tempChar;
                            var xy = ((x & 0x1f) << 6) + (y & 0x3f);
                            bytes += (String.fromCharCode(xy));
                            x = -1;
                            continue;
                        }
                        bytes += (String.fromCharCode(tempChar));
                    }
                    cpInfo.bytes = bytes;
                    break;

                case CONSTANT_MethodHandle:
                    cpInfo.reference_kind = r();
                    cpInfo.reference_index = r2();
                    break;

                case CONSTANT_MethodType:
                    cpInfo.descriptor_index = r2();
                    break;

                case CONSTANT_InvokeDynamic:
                    cpInfo.bootstrap_method_attr_index = r2();
                    cpInfo.name_and_type_index = r2();
                    break;

                default:
                    alert("Unknown tag " + tag + " at place " + tagcounter);
                    cpInfo = null;
                }
                if (cpInfo != null) {
                    classFile.constant_pool[tagcounter] = cpInfo;
                }

                if (tag == CONSTANT_Long || tag == CONSTANT_Double) {
                    tagcounter++;
                }

                tagcounter++;
            }

        }

        function showClass() {

            /** @const */
            var SLASH_TO_DOT_REG_EXP = new RegExp('/', 'g');
            var BRACKET_REG_EXP = new RegExp('\\[', 'g');

            function addRowToTable(tbody, row, methodNumber, indexInCodeArray) {
                var tr = documentCreateElement('tr');

                var tdLN = documentCreateElement('td');
                //tdLN.innerHTML = "LN3";
                tdLN.className = "ln";
                if (methodNumber != null) {
                    //tdLN.id = "m-"+methodNumber+"-"+indexInCodeArray;
                    tdLN.setAttribute("id", "m-" + methodNumber + "-" + indexInCodeArray);
                }
                appendChild(tr, tdLN);

                for (var hdrc = 0; hdrc < row.length; hdrc++) {
                    var td = documentCreateElement('td');
                    td.innerHTML = row[hdrc];
                    if (hdrc == 0) {
                        td.style.textAlign = 'right';
                    }
                    appendChild(tr, td);
                }
                appendChild(tbody, tr);
            }

            function showMethod(method_info, tbody, methodNumber) {

                function getOpCodeTypeAsString(opcode) {
                    if (opcode >= 0 && opcode <= 20) {
                        return "Constants";
                    } else if (opcode >= 21 && opcode <= 53) {
                        return "Loads";
                    } else if (opcode >= 54 && opcode <= 86) {
                        return "Stores";
                    } else if (opcode >= 87 && opcode <= 95) {
                        return "Stack";
                    } else if (opcode >= 96 && opcode <= 132) {
                        return "Math";
                    } else if (opcode >= 133 && opcode <= 147) {
                        return "Conversions";
                    } else if (opcode >= 148 && opcode <= 166) {
                        return "Comparisons";
                    } else if (opcode >= 178 && opcode <= 195) {
                        return "References";
                    } else if (opcode >= 167 && opcode <= 177) {
                        return "Control";
                    } else if (opcode >= 196 && opcode <= 201) {
                        return "Extended";
                    }
                    return "";
                }

                function getTagType(tag) {
                    switch (tag) {

                    case CONSTANT_Class:
                        return "Class";
                    case CONSTANT_Fieldref:
                        return "Field";
                    case CONSTANT_Methodref:
                        return "Method";
                    case CONSTANT_InterfaceMethodref:
                        return "InterfaceMethod";
                    case CONSTANT_String:
                        return "String";
                    case CONSTANT_Integer:
                        return "Integer";
                    case CONSTANT_Float:
                        return "Float";
                    case CONSTANT_Long:
                        return "Long";
                    case CONSTANT_Double:
                        return "Double";
                    case CONSTANT_NameAndType:
                        return "NameAndType";
                    case CONSTANT_Utf8:
                        return "Utf8";
                    case CONSTANT_MethodHandle:
                        return "MethodHandle";
                    case CONSTANT_MethodType:
                        return "MethodType";
                    case CONSTANT_InvokeDynamic:
                        return "InvokeDynamic";
                    }
                }
                function getOperandType(cpIndex) {
                    return getTagType(getConstantPoolItem(cpIndex).tag);
                }

                function readUINT32FromBuffer(buffer, offset) {
                    var byte1 = buffer[offset + 0];
                    var byte2 = buffer[offset + 1];
                    var byte3 = buffer[offset + 2];
                    var byte4 = buffer[offset + 3];
                    return (byte1 << 24) | (byte2 << 16) | (byte3 << 8) | byte4;
                }

                function getLocalVariableName(isStore, variableIndex, methodAttributesIndex) {
                    var attributes = method_info.attributes[methodAttributesIndex].attributes;
                    for (var a = 0; a < attributes.length; a++) {
                        if (attributes[a].local_variable_table) {
                            var lvt = attributes[a].local_variable_table;
                            for (var v = 0; v < lvt.length; v++) {
                                var tyu = lvt[v];
                                if (tyu.index == variableIndex) {
                                    return (isStore ? "&rarr;" : "&larr;") + " <b title='" + getUTF8(tyu.descriptor_OR_signature_index) + "'>" + getUTF8(tyu.name_index) + "</b>";
                                }
                            }
                        }
                    }
                    return "localvar #" + variableIndex;
                }

                for (var methodAttributes = 0; methodAttributes < method_info.attributes_count; methodAttributes++) {
                    var attributeNameIndex = method_info.attributes[methodAttributes].attribute_name_index;
                    var attributeName = getConstantPoolItem(attributeNameIndex).bytes;

                    var attributeValue = "";

                    if (ATTRIBUTES_CODE == attributeName) {
                        var codeAttributeRecord = method_info.attributes[methodAttributes];
                        attributeValue = "max_stack = <b>" + codeAttributeRecord.max_stack + "</b>, max_locals = <b>" + codeAttributeRecord.max_locals + "</b>";
                        addKeyValue(tbody, attributeName, attributeValue, null);

                        var isWide = false;
                        var code = method_info.attributes[methodAttributes].code;
                        for (var oc = 0; oc < method_info.attributes[methodAttributes].code_length; oc++) {
                            var ocPlace = oc;
                            var opcode = code[oc];
                            var title = '';

                            var opcodeMnemonic = opCodeMnemonics[opcode];
                            if (!opcodeMnemonic) {
                                alert("opcode " + opcode);
                                opcodeMnemonic = opcode;
                            } else {
                                title = opCodeDescs[opcode];
                                if (opcode >= 1 && opcode <= 20) {
                                    title = "Push " + title;
                                } else if (opcode >= 21 && opcode <= 53) {
                                    title = "Load " + title;
                                } else if (opcode >= 54 && opcode <= 86) {
                                    title = "Store " + title;
                                } else if (opcode >= 133 && opcode <= 147) {
                                    title = "Convert " + title;
                                } else if (opcode >= 153 && opcode <= 164) {
                                    title = "Branch if int comparison succeeds: " + title;
                                }
                            }

                            var idx = null;
                            var descAsNumber = null;
                            var desc2 = null;
                            var offset = null;
                            var operandType = '';

                            if (opCodeFlags[opcode]) {
                                var opcodeType = Number.parseInt(opCodeFlags[opcode], 10);

                                switch (opcodeType) {
                                case CPINDX_16: {
                                        var v1 = code[oc + 1];
                                        var v2 = code[oc + 2];
                                        idx = (v1 << 8) | v2;
                                        oc += 2;
                                        operandType = getOperandType(idx);
                                        break;
                                    }
                                case CPINDX_08: {
                                        var v1 = code[oc + 1];
                                        idx = v1;
                                        oc += 1;
                                        operandType = getOperandType(idx);
                                        break;
                                    }
                                case OFFSET_16: {
                                	var v1 = code[oc + 1];
                                	var v2 = code[oc + 2];
                                	offset = (v1 << 8) | v2;
                                	if ((offset + ocPlace) > 0xFFFF) {
                                		offset = offset - 65536;
                                	}
                                	oc += 2;
                                	operandType = "Offset";
                                	break;
                                }
                                case IINC_16: {
                                        // TODO
                                        var varIndex = "?",
                                        varConst = "?";

                                        if (isWide) {
                                            oc += 2;
                                            isWide = false;
                                        } else {
                                            varIndex = code[oc + 1];
                                            varConst = code[oc + 2];
                                            if (varConst > 127) {
                                                varConst = varConst - 256;
                                            }
                                        }
                                        desc2 = getLocalVariableName(false, varIndex, methodAttributes) + ", " + varConst;
                                        oc += 2;
                                        break;
                                    }
                                case INVINT_64: {
                                        var v1 = code[oc + 1];
                                        var v2 = code[oc + 2];
                                        idx = (v1 << 8) | v2;
                                        oc += 4;
                                        operandType = getOperandType(idx);
                                        break;
                                    }
                                case LCLVAR_08: {
                                        var varIndex = code[oc + 1];
                                        desc2 = getLocalVariableName((opcode >= 54 && opcode <= 58), varIndex, methodAttributes);
                                        oc += 1;
                                        break;
                                    }
                                case VALUE_16: {
                                        var v1 = code[oc + 1];
                                        var v2 = code[oc + 2];
                                        descAsNumber = formatNumber((v1 << 8) | v2);
                                        oc += 2;
                                        break;
                                    }
                                case MULTIANEWARRAY_TYPE: {
                                        var v1 = code[oc + 1];
                                        var v2 = code[oc + 2];
                                        var dimensions = code[oc + 3];
                                        idx = (v1 << 8) | v2;
                                        operandType = getOperandType(idx);
                                        oc += 3;
                                        break;
                                    }
                                case VALUE_08: {
                                        var v1 = code[oc + 1];
                                        descAsNumber = formatNumber(v1 > 127 ? v1 - 256 : v1);
                                        oc += 1;
                                        break;
                                    }
                                case TABLESWITCH: {
                                        var y = 1;
                                        while ((oc + y) % 4 != 0) {
                                            y++;
                                        }

                                        var _default = readUINT32FromBuffer(code, oc + y);
                                        var _low = readUINT32FromBuffer(code, oc + y + 4);
                                        var _high = readUINT32FromBuffer(code, oc + y + 8);

                                        var offsets = (_high - _low + 1);

                                        desc2 = "";
                                        for (var pn = 0; pn < offsets; pn++) {
                                            var o = readUINT32FromBuffer(code, oc + y + 12 + pn * 4);
                                            desc2 += "" + (pn + _low) + ": go to " + (o + oc) + "<br/>";
                                        }

                                        oc += offsets * 4 + 12 + y - 1;
                                        break;
                                    }
                                case LOOKUPSWITCH: {
                                        var y = 1;
                                        while ((oc + y) % 4 != 0) {
                                            y++;
                                        }

                                        var _default = readUINT32FromBuffer(code, oc + y);
                                        var _npairs = readUINT32FromBuffer(code, oc + y + 4);

                                        desc2 = "default: go to <b>" + (_default + oc) + "</b><br/>";
                                        for (var pn = 0; pn < _npairs; pn++) {
                                            var mt = readUINT32FromBuffer(code, oc + y + 8 + pn * 8);
                                            var o = readUINT32FromBuffer(code, oc + y + 8 + pn * 8 + 4);
                                            desc2 += "" + mt + ": go to <b>" + (o + oc) + "</b><br/>";
                                        }

                                        oc += _npairs * 4 * 2 + 8 + y - 1;
                                        break;
                                    }
                                case WIDE: {
                                        isWide = true;
                                        break;
                                    }
                                case NEWARRAY_TYPE: {
                                        var atype = code[oc + 1];
                                        desc2 = getArrayTypeCodeName(atype);
                                        oc++;
                                        break;
                                    }
                                }

                            }
                            /*
                            59 (0x3b)    istore_0
                            60 (0x3c)    istore_1
                            61 (0x3d)    istore_2
                            62 (0x3e)    istore_3
                            63 (0x3f)    lstore_0
                            64 (0x40)    lstore_1
                            65 (0x41)    lstore_2
                            66 (0x42)    lstore_3
                            67 (0x43)    fstore_0
                            68 (0x44)    fstore_1
                            69 (0x45)    fstore_2
                            70 (0x46)    fstore_3
                            71 (0x47)    dstore_0
                            72 (0x48)    dstore_1
                            73 (0x49)    dstore_2
                            74 (0x4a)    dstore_3
                            75 (0x4b)    astore_0
                            76 (0x4c)    astore_1
                            77 (0x4d)    astore_2
                            78 (0x4e)    astore_3
                             */
                            if (opcode >= 59 && opcode <= 78) {
                                desc2 = getLocalVariableName(true, (opcode - 59) % 4, methodAttributes);
                            }

                            // iload_0 = 26 (0x1a)
                            // iload_1 = 27 (0x1b)
                            // iload_2 = 28 (0x1c)
                            // iload_3 = 29 (0x1d)
                            // lload_0 = 30 (0x1e)
                            // lload_1 = 31 (0x1f)
                            // lload_2 = 32 (0x20)
                            // lload_3 = 33 (0x21)
                            // fload_0 = 34 (0x22)
                            // fload_1 = 35 (0x23)
                            // fload_2 = 36 (0x24)
                            // fload_3 = 37 (0x25)
                            // dload_0 = 38 (0x26)
                            // dload_1 = 39 (0x27)
                            // dload_2 = 40 (0x28)
                            // dload_3 = 41 (0x29)
                            // aload_0 = 42 (0x2a)
                            // aload_1 = 43 (0x2b)
                            // aload_2 = 44 (0x2c)
                            // aload_3 = 45 (0x2d)
                            if (opcode >= 26 && opcode <= 45) {
                                desc2 = getLocalVariableName(false, (opcode - 26) % 4, methodAttributes);
                            }

                            //document.write("<br/>&nbsp;" + ocPlace + ": " + opcodeMnemonic + " " + idx);
                            var desc = idx ? getArgumentTypeAndValue(idx) : '';
                            if (offset) {
                                desc = "go to <b>" + (ocPlace + offset) + "</b> " + ((offset < 0) ? "&uarr;" : "&darr;");
                            }

                            if (descAsNumber) {
                                desc = descAsNumber;
                            }
                            if (desc2) {
                                desc = desc2;
                            }

                            var className = "oc-" + getOpCodeTypeAsString(opcode).substring(0, 4).toLowerCase();
                            addRowToTable(tbody, [
                                    ocPlace,
                                    "<span  class ='oc " + className + "' title='" + title + "'>" + opcodeMnemonic + "</span>",
                                    /*operandType.charAt(0)*/
                                    '',
                                    desc,
                                    ""], methodNumber, ocPlace);

                        }

                        for (var codeAttributes = 0; codeAttributes < method_info.attributes[methodAttributes].attributes_count; codeAttributes++) {

                            var attributeNameIndex2 = method_info.attributes[methodAttributes].attributes[codeAttributes].attribute_name_index;
                            var codeAttributeName = getConstantPoolItem(attributeNameIndex2).bytes;
                            var codeAttributeValue = "";
                            //addRow3ToTable(tbody, "Code attributes: <b>" + codeAttributeName + "</b>:");

                            if (ATTRIBUTES_LINE == codeAttributeName) {
                                var ttt = method_info.attributes[methodAttributes].attributes[codeAttributes];
                                for (var ln = 0; ln < ttt.line_number_table_length; ln++) {
                                    var lineNumberTable = ttt.line_number_table[ln];
                                    var eid = "m-" + methodNumber + "-" + lineNumberTable.start_pc;
                                    var e = documentGetElementById(eid);
                                    if (e) {
                                        e.innerHTML = lineNumberTable.line_number;
                                    } else {
                                        alert(eid);
                                    }
                                    if (ln > 0) {
                                        codeAttributeValue = codeAttributeValue + ", ";
                                    }
                                    codeAttributeValue = codeAttributeValue + lineNumberTable.start_pc + ":<b>" + lineNumberTable.line_number + "</b>";

                                }
                            } else if (ATTRIBUTES_LCVT == codeAttributeName || ATTRIBUTES_LCTT == codeAttributeName) {
                                var isATTRIBUTES_LCVT = ATTRIBUTES_LCVT == codeAttributeName;
                                var localVariableTableAttribute = method_info.attributes[methodAttributes].attributes[codeAttributes];
                                if (localVariableTableAttribute.local_variable_table_length > 0) {
                                    var descriptionOrSignature = isATTRIBUTES_LCVT ? "descriptor" : "signature";
                                    codeAttributeValue = codeAttributeValue + "<table style='text-align:center;width:" + TABLE_WIDTH + "' border='1'><tr><th width='50px'>start_pc</th><th width='50px'>length</th><th width='100px'>name</th><th>" + descriptionOrSignature + "</th><th width='50px'>index</th></tr>";
                                    for (var ln = 0; ln < localVariableTableAttribute.local_variable_table_length; ln++) {
                                        var lvtt = localVariableTableAttribute.local_variable_table[ln];
                                        codeAttributeValue = codeAttributeValue + "<tr>" +
                                            "<td>" + lvtt.start_pc + "</td>" +
                                            "<td>" + lvtt.length + "</td>" +
                                            "<td>" + getUTF8AsSignature(lvtt.name_index) + "</td>" +
                                            "<td style='text-align:left'>" + getUTF8AsSignature(lvtt.descriptor_OR_signature_index) + "</td>" +
                                            "<td>" + lvtt.index + "</td>" +
                                            "</tr>";
                                    }
                                    codeAttributeValue = codeAttributeValue + "</table>";
                                }
                            } else {
                                //alert("codeAttributeName "+codeAttributeName);
                            }
                            if (!isEmbedded && codeAttributeValue != "") {
                                addKeyValue(tbody, codeAttributeName, codeAttributeValue, null);
                            }
                        }

                    } else if (ATTRIBUTES_EXCP == attributeName) {
                        for (var exceptionIndex = 0; exceptionIndex < method_info.attributes[methodAttributes].number_of_exceptions; exceptionIndex++) {
                            attributeValue = attributeValue + " " + getClassName(method_info.attributes[methodAttributes].exception_index_table[exceptionIndex], false, true, false);
                        }
                    } else if (ATTRIBUTES_SIGN == attributeName) {
                        attributeValue = getUTF8AsSignature(method_info.attributes[methodAttributes].signature_index);
                    } else {
                        //alert(attributeName);
                    }

                    if (attributeName != ATTRIBUTES_CODE) {
                        addKeyValue(tbody, attributeName, attributeValue, null);
                    } else {
                        if (codeAttributeRecord.exception_table_length > 0) {
                            attributeValue = "";

                            attributeValue = "<table style='text-align:center;width:" + TABLE_WIDTH + "' border='1'><tr><th width='50px'>start_pc</th><th width='50px'>end_pc</th><th width='100px'>handler_pc</th><th>catch_type</th</tr>";
                            for (var ln = 0; ln < codeAttributeRecord.exception_table_length; ln++) {
                                var lvtt = codeAttributeRecord.exception_table[ln];
                                var classOfException = lvtt.catch_type == 0 ? "For all exceptions" : getClassName(lvtt.catch_type, false, true, false);
                                attributeValue += "<tr>" +
                                    "<td>" + lvtt.start_pc + "</td>" +
                                    "<td>" + lvtt.end_pc + "</td>" +
                                    "<td>" + lvtt.handler_pc + "</td>" +
                                    "<td style='text-align:left'>" + classOfException + "</td>" +
                                    "</tr>";
                            }
                            attributeValue += "</table>";

                            addKeyValue(tbody, "Exception table", attributeValue, null);
                        }
                    }

                }
            }

            function getArrayTypeCodeName(atype) {
                switch (atype) {
                case 4:
                    return "T_BOOLEAN";
                case 5:
                    return "T_CHAR";
                case 6:
                    return "T_FLOAT";
                case 7:
                    return "T_DOUBLE";
                case 8:
                    return "T_BYTE";
                case 9:
                    return "T_SHORT";
                case 10:
                    return "T_INT";
                case 11:
                    return "T_LONG";
                }
            }

            function showField(field_info, tbody) {
                for (var fa = 0; fa < field_info.attributes_count; fa++) {
                    var fieldAttributeName = getConstantPoolItem(field_info.attributes[fa].attribute_name_index).bytes;
                    var fieldAttributeValue = "";

                    if (ATTRIBUTES_CONS == fieldAttributeName) {
                        var cvi = field_info.attributes[fa].constantvalue_index;
                        fieldAttributeValue = getArgumentTypeAndValue(cvi);
                    } else if (ATTRIBUTES_SIGN == fieldAttributeName) {
                        fieldAttributeValue = getUTF8AsSignature(field_info.attributes[fa].signature_index);
                    } else {
                        //addRow3ToTable(tbody, "Field attribute, <b>" + fieldAttributeName + "</b>:");
                    }
                    addKeyValue(tbody, fieldAttributeName, fieldAttributeValue, null);
                }
            }

            function addRow3ToTable(tbody, txt) {
                var tr = documentCreateElement('tr');

                var tdLN0 = documentCreateElement('td');
                //tdLN0.innerHTML = "LN0";
                tdLN0.className = "ln";
                appendChild(tr, tdLN0);

                var td = documentCreateElement('td');
                td.innerHTML = txt;
                td.colSpan = 5;
                //td.style.backgroundColor = '#ffff00';
                appendChild(tr, td);
                appendChild(tbody, tr);
            }

            function getClassAccessModifiers(accessFlags) {
                return getAccessModifiers(ACCESS_CLASS, accessFlags);
            }

            function getMethodAccessModifiers(accessFlags) {
                return getAccessModifiers(ACCESS_METHOD, accessFlags);
            }

            function getFieldAccessModifiers(accessFlags) {
                return getAccessModifiers(ACCESS_FIELD, accessFlags);
            }

            function getAccessModifiers(array, accessFlags) {
                var result = "";
                for (var m = 0; m < array.length; m++) {
                    if (isMaskSet(accessFlags, array[m])) {
                        result += "<b class='access'>ACC_" + array[m][0] + "</b>" + " ";
                    }
                }
                return result;
            }

            function isMaskSet(accessFlags, maskArray) {
                return ((accessFlags & maskArray[1]) != 0);
            }

            function getUTF8AsSignature(index) {
                var result = getUTF8(index); //.replace(SLASH_TO_DOT_REG_EXP, '.');
                return "<tt>" + result + "</tt>";
                //var a = result.split(SLASH_TO_DOT_REG_EXP);
                //return "<tt>" + a[a.length - 1] + "</tt>";
            }

            function getUTF8(index) {
                var cpUtf8Entry = getConstantPoolItem(index);
                return cpUtf8Entry.bytes.replace(new RegExp('<', 'g'), '&lt;');
            }

            function getFieldOrMethodPlainName(info) {
                var name = getUTF8(info.name_index);
                name = name.replace('<', '&lt;');
                name = name.replace('>', '&gt;');
                return name;
            }

            function getFieldOrMethodName(info, isField) {
                var name = getFieldOrMethodPlainName(info);
                var desc = getUTF8(info.descriptor_index);
                var className = isField ? 'field' : 'method';
                return "<span class='" + className + "' title='" + desc + "'>" + name + "</span> <tt>" + formatDescription(desc) + "</tt>";
            }

            function formatDescription(d) {

                d = d.replace(SLASH_TO_DOT_REG_EXP, '.');
                d = d.replace(new RegExp(';L', 'g'), '; L');
                /*
                d = d.replace(new RegExp('\\(L', 'g'), '(');
                d = d.replace(new RegExp('\\)L', 'g'), ')');
                d = d.replace(new RegExp(';', 'g'), '');
                d = d.replace(new RegExp('^L', 'g'), '');
                 */
                return d;
                /*
                var startPos = -1;
                for (var p = 0; p < d.length; p++) {
                if (d.charAt(p) == ';') {
                if (startPos != -1) {
                return d.substring(startPos, p);
                }
                } else if (d.charAt(p) == '/') {
                startPos = p;
                }
                }
                return d;
                 */
            }

            function formatNumber(v) {
                return "<code style='padding-left:5px;padding-right:5px;background:#00dd00;color:#ffffff'>" + v + "</code>";
            }

            function getClassName(index, isOnlyName, addClassSuffux, isFullName) {
                var prefix = "";
                var cpEntryClass = getConstantPoolItem(index);
                var className = getUTF8(cpEntryClass.name_index);
                className = className.replace(SLASH_TO_DOT_REG_EXP, '.');
                var title = className;

                var semicolonPos = className.lastIndexOf(';');
                if (semicolonPos != -1 && className.length - 1 == semicolonPos) {
                    className = className.substring(0, semicolonPos);
                    className = className.replace(BRACKET_REG_EXP, '[]');
                    prefix = className.substring(0, className.indexOf('L'));
                }

                if (!isFullName) {
                    var lastDot = className.lastIndexOf('.');
                    if (lastDot != -1) {
                        className = className.substring(lastDot + 1);
                    }
                }
                className = prefix + className;

                if (addClassSuffux) {
                    className += ".class";
                }
                if (isOnlyName) {
                    return className;
                } else {
                    return "<span style='background:#00ffff' title='" + title + "'><code>" + className + "</code></span>";
                }
            }

            function getArgumentTypeAndValue(cpIndex) {
                if (cpIndex == 0) {
                    //java.lang.Object
                    return "";
                }

                var cpEntry = getConstantPoolItem(cpIndex);

                switch (cpEntry.tag) {

				case CONSTANT_MethodType:
					return "MethodType: " + getUTF8(cpEntry.descriptor_index);

				case CONSTANT_MethodHandle: {
					var methodHandleInfo = cpEntry;
					var referenceKindStr = BYTECODE_BEHAVIORS_FOR_METHOD_HANDLES[methodHandleInfo.reference_kind];

					var isField;
					switch (methodHandleInfo.reference_kind) {
					case REF_getField:
					case REF_getStatic:
					case REF_putField:
					case REF_putStatic: {
							//CONSTANT_Fieldref_info
							isField = true;
							break;
						}
					case REF_invokeVirtual:
					case REF_newInvokeSpecial: {
							//CONSTANT_Methodref_info
							isField = false;
							break;
						}
					case REF_invokeStatic:
					case REF_invokeSpecial: {
							//CONSTANT_Methodref_info
							isField = false;
							break;
						}
					case REF_invokeInterface: {
							//CONSTANT_InterfaceMethodref_info
							isField = false;
							break;
						}
					}
					var refInfo = getConstantPoolItem(methodHandleInfo.reference_index);
					var classInfo = getConstantPoolItem(refInfo.class_index);
					var nameAndTypeInfo = getConstantPoolItem(refInfo.name_and_type_index);
					var referenceName = getUTF8(classInfo.name_index) + "." + getFieldOrMethodName(nameAndTypeInfo, isField);
					return "MethodHandle: " + referenceKindStr + ", " + referenceName;
				}

                case CONSTANT_NameAndType:
                    return "CONSTANT_NameAndType";

                case CONSTANT_Utf8:
                    return getUTF8(cpIndex);

                case CONSTANT_Long:{
                        var bits = (cpEntry.high_bytes << 32) + cpEntry.low_bytes;
                        if ((bits >> 63) != 0) {
                            bits -= 0xFFFFFFFF;
                        }
                        return formatNumber(bits + "L");
                    }

                case CONSTANT_Double: {
                        var bits = (cpEntry.high_bytes << 32) + cpEntry.low_bytes;
                        var s = ((bits >> 63) == 0) ? 1 : -1;
                        var e = ((bits >> 52) & 0x7ff);
                        var m = (e == 0) ? (bits & 0xfffffffffffff) << 1 : (bits & 0xfffffffffffff) | 0x10000000000000;
                        return formatNumber(s * m * Math.pow(2, e - 1075) + "D");
                    }
/*
                case CONSTANT_Long: {
                        var high_bytes_str = int2hex8chars(cpEntry.high_bytes);
                        var low_bytes_str = int2hex8chars(cpEntry.low_bytes);
                        var hexStr = high_bytes_str + low_bytes_str;
                        return formatNumber(getNumberPrefix(cpEntry) + convertBase(hexStr, 16, 10) + "L");
                    }
*/
                case CONSTANT_Integer:
                    return formatNumber(cpEntry.bytes);
                case CONSTANT_Float: {
                        var bits = cpEntry.bytes;
                        var s = ((bits >> 31) == 0) ? 1 : -1;
                        var e = ((bits >> 23) & 0xff);
                        var m = (e == 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
                        return formatNumber(s * m * Math.pow(2, e - 150) + "F");
                    }

                case CONSTANT_InvokeDynamic: {
					var nameAndTypeInfo = getConstantPoolItem(cpEntry.name_and_type_index);
                    return "bootstrap method: " + cpEntry.bootstrap_method_attr_index + ", " + getFieldOrMethodName(nameAndTypeInfo, false /** todo method\field switch*/);
				}

                case CONSTANT_Class:
                    return getClassName(cpIndex, false, true, false);

                case CONSTANT_String:
                    return "<code title='index in CP = " + cpEntry.string_index + "' style='color:#0000ff'>\"" + getUTF8(cpEntry.string_index) + "\"</code>";

                case CONSTANT_InterfaceMethodref:
                case CONSTANT_Methodref:
                case CONSTANT_Fieldref:
                    var cpEntryClass = getConstantPoolItem(cpEntry.class_index);
                    var cpEntryNameAndType = getConstantPoolItem(cpEntry.name_and_type_index);
                    var result = "";
                    var isThis = cpEntry.class_index == classFile.this_class;
                    if (!isThis) {
                        result += getClassName(cpEntry.class_index, false, false, false) + ".";
                    }

                    result += getFieldOrMethodName(cpEntryNameAndType, cpEntry.tag == CONSTANT_Fieldref);
                    if (cpEntry.tag != CONSTANT_Fieldref) {
                        result +=  "()";
                    }

                    return result;

                }
            }

            function getNumberPrefix(cpEntry) {
                var bits = (cpEntry.high_bytes << 32) + cpEntry.low_bytes;
                return ((bits >> 63) == 0) ? "" : "-";
            }

            function int2hex8chars(srcIntValue) {
                var result = srcIntValue.toString(16);
                while (result.length < 8) {
                    result = "0" + result;
                }
                return result;
            }

            function documentCreateElement(el) {
                return document.createElement(el);
            }

            function documentGetElementById(id) {
                return document.getElementById(id);
            }

            function appendChild(obj, child) {
                obj.appendChild(child);
            }

            function createTable(prnt) {
                var tablearea = documentGetElementById(prnt);
                removeAllChilds(tablearea);

                var table = documentCreateElement('table');
                table.setAttribute("cellSpacing", "0");

                var tbody = documentCreateElement('tbody');
                appendChild(table, tbody);
                appendChild(tablearea, table);
                return tbody;

            }

            function addFirstRow(tbody, type, entityName, anchorName, accessFlags) {

                var tr0 = documentCreateElement('tr');

                var tdLN6 = documentCreateElement('td');
                tdLN6.className = "ln";
                appendChild(tr0, tdLN6);

                var tdf = documentCreateElement('td');
                tdf.colSpan = 5;
                tdf.innerHTML = '&nbsp;';
                appendChild(tr0, tdf);
                appendChild(tbody, tr0);

                var tr = documentCreateElement('tr');
                tr.style.fontWeight = 'bold';

                var tdLN = documentCreateElement('td');
                tdLN.className = "ln";
                appendChild(tr, tdLN);

                var td0 = documentCreateElement('td');
                //td0.innerHTML = "&#9711;";
                //td0.innerHTML = "&#9724;&#9899;&#9670;";

                //if ((accessFlags & array[m][1]) != 0) {}
                if (isMaskSet(accessFlags, ACC_PUBLIC)) {
                    td0.innerHTML = '<svg width="16" height="16"><circle cx="8" cy="8" r="6" stroke="green" stroke-width="1" fill="red" /></svg>';
                } else if (isMaskSet(accessFlags, ACC_PRIVATE)) {
                    td0.innerHTML = '<svg width="16" height="16"><rect x="2" y="2" width="12" height="12" style="fill:red;stroke-width:1;stroke:green" /></svg>';
                } else {
                    td0.innerHTML = '<svg width="16" height="16"><polygon points="2,14 8,3 14,14" fill="rgb(34,104,165)" stroke="purple" stroke-width="1" /></svg>';
                }

                //td0.innerHTML = "&#9724;";
                td0.style.textAlign = 'center';
                td0.style.color = 'blue';
                appendChild(tr, td0);

                var td2 = documentCreateElement('td');
                td2.innerHTML = (anchorName) ? "<a name='" + anchorName + "'>" + entityName + "</a>" : entityName;
                td2.colSpan = 4;
                appendChild(tr, td2);

                appendChild(tbody, tr);
            }

            function addKeyValue(tbody, key, value, keyComment) {
                var tr = documentCreateElement('tr');
                //tr.style.backgroundColor = '#ffdd00';

                var tdLN = documentCreateElement('td');
                //tdLN.innerHTML = "LN2";
                tdLN.className = "ln";
                appendChild(tr, tdLN);

                var td1 = documentCreateElement('td');
                var td1InnerHTML = "<b>";
                if (keyComment) {
                    td1InnerHTML = "<b title ='" + keyComment + "'>";
                }

                td1.innerHTML += td1InnerHTML + key + " :</b>";
                td1.colSpan = 2;
                td1.style.textAlign = 'right';
                td1.style.color = '#0000dd';
                //td1.style.wordWrap = "normal"
                appendChild(tr, td1);

                var td = documentCreateElement('td');
                appendChild(tr, td);

                var td2 = documentCreateElement('td');
                td2.innerHTML = value;
                td2.colSpan = 2;
                //td2.style.backgroundColor = '#ffffff';
                appendChild(tr, td2);

                appendChild(tbody, tr);
            }

            //var cn = documentGetElementById('cn');
            //cn.innerHTML = getArgumentTypeAndValue(classFile.this_class) ;

            var tbody = createTable(container ? container : "list");

            function printAccessFlags(accessFlagsString) {
                if (accessFlagsString != "") {
                    addKeyValue(tbody, "Access flags", accessFlagsString, null);
                }
            }

            var mv = classFile.major_version;
            var jdkv = '';
            if (mv >= 49 && mv <= 55) {
                jdkv = 'Java ' + (mv - 44);
            } else if (mv >= 46 && mv <= 48) {
                jdkv = 'Java 1.' + (mv - 44);
            }

            addFirstRow(tbody, "Class", getArgumentTypeAndValue(classFile.this_class), null, classFile.access_flags);
            //addKeyValue(tbody, "This class",  getArgumentTypeAndValue(classFile.this_class));
            addKeyValue(tbody, "Major version", classFile.major_version + " (" + jdkv + ")", null);
            if (classFile.minor_version != 0) {
                addKeyValue(tbody, "Minor version", classFile.minor_version, null);
            }
            printAccessFlags(getClassAccessModifiers(classFile.access_flags));
            addKeyValue(tbody, "Super class", getArgumentTypeAndValue(classFile.super_class), null);

            if (classFile.interfaces_count > 0) {
                var intf = "";
                for (var i = 0; i < classFile.interfaces_count; i++) {
                    intf += getArgumentTypeAndValue(classFile.interfaces[i]);
                }
                addKeyValue(tbody, "Interfaces", intf, null);
            }

            for (var cai = 0; cai < classFile.attributes_count; cai++) {
                var classAttr = classFile.attributes[cai];
                var classAttributeName = getConstantPoolItem(classAttr.attribute_name_index).bytes;
                var classAttributeValue = "";
                var attributeComment = null;

                if (ATTRIBUTES_SRCF == classAttributeName) {
                    classAttributeValue = getUTF8(classAttr.sourcefile_index);
                } else if (ATTRIBUTES_SIGN == classAttributeName) {
                    classAttributeValue = getUTF8AsSignature(classAttr.signature_index);
                    attributeComment = "JVMS: A Signature attribute records a signature for a class, interface, constructor, method, or field whose declaration in the Java programming language uses type variables or parameterized types.";
                } else if (ATTRIBUTES_ENCL == classAttributeName) {
                    classAttributeValue = getClassName(classAttr.class_index, false, true, false);
                    var mi = classAttr.method_index;
                    if (mi > 0) {
                        classAttributeValue += "." + getFieldOrMethodName(getConstantPoolItem(mi), true);
                    }
                    attributeComment = "JVMS: A class must have an EnclosingMethod attribute if and only if it represents a local class or an anonymous class";
                } else if (ATTRIBUTES_INNR == classAttributeName) {
                    for (var i = 0; i < classAttr.number_of_classes; i++) {
                        classAttributeValue += getClassName(classAttr.classes[i].inner_class_info_index, false, true, false) + "<br/>";
                    }
                    attributeComment = "JVMS: If the constant pool of a class or interface C contains at least one CONSTANT_Class_info entry (§4.4.1) which represents a class or interface that is not a member of a package, then there must be exactly one InnerClasses attribute in the attributes table of the ClassFile structure for C.";
                } else if (ATTRIBUTES_BOOT == classAttributeName) {
                    classAttributeValue = "<ol start='0'>";
                    for (var methodIndex = 0; methodIndex < classAttr.num_bootstrap_methods; methodIndex++) {
						var bootstrapMethod = classAttr.bootstrap_methods[methodIndex];						
						var method = getArgumentTypeAndValue(bootstrapMethod.bootstrap_method_ref);

                    	var methodArguments = "<ol>";
						for (var methodArgumentIndex = 0; methodArgumentIndex < bootstrapMethod.num_bootstrap_arguments; methodArgumentIndex++) {
							methodArguments += "<li>" + getArgumentTypeAndValue(bootstrapMethod.bootstrap_arguments[methodArgumentIndex])+"</li>";
						}
						methodArguments += "</ol>";
						
						classAttributeValue += "<li>" + 
						method +
						",<br/><b>Method arguments:</b> " + 
						methodArguments +
						"</li>";
                    }
                    classAttributeValue += "</ol>";
                    attributeComment = "JVMS: The BootstrapMethods attribute records bootstrap method specifiers referenced by invokedynamic instructions.";
				}
				addKeyValue(tbody, classAttributeName, classAttributeValue, attributeComment);
			}

            for (var f = 0; f < classFile.fields_count; f++) {
                var fol;
                var field_info = classFile.fields[f];
                var anchorName = "f" + f;
                addFirstRow(tbody, "Field", getFieldOrMethodName(field_info, true), anchorName, field_info.access_flags);
                printAccessFlags(getFieldAccessModifiers(field_info.access_flags));
                showField(field_info, tbody);
                if (f == 0) {
                    fol = documentCreateElement('ol');
                    var tempBElement = documentCreateElement('b');
                    tempBElement.innerHTML = "Fields:";
                    if (!isEmbedded) {
                        outline.appendChild(tempBElement);
                        outline.appendChild(fol);
                    }
                }
                addItemToFMList(field_info, anchorName, fol);
            }

            for (var m = 0; m < classFile.methods_count; m++) {
                var mol;
                var method_info = classFile.methods[m];
                var methodName = getFieldOrMethodName(method_info, false);
                var anchorName = "m" + m;
                addFirstRow(tbody, "Method", methodName, anchorName, method_info.access_flags);
                printAccessFlags(getMethodAccessModifiers(method_info.access_flags));
                showMethod(method_info, tbody, m);
                if (m == 0) {
                    mol = documentCreateElement('ol');
                    var tempBElement = documentCreateElement('b');
                    tempBElement.innerHTML = "Methods:";
                    if (!isEmbedded) {
                        outline.appendChild(tempBElement);
                        outline.appendChild(mol);
                    }
                }
                addItemToFMList(method_info, anchorName, mol);
            }
            /*
            for (var cpIterator = 0; cpIterator < classFile.constant_pool_count; cpIterator++) {
            var anchorName = "c" + cpIterator;
            var s = getArgumentTypeAndValue(cpIterator+1);

            var li = documentCreateElement('li');
            clist.appendChild(li);

            var anchorTag = document.createElement('a');
            anchorTag.setAttribute('href', "#" + anchorName);
            anchorTag.innerHTML = s;
            li.appendChild(anchorTag);
            }
             */

            function addItemToFMList(info, anchorName, olElement) {
                var name = getFieldOrMethodPlainName(info);
                var li = documentCreateElement('li');
                olElement.appendChild(li);

                var anchorTag = documentCreateElement('a');
                anchorTag.setAttribute('href', "#" + anchorName);
                anchorTag.innerHTML = name;
                li.appendChild(anchorTag);

            }
            document.title = getClassName(classFile.this_class, true, true, false) + " - Iceberg - Online Java Disassembler";

        }

        function removeAllChilds(elmnt) {
            //if (elmnt.hasChildNodes()) {elmnt.removeChild(elmnt.childNodes[0]);}
            while (elmnt.firstChild) {
                elmnt.removeChild(elmnt.firstChild);
            }
        }

        var outline = document.getElementById('outline');
        if (!isEmbedded) {
            removeAllChilds(outline);
        }

        var classFile = new Object();

        var magic = r4();

        if (magic != 0xCAFEBABE) {
            return;
        }

        classFile.magic = magic;
        classFile.minor_version = r2();
        classFile.major_version = r2();
        classFile.constant_pool_count = r2();
        classFile.constant_pool = new Array(classFile.constant_pool_count - 1);
        read_cp();

        classFile.access_flags = r2();
        classFile.this_class = r2();
        classFile.super_class = r2();
        classFile.interfaces_count = r2();
        classFile.interfaces = new Array(classFile.interfaces_count);
        read_interfaces();

        classFile.fields_count = r2();
        classFile.fields = new Array(classFile.fields_count);
        readFields();

        classFile.methods_count = r2();
        classFile.methods = new Array(classFile.methods_count);
        readMethods();

        classFile.attributes_count = r2();
        classFile.attributes = new Array(classFile.attributes_count);
        for (var a = 0; a < classFile.attributes_count; a++) {
            classFile.attributes[a] = read_attribute();
        }
        //return classFile;
        showClass();
    }
    //---end  read_class


    read_class(dataView, container);
    window.scrollTo(0, 0);
    //showClass();

}
window['main'] = main;

if (window.FileReader) {
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = (evt.type == "drop") ? evt.dataTransfer.files : evt.target.files; ;
        var f = files[0];
        var output = [];
        var reader = new FileReader();

        reader.onload = function (progressEvent) {
            main(new DataView(reader.result), false, null);
        };
        reader.readAsArrayBuffer(f);
    }

    var dropZone = document.getElementById('drop_zone');
    if (dropZone) {
        dropZone.addEventListener('dragover', handleDragOver, false);
        dropZone.addEventListener('drop', handleFileSelect, false);
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }

}