#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#define DIM 8
int parita(int);
void visualizza(int);
int mask();
int errore(int, int);
int check(int);

int main(){
	srand(time(NULL));
	int n, n_con_p1, m, n_err, p2;
	do{
		printf("numero: ");
		scanf("%d",&n);
		fflush(stdin);
	}while(n<0 || n>255);
	printf("byte: ");
	visualizza(n);
	n_con_p1=parita(n);
	printf("byte con parita: ");
	visualizza(n_con_p1);
	m=mask();
	printf("mask: ");
	visualizza(m);
	n_err=errore(n_con_p1, m);
	printf("XOR con mask: ");
	visualizza(n_err);
	if(check(n_err)==1)
		printf("\nnumero corrotto");
	else
		printf("\nnumero integro");
	return 0;
}

void visualizza(int n){
	int i;
	for(i=7; i>=0; i--)
		printf("%d", (n>>i)&1);
	putchar('\n');
}

int parita(int n){
	int i, c=0;
	for(i=7; i>=0; i--)
		if(((n>>i)&1)==1) c++;
	
	if(c%2==1)
		n=n+128;
	return n;
}

int mask(){
	return pow(2, rand()%9);
}

int errore(int n, int m){
	return n^m;
}

int check(int n){
	int i, c=0, p;
	for(i=0; i<7; i++)
		if(((n>>i)&1)==1) c++;
	p=n>>7&1;
	if(p==c%2) return 0;
	else return 1;	
}
