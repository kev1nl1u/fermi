#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(){
	FILE *fp=fopen("Parole.txt", "r");
	if(fp==NULL){ perror("Errore"); exit(1); }
	int i, v[30];
	char word[31]="", ch;
	for(i=0; i<30; i++)
		v[i]=0;
	while(!feof(fp)){
		fscanf(fp, "%s", word);
		v[strlen(word)-1]++;
	}
	// fscanf e' buggato e se l'ultimo char e' \n o space legge due volte la stessa stringa
	fseek(fp, -1, 2);
	ch=fgetc(fp);
	if(ch=='\n') v[strlen(word)-1]--;
	for(i=0; i<30; i++)
		printf("parole da %d lettere: %d\n", i+1, v[i]);
	fclose(fp);
	return 0;
}
