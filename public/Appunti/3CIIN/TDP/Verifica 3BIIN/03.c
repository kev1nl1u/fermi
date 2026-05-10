#include <stdio.h>
#include <stdlib.h>
typedef struct{
	int ora;
	int minuti;
	char cod[5];
} passaggio;

int main(){
	FILE *fpr=fopen("Presenze.txt", "r");
	FILE *fpw=fopen("Presenze.dat", "rb+");
	if(fpw==NULL || fpr==NULL){ perror("Errore"); exit(1); }
	int i, cLine;
	char ch;
	// conta righe
	cLine=1;
	while((ch=fgetc(fpr))!=EOF)
		if(ch=='\n')
			if((ch=fgetc(fpr))!=EOF && ch!='\n')
				cLine++;
	passaggio a[cLine];
	
	rewind(fpr);
	for(i=0; i<cLine; i++)
		fscanf(fpr, "%d %d %s", &a[i].ora, &a[i].minuti, a[i].cod);
		
	fseek(fpw, 0, 0);
	for(i=0; i<cLine; i++)
		fwrite(&a[i], sizeof(passaggio), 1, fpw);  // stampa su Presenze.dat
	
	int ora;
	rewind(fpw);
	printf("ora: ");
	scanf("%d", &ora);
	fflush(stdin);
	
	fclose(fpr);
	return 0;
}
