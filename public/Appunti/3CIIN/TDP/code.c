// LIBRERIE
#include <stdio.h> // libreria standard di input/output
#include <stdlib.h> // libreria usata per restituire l’errore se il file non viene creato
#include <string.h> // libreria per l’utilizzo delle stringhe
#include <math.h> // libreria utilizzata per i calcoli matematici per le coordinate

// PROTOTIPI
// scrive nel file HTML i contenuti dell’head, tra cui il titolo
void head(FILE *, char []);
// scrive nel file HTML i contenuti del body, quindi le due immagini vettoriali
void body(FILE *);
// esegue i calcoli necessari per le coordinate del poligono
void generatePoly(int, char [], char [], char []);
// esegue i calcoli necessari per le coordinate della stella e lo scrive nel file HTML.
void generate_print_Star(FILE *, int, char [], char [], char []);

// main
int main(){
	FILE *fp;
	char titolo[80];

	// crea file index.html in modalita' scrittura
	fp=fopen("index.html","w");

	// controlla che il file sia stato creato
	if(fp==NULL){
		perror("Errore");
		exit(1);
	}
	
	// apri file html
	fprintf(fp, "<!DOCTYPE html>\n<html>\n");
	
	// input titolo
	printf("Titolo: ");
	gets(titolo);
	fflush(stdin);
	
	// scrivi contenuto di head nel file
	head(fp, titolo);
	
	// scrivi il contenuto del body nel file
	body(fp);
	
	// chiudi file html
	fprintf(fp, "</html>");
	
	printf("Creazione del SVG avvenuta con successo!");	
	return 0;
}

// FUNZIONI
void head(FILE *fp, char title[]){
	// apri <head> e <title>
	fprintf(fp, "<head>\n\t<title>");
	// scrivi il titolo
	fputs(title, fp);
	// chiudi </title> e </head>
	fprintf(fp, "</title>\n</head>\n");
}

void body(FILE *fp){
	// apri <body>
	fprintf(fp, "<body>\n");

	// variabili coordinate, indirizzi pari e dispari per stella
	char coords[100]="", pari[100]="", dispari[100]="", colore[80];
	// variabile numero lati
	int n;
	
	// input numero lati
	do{
		printf("Inserisci i lati: ");
		scanf("%d",&n);
		fflush(stdin);
	}while(n<0 || n>15);
	
	// chiamata alla funzione per calcolare coordinate poligono
	generatePoly(n, coords, pari, dispari);
	
	// stampa poligono svg
	fprintf(fp, "\t<svg height=\"500\" width=\"500\">\n");
	fprintf(fp, "\t\t<polygon points=\"");
	fputs(coords, fp);
	fprintf(fp, "\"");

	// stampa animazione
	fprintf(fp, "/>\n\t\t<animateTransform attributeName=\"transform\" type=\"rotate\" from=\"0\" to=\"360\" dur=\"10s\" repeatCount=\"indefinite\"/>\n\t</svg>\n");
	
	// input colore stella
	printf("Colore stella: ");
	gets(colore);
	fflush(stdin);
	
	// calcola e stampa stella svg
	generate_print_Star(fp, n, pari, dispari, colore);
	
	// chiudi </body>
	fprintf(fp, "</body>\n");
}

void generatePoly(int n, char coords[], char pari[], char dispari[]){
	int r=250, size=200; // raggio e dimensione
	int i;
	long int temp; // variabile int temporanea per i risultati
	char c_temp[80]; // stringa temporanea per i risultati
	for(i=0;i<n;i++){
		// calcola le coordinate x
		temp=r+size*sin((2*M_PI*i)/n);
		// trasforma il valore da int a char
		itoa(temp, c_temp, 10);
		// concatena la coordinata alla stringa che verrà stampata su file
		strcat(coords, c_temp);
		strcat(coords, ",");

		// divide le coordinate di “indice pari” e “dispari”, utili per formare la stella
		if(i%2==1){
			strcat(dispari, c_temp);
			strcat(dispari, ",");
		}else{
			strcat(pari, c_temp);
			strcat(pari, ",");
		}

		// ripete le stesse operazioni per la y
		temp=r+size*cos((2*M_PI*i)/n);
		itoa(temp, c_temp, 10);
		strcat(coords, c_temp);
		strcat(coords, ",");
		
		if(i%2==1){
			strcat(dispari, c_temp);
			strcat(dispari, " ");
		}else{
			strcat(pari, c_temp);
			strcat(pari, " ");
		}
	}	
}

void generate_print_Star(FILE *fp, int n, char pari[], char dispari[], char colore[]){
	// richiede 5 lati per formare una stella
	if(n<5){
		printf("--> Stella non creata! Servono almeno 5 lati per formare una stella!\n");
		return;
	}

	// apri tag <svg>
	fprintf(fp, "\t<svg height=\"500\" width=\"500\">\n");
	
	// metodo per i lati dispari
	if(n%2==1){
		// stampa coordinate di indice dispari dopo quelli pari
		fprintf(fp, "\t\t<polygon points=\"");
		fputs(pari, fp);
		fputs(dispari, fp);
		// stampa il colore scelto dall’utente
		fprintf(fp, "\" fill=\"");
		fputs(colore, fp);
		fprintf(fp,"\">");
		
	// metodo per i lati pari
	}else{
		// stampa 2 poligoni sovrapposti
		fprintf(fp, "\t\t<polygon points=\"");
		fputs(pari, fp);
		// stampa il colore scelto dall’utente
		fprintf(fp, "\" fill=\"");
		fputs(colore, fp);
		fprintf(fp, "\">");
		fprintf(fp, "</polygon>\n");
		// ripete creando un altro poligono sovrapposto con coordinate di indice dispari
		fprintf(fp, "\t\t<polygon points=\"");
		fputs(dispari, fp);
		fprintf(fp, "\" fill=\"");
		fputs(colore, fp);
		fprintf(fp, "\">");
	}
	// chiude il tag </polygon>
	fprintf(fp, "</polygon>\n\t");
	// aggiunge animazione
	fprintf(fp, "<animateTransform attributeName=\"transform\" type=\"rotate\" from=\"360\" to=\"0\" dur=\"10s\" repeatCount=\"indefinite\"></animateTransform>\n");
	// chiude tag </svg>
	fprintf(fp, "\t\n</svg>\n");
}
