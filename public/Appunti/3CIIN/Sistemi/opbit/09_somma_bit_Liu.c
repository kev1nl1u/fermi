#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
int somma(int *);
int main(){
	srand(time(NULL));
	int a, b, r=0, i, rip=0;
	a=rand()%128;
	b=rand()%127;
	// stampa a
	printf("a: ");
	for(i=7; i>=0; i--)
		printf("%d", (a>>i)&1);
	printf(" (%d)", a);
	putchar('\n');
	// stampa b
	printf("b: ");
	for(i=7; i>=0; i--)
		printf("%d", (b>>i)&1);
	printf(" (%d)", b);
	putchar('\n');
	// somma
	for(i=0; i<8; i++){
		// se il riporto è 1
		if(rip==1){
			r=r+pow(2, i); // aggiungi potenza di 2 (mette 1 nel bit i)
			if(((a>>i)&1)==1 && ((b>>i)&1)==1)
				r=r+pow(2, i); // se entrambi i bit sono 1 li aggiunge potenza di 2 e tiene riporto a 1
			else if(((a>>i)&1)==0 && ((b>>i)&1)==0)
				rip=0; // se entrambi i bit sono 0 mette riporto a 0
		// se il riporto è 0
		}else{
			if(((a>>i)&1)==1 && ((b>>i)&1)==1)
				rip=1; // se entrambi i bit sono 1 mette riporto a 1
			else if(((a>>i)&1)==0 && ((b>>i)&1)==0)
				continue; // se entrambi sono 0 non fa nulla
			else r=r+pow(2, i); // se solo un bit è 1 aggiunge potenza di 2
		}
	}
	// stampa risultato
	putchar('\n');
	printf("risultato in bit: ");
	for(i=7; i>=0; i--)
		printf("%d", (r>>i)&1);
	printf(" (%d)", r);
	putchar('\n');
	return 0;
}
