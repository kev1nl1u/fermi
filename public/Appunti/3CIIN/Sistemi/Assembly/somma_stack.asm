@256
D=A
@SP
M=D

// carica 8
@8
D=A
@SP
A=M
M=D

// SP+1
@SP
M=M+1

// carica 7
@7
D=A
@SP
A=M
M=D

// sum
@SP
A=M
D=M
@SP
M=M-1
A=M
M=M+D