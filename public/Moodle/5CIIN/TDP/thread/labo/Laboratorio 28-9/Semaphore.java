package es1_sirico;


public class Semaphore {
    private int counter;
    
    public Semaphore(int counter) {
        this.counter = counter;
    }
    public synchronized void acquire() {
        if(counter == 0) {
            try {
                wait();
            } catch (InterruptedException ex) {
                System.out.println("Errore");
            }
        }
        counter--;
    }
    public synchronized void release() {
        counter++;
        if(counter > 0) {
            notify();
        }
    }
}
