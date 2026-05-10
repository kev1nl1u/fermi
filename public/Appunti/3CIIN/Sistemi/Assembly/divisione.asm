; divisione

STARTPGM	= 0xee00    		; L'inizio dell'ipotetica ROM  
RESETVECT	= 0xfffe    		; La posizione del vettore di reset (punt a prima riga da eseguire)
STARTDATI	= 0b10000000		; Inizio area dati (primo indirizzo di RAM disponibile)
								; le pseudo istruzioni sul come tradurre sono precedute dal simbolo punto
								
								
		.area	DATI (ABS)		; tutti i .area DATI verranno messi insieme 
		.org	STARTDATI		; indirizzo da cui parte l'area di definizione DATI
;
dividendo:		.blkb 	1
divisore:		.blkb 	1
ris:			.blkb	1
;
		.area   PROGRAMMA (ABS)
		.org    STARTPGM		;inizio area PROGRAMMA (il nome PROGRAMMA è scelto liberamente)
;
MAIN:	MOV #10, divisore		; variabili
		MOV #3, dividendo
		MOV #0, ris
LOOP:
		LDA divisore				; carica divisore nel registro A
		CMP dividendo
		BLT FINE ; se divisore < dividendo termina
		; else
		SUB dividendo				; sottrae dividendo al divisore
		STA divisore				; salva dividendo sottratto
		LDA ris						; risultato in A
		ADD #1						; ris=ris+1
		STA ris						; salva risultato
		LDA divisore
		CMP dividendo
		BRA LOOP					; salta al LOOP
		

;
FINE:	BRA FINE				; Loop infinito per fermare il programma
;
	.area   RESET (ABS)
	.org    RESETVECT			;inizio area RESET (il nome RESET è scelto liberamente)
	.word   MAIN				; alloca 2 byte con valore MAIN (locazione iniziale del prg)



