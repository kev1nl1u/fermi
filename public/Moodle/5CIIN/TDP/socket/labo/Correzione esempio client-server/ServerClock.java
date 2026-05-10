
package pkg4.serverclock;
import java.net.*;
import java.util.*;
import java.io.*;

public class ServerClock {
    
    
    public static void main(String[] args) throws Exception{
       int porta = 3333;
       ServerSocket server;
       Socket s_client;
       
       //Scanner s = new Scanner(System.in);
       int conta_richieste=0;
       OutputStream outS;
       PrintWriter pr;
       
       
       try{
            server = new ServerSocket(porta);
            System.out.println("Server attivo. Ascolto sulla porta "+porta);
           
          
            System.out.println("In attesa di connessione...");
            s_client = server.accept();
            server.close();
            conta_richieste++;
            System.out.println("Connesso con un client. Richiesta numero: "+conta_richieste);

            outS = s_client.getOutputStream();
            pr = new PrintWriter(outS, true);

            Date oggi = new Date();
            String data_oggi = oggi.toString();
            pr.println("Data di oggi: "+data_oggi);
            
            pr.close();
            s_client.close();
           
           
       }catch(IOException e){System.out.println("ERRORE");}
  
    }
    
}
