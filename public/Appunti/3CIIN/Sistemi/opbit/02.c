#include <stdio.h>
#include <math.h>

int main(){
	int a, c, i;
	printf("a: ");
	scanf("%d",&a);
	fflush(stdin);
	
	printf("byte: ");
	for(i=7; i>=0; i--)
		printf("%d", (a>>i)&1);
	return 0;
}
