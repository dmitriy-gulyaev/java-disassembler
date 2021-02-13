# Online Java disassembler

It writen in JavaScript/HTML/CSS and works in Web browser. Disassembling is performed only by browser's JavaScript, no any server calls are used. It means that during work with disassembler your Java class files are not transferred outside of your computer.

Disassembled files in some ways looks like output of *javap* great tool. In addition disassembler use features of HTML for better perception. Each opcode instruction have tooltip with description of instruction.

https://dmitriy-gulyaev.github.io/java-disassembler/

### Examples

Project contains **Examples** section with examples of disassembled classes. This section demonstrate representation in bytecode of various Java language constructions.

https://dmitriy-gulyaev.github.io/java-disassembler/examples/

### Current limitations (ToDo)

- Support of large `long` numbers.
- Processing of `RuntimeVisibleAnnotations` attribute.
- Parameter types in methods list.