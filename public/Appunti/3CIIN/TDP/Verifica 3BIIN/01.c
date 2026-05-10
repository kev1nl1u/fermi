#include <stdio.h>
#include <stdlib.h>

int main(){
	FILE *fp=fopen("Caratteri.txt", "r");
	if(fp==NULL){ perror("Errore"); exit(1); }
	char ch;
	int cLine, cChar, c, i, max, min;
	
	cLine=1;
	while((ch=fgetc(fp))!=EOF)
		if(ch=='\n')
			if((ch=fgetc(fp))!=EOF && ch!='\n') // se in quella riga c'e' almeno un carattere
				cLine++;
	printf("righe: %d\n", cLine);
	
	rewind(fp);
	cChar=0;
	while((ch=fgetc(fp))!=EOF)
		if(ch!='\n' && ch!=' ')
			cChar++;
	printf("n caratteri: %d\n", cChar);
	
	rewind(fp);
	c=0;
	while((ch=fgetc(fp))!='\n' && ch!=EOF)
		if(ch!=' ')
			c++;
	max=min=c;
	for(i=1; i<cLine; i++){
		c=0;
		while((ch=fgetc(fp))!='\n' && ch!=EOF)
			if(ch!=' ')
				c++;
		if(c>max)
			max=c;
		if(c<min)
			min=c;
	}
	printf("max riga: %d\nmin riga: %d\n", max, min);
	printf("media riga: %d\n", cChar/cLine);
	fclose(fp);
	return 0;
}
