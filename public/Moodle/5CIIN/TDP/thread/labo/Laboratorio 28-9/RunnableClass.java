package es1_sirico;

public class RunnableClass implements Runnable {
    // numero di cui fare la tabellina 
    private int number;
    // matrice con tutte le tabelline 
    private int [][]matrix;
    // semaforo per l'accesso alla matrice
    private Semaphore s;

    public RunnableClass(int number, int [][]matrix, Semaphore s) {
        this.number = number;
        this.matrix = matrix;
        this.s = s;
    }
    
    @Override
    public void run() {
        // prendo l'accesso alla matrice
        s.acquire();
        for(int i = 0; i < 10; i++) {
            matrix[number-1][i] = (i+1)*number;
        }
        // rilascio l'accesso alla matrice
        s.release();
    }
    
}
