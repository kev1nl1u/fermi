#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#define DIM 8
void parita(int[], int []);
void visualizza(int);
void visualizza8(int []);
void visualizza9(int []);
int mask();
void errore(int [], int);
int check(int []);

int main(){
	srand(time(NULL));
	int n[8], n_con_p1[9], m, n_err[9], p2, i;
	for(i=0; i<8; i++)
		n[i]=rand()%128;
	printf("bit generati: \n");
	visualizza8(n);
	parita(n_con_p1, n);
	printf("byte con parita: \n");
	visualizza9(n_con_p1);
	m=mask();
	printf("mask: ");
	visualizza(m);
	for(i=0; i<9; i++)
		n_err[i]=n_con_p1[i];
	errore(n_err, m);
	printf("\nXOR con mask: \n");
	visualizza9(n_err);
	check(n_err);
	return 0;
}

void visualizza(int n){
	int i;
	for(i=7; i>=0; i--)
		printf("%d", (n>>i)&1);
	putchar('\n');
}

void visualizza8(int n[]){
	int i, j;
	for(i=0; i<8; i++){
		for(j=7; j>=0; j--)
			printf("%d", (n[i]>>j)&1);
		putchar('\n');
	}
	putchar('\n');
}

void visualizza9(int n[]){
	int i, j;
	for(i=0; i<9; i++){
		for(j=7; j>=0; j--)
			printf("%d", (n[i]>>j)&1);
		putchar('\n');
	}
	putchar('\n');
}

void parita(int n_p1[], int n[]){
	int i, j, c=0, k;
	for(i=0; i<8; i++)
		n_p1[i]=n[i];
	
	for(i=0; i<8; i++){
		c=0;
		for(j=7; j>=0; j--)
			if(((n_p1[i]>>j)&1)==1) c++;
		if(c%2==1) n_p1[i]=n_p1[i]+128;
	}
	k=0;
	n_p1[8]=0;
	for(i=0; i<7; i++){
		c=0;
		for(j=0; j<8; j++)
			if(((n_p1[j]>>i)&1)==1) c++;
		if(c%2==1)
			n_p1[8]=n_p1[8]+pow(2, k);
		k++;
	}
}

int mask(){
	return pow(2, rand()%9);
}

// errore nella parità tolta
void errore(int n[], int m){
	int i=rand()%9;
	n[i]=n[i]^m;
	printf("errore nel numero %d\n", i+1);
}

int check(int n[]){
	int i, j, c=0, p, err_i[2], flag[2]={0, 0};
	for(i=0; i<8; i++){
		c=0;
		for(j=0; j<7; j++)
			if(((n[i]>>j)&1)==1){
				c++;
				//printf("\n\tc: %d\n", c);
			}
		p=n[i]>>7&1;
		//printf("\n\ti=%d\tp=%d\tc mod 2=%d\n", i, p, c%2);
		if(p!=c%2){
			err_i[0]=i;
			flag[0]=1;
		}
	}
	
	for(i=0; i<7; i++){
		c=0;
		for(j=0; j<8; j++)
			if(((n[j]>>i)&1)==1) c++;
		p=n[8]>>i&1;
		if(p!=c%2){
			err_i[1]=i;
			flag[1]=1;
		}
	}
	//printf("flag[0]=%d\nflag1[1]=%d\n", flag[0], flag[1]);
	if(flag[0]==0 && flag[1]==0) {
		printf("no errore");
		return;
	}else
	if(flag[0]!=flag[1]) printf("\nERRORE nella parita, non e' possibile correggere\n");
	else printf("\ntrovato errore nel %d numero\nbit %d\n", err_i[0]+1, err_i[1]);
	
	// correggi DA FINIRE
	/*
	if((n[err_i[0]]>>err_i[1]&1)==0){
		n[err_i[0]]=n[err_i[0]]+pow(2, (8-err_i[1]));
	}else{
		n[err_i[0]]=n[err_i[0]]-pow(2, (8-err_i[1]));
	}
	*/
	
	printf("\ncorretto: \n");
	visualizza9(n);
}
