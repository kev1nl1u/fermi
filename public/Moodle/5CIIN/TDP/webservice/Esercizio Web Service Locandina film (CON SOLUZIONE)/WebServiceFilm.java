

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.URLConnection;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.Scanner;
import javax.imageio.ImageIO;
import javax.net.ssl.HttpsURLConnection;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class WebServiceFilm {

    
    public static void main(String[] args) {
       
        
        try {
            Scanner s = new Scanner(System.in);
            //scrivo l'URL base, ovvero l'indirizzo della pagina web che offre il web service
            String baseUrl = "https://www.omdbapi.com/?";
            //scrivo gli elementi fondamentali per la mia query: la chiave e il titolo
            String apiKey = "b01f37b2";
            System.out.println("Inserire nome film o serie TV");
            String movieTitle = s.nextLine();
            //fisso il formato della query: chiedo un file xml, con una determinata apikey, con una richiesta di un titolo
            //l'ordine dei campi, ovvero nome=valore della query, non è importante. Ogni campo viene suddiviso con una &
            String query = String.format("r=xml&apikey=%s&t=%s", 
                    URLEncoder.encode(apiKey, "UTF-8"),
                    URLEncoder.encode(movieTitle, "UTF-8"));
            
            //classe URL: gestisco il mio URL con la query incorporata
            URL url = new URL(baseUrl + query);
            System.out.println("URL: "+baseUrl+query);
            
            //apro la connessione con quel URL attraverso il metodo openConnection che mi ritorna una URLConnection (classe astratta)
            //Posso fare un cast per derivare la classe HttpURLConnection o HttpsURLConnection per avere
            //più metodi per gestire quel particolare protocollo applicativo
            URLConnection connection = (HttpURLConnection) url.openConnection();
            //questo metodo è già impostato in true, ma sempre meglio esplicitarlo
            //la connessione da il via libera per ricevere dati
            connection.setDoInput(true);
            //dopo aver provato a ricevere dati (ovvero file xml) attraverso InputStream, gestisco ciò che ricevo
            try (InputStream inputStream = connection.getInputStream()) {
                DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
                Document doc = dBuilder.parse(inputStream);
                
                //cerco l'elemento con il titolo che gli ho specificato (se ce ne sono 2 prendo il primo) e cerco
                //l'elemento poster. Esso è un'immagine con un suo URL. Quindi per riceverla bisognerà ripetere
                //il procedimento fatto per il file xml
                NodeList nodeList = doc.getElementsByTagName("movie");
                if (nodeList.getLength() > 0) {
                    Element element = (Element) nodeList.item(0);
                    String title = element.getAttribute("title");
                    String posterUrl = element.getAttribute("poster");
                    if (!posterUrl.equals("N/A")) {
                        System.out.println("Poster URL: " + posterUrl);
                        URL urlImage = new URL(posterUrl);                        
                        BufferedImage image;
                        // Leggo l'immagine presente nell'inputStream, chiudo l'inputStream e salvo l'immagine
                        try ( 
                        //operStream è un metodo di URL che apre direttamente la connessione per ricevere il body HTTP
                        //In questo modo non potremo controllare al meglio la connessione con HTTP ma se non è necessario
                        //è una via utile più rapida
                                InputStream is = urlImage.openStream()) {
                            // Leggo l'immagine presente nell'inputStream, chiudo l'inputStream e salvo l'immagine
                            image = ImageIO.read(is);
                        }
                        // Carica l'immagine
                        File imageFile = new File("C:\\Users\\utente\\Desktop\\Download Poster Film\\"+title+".jpg");
                        ImageIO.write(image, "jpg", imageFile);
                        
                    } else {
                        System.out.println("Nessun poster disponibile");
                    }
                } else {
                    System.out.println("Nessun film trovato");
                }
            }
        } catch (Exception e) {
            System.out.println("errore");
        }
        
        
    }
    
}





 
 






