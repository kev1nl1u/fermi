; max 2 numeri

STARTPGM	= 0xee00    		; L'inizio dell'ipotetica ROM  
RESETVECT	= 0xfffe    		; La posizione del vettore di reset (punt a prima riga da eseguire)
STARTDATI	= 0b10000000		; Inizio area dati (primo indirizzo di RAM disponibile)
								; le pseudo istruzioni sul come tradurre sono precedute dal simbolo punto
								
								
		.area	DATI (ABS)		; tutti i .area DATI verranno messi insieme 
		.org	STARTDATI		; indirizzo da cui parte l'area di definizione DATI
;
num1:		.blkb 	1
num2:		.blkb 	1
max:		.blkb	1
;
		.area   PROGRAMMA (ABS)
		.org    STARTPGM		;inizio area PROGRAMMA (il nome PROGRAMMA è scelto liberamente)
;
MAIN:	MOV #1,  num1
		MOV #10, num2
		LDA num1				;LOAD carica nel registro A la variabile num1
		CMP num2
		BGT SE1 ; se num1 > num2
		; else
		LDA num2
		STA max
		BRA FINE

SE1:
		STA max
		BRA FINE
		

;
FINE:	BRA FINE				; Loop infinito per fermare il programma
;
	.area   RESET (ABS)
	.org    RESETVECT			;inizio area RESET (il nome RESET è scelto liberamente)
	.word   MAIN				; alloca 2 byte con valore MAIN (locazione iniziale del prg)
