
STARTPGM  = 0xee00    ; L'inizio dell'ipotetica ROM
RESETVECT = 0xfffe    ; La posizione del vettore di reset
STARTDATI = 0x80    ; Inizio area dati


PTA             =       0x0000  ;DDRA [determinerà quali bit di porta A sono in input (0) e quali in output (1)]
PTB             =       0x0001	;DDRB [determinerà quali bit di porta B sono in input (0) e quali in output (1)]
DDRA            =       0x0004  
DDRB            =       0X0005
PTAPUE          =       0X000B
PTBPUE          =       0X000C
CONFIG2         =       0x001e
CONFIG1         =       0x001f
;

    .area DATI (ABS)
    .org  STARTDATI

; Mettere qui le variabili

    .area   PROGRAMMA (ABS)
    .org    STARTPGM


MAIN:
; ***********************
; Setup processore e porte di I/O
; ***********************
        MOV     #0x31,*CONFIG1  ; LVIRSTD, VIPWRD, COPD
        CLR     *CONFIG2        ; Tutti i flag spenti
        
        MOV     #0x10,*PTA      ; PTA (la porta A ha un solo led, quello giallo, in bit posizione 4 e quindi lo imposto a 1 --> 0010000)
        MOV     #0x10,*DDRA     ; PTA4 impostata in output (ora si accende il LED Giallo) 
        MOV     #0x00,*PTAPUE   ; Disattiva tutte le resistenze di pull-up sugli ingressi
        
        MOV     #0x4f,*PTB      ; PTB (la porta B ha 5 led, 4 rossi in pos 0 1 2 3 e uno verde in posizione 6, che imposto a 1 --> 01001111)
        MOV     #0x4f,*DDRB     ; PTB6 e PTB0-3 in output (ora si accendono i led rossi e il led verde)      
        MOV     #0x80,*PTBPUE   ; Attiva le resistenze di pull-up sul tasto

END:    BRA     END
;
  .area   RESET (ABS)
  .org    RESETVECT
  .word   MAIN
