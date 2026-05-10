import java.util.Scanner;
class EsercizioInput{
	public static void main(String[] args){
		int n;
		String str;
		int i;
		Scanner input = new Scanner(System.in);
		for(i=1;i<=3;i++){
			System.out.print("inserisci "+i+" numero: ");
			n=input.nextInt();
		}
		//Scanner stringa = new Scanner(System.in);
		//input.nextLine();// fflush(stdin);
		input = new Scanner(System.in);
		for(i=1;i<=3;i++){
			System.out.print("inserisci "+i+" stringa: ");
			str=input.nextLine();
		}
	}
}
