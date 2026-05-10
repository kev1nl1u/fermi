#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main(){
	srand(time(NULL));
	int n, i;
	n=rand()%256;
	// stampa bit
	for(i=7; i>=0; i--)
		printf("%d", (n>>i)&1);
	putchar('\n');
	
	// azzera posizioni
	if(((n>>3)&1)==1)
		n=n-8;
	if(((n>>5)&1)==1)
		n=n-32;
		
	// visualizza
	printf("\nterzo e quinto bit azzerato: \n");
	for(i=7; i>=0; i--)
		printf("%d", (n>>i)&1);
	putchar('\n');
	return 0;
}
