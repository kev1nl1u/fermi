#include <stdio.h>
int main(){
	int a = 21;
	int b = 54;
	int c = a & b;
	int d = a | b;
	int e = a ^ b;
	int f = ~a;
	int g = a << 3;
	int h = a >> 2;
	printf("a = %d\n", a);
	printf("b = %d\n", b);
	printf("a & b = %d\n", c);
	printf("a | b = %d\n", d);
	printf("a ^ b = %d\n", e);
	printf("~a = %d\n", f);
	printf("a << 3 = %d\n", g);
	printf("a >> 2 = %d\n", h);
}
