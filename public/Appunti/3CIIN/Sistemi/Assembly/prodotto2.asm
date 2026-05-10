; prodotto di 2 numeri attraverso somma

STARTPGM	= 0xee00    		; L'inizio dell'ipotetica ROM  
RESETVECT	= 0xfffe    		; La posizione del vettore di reset (punt a prima riga da eseguire)
STARTDATI	= 0b10000000		; Inizio area dati (primo indirizzo di RAM disponibile)
								; le pseudo istruzioni sul come tradurre sono precedute dal simbolo punto
								
								
		.area	DATI (ABS)		; tutti i .area DATI verranno messi insieme 
		.org	STARTDATI		; indirizzo da cui parte l'area di definizione DATI
;
num1:		.blkb 	1				;  
num2:		.blkb 	1				;
ris:		.blkb	1 
;
		.area   PROGRAMMA (ABS)
		.org    STARTPGM		;inizio area PROGRAMMA (il nome PROGRAMMA è scelto liberamente)
;
MAIN:	MOV #3, num1
		MOV #5, num2
		MOV #0, ris
START:
		LDA num2
		CMP #0
		BLE FINE
		; else
		LDA ris
		ADD num1
		STA ris
		LDA num2
		SUB #1
		STA num2
		BRA START
		

;
FINE:	BRA FINE				; Loop infinito per fermare il programma
;
	.area   RESET (ABS)
	.org    RESETVECT			;inizio area RESET (il nome RESET è scelto liberamente)
	.word   MAIN				; alloca 2 byte con valore MAIN (locazione iniziale del prg)
