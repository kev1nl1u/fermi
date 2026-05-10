// Sirico Davide
package es1_sirico;


class Main {
    public static void main(String[] args) {
        RunnableClass[] runnableClass = new RunnableClass[10];
        Thread[] t = new Thread[10];
        int [][] matrix;
        matrix = new int[10][10];
        // semaforo che gestisce l'accesso alla matrice
        Semaphore s = new Semaphore(1);
        
        // memorizzo il numero di millisecondi all'inizio del programma
        long startTime = System.currentTimeMillis();
        for(int i = 0; i < 10; i++) {
            runnableClass[i] = new RunnableClass(i+1,matrix,s);
            t[i] = new Thread(runnableClass[i]);
            t[i].start();
        }
        
        try{
            for(int i = 0; i < 10; i++) {
                t[i].join();
            }
        } catch (InterruptedException ex) {
            System.out.println("Errore");
        }
        // memorizzo il numero di millisecondi alla fine dell'esecuzione
        long endTime = System.currentTimeMillis();
        
        // visualizzo la matrice
        for(int i = 0; i < 10; i++) {
            for(int j = 0; j < 10; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println("");
        }
        System.out.println("Tempo impegato: "+(endTime-startTime));
        
        
        // algoritmo non concorrente
        int[][] matrix2 = new int[10][10];
        
        startTime = System.currentTimeMillis();
        for(int i = 0; i < 10; i++) {
            for(int j = 0; j < 10; j++) {
                matrix2[i][j] = (j+1)*(i+1);
            }
        }
        
        endTime = System.currentTimeMillis();
        
        // visualizzo la matrice
        for(int i = 0; i < 10; i++) {
            for(int j = 0; j < 10; j++) {
                System.out.print(matrix2[i][j] + " ");
            }
            System.out.println("");
        }
        System.out.println("Tempo impegato: "+(endTime-startTime));
        
        
    }
    
}
