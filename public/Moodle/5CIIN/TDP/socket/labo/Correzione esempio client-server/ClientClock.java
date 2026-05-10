/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package pkg3.clientclock;
import java.net.*;
import java.util.*;
import java.io.*;


public class ClientClock {

    
    
    public static void main(String[] args) throws IOException{
        
       Socket client;
       
       int porta = 3333;
       Scanner s = new Scanner(System.in);
       
       InputStream in;
       InputStreamReader indata;
       BufferedReader bin;
       
       try{ 
          
           System.out.println("Sto cercando di connettermi...");
           client = new Socket(InetAddress.getLocalHost(), porta);
           System.out.println("Connesso alla porta numero: "+porta);
           
           in = client.getInputStream();
           indata = new InputStreamReader(in);
           bin = new BufferedReader(indata);
           
           
           String clock = bin.readLine();
           
           
           System.out.println(clock);
           System.out.println("Sto chiudendo la connessione... ");
           bin.close();
           client.close();
           
           
           System.out.println("Connessione chiusa");
       }catch(IOException e){System.out.println(e);}
    }
    
}
