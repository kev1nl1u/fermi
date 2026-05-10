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
	
	// trova posizione
	i=7;
	while(i>=0 && ((n>>i)&1)==0)
		i--;
	if(i<0) printf("il numero e' 0");
	else printf("%d pos", 7-i+1);
	return 0;
}
