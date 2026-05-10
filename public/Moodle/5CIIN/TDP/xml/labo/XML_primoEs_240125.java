package xml_primoes_240125;

import java.io.*;
import java.util.Scanner;
import javax.xml.parsers.*;
import org.w3c.dom.*;

import org.xml.sax.*;

public class XML_primoEs_240125 {
    public static void main(String[] args) throws ParserConfigurationException, IOException, SAXException {
        Scanner scanner = new Scanner(System.in);
        
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        factory.setIgnoringComments(false);
        DocumentBuilder parser = factory.newDocumentBuilder();
        
        
        File file = new File("C:\\Users\\5ciin-21\\Desktop\\terzo.xml");
        
        Document doc = parser.parse(file);
        
        Element ERoot = doc.getDocumentElement();
        System.out.println("nome root: "+ERoot.getNodeName()+"\n");
        
        
        NodeList NList = ERoot.getChildNodes();
        int ctr=0;
        
        
        System.out.println("figli della root:");
        for(int i=0;i<NList.getLength();i++){
            if(NList.item(i).getNodeType()==Node.ELEMENT_NODE){
                System.out.println(NList.item(i).getNodeName());
                ctr++;
            }
        }
        System.out.println("\nn. figli root: " + ctr+"\n");
        
        //---------------------------
        System.out.println("inserisci nome elemento: ");
        String input=scanner.nextLine();
        
        NList=ERoot.getElementsByTagName(input);
        
        System.out.println("contenuto:"+NList.item(0).getTextContent());
        
        //--------------------------
        System.out.println("\ninserisci nome elemento: ");
        input=scanner.nextLine();
        
        NList=ERoot.getElementsByTagName(input);
        
        NamedNodeMap attributi = NList.item(0).getAttributes();
        
        
        System.out.println("attributi dell'elemento selezionato:");
        for(int i=0;i<attributi.getLength();i++)
            System.out.println(attributi.item(i));
        
        System.out.println("\ncontenuto dell'elemento selezionato:\n"+NList.item(0).getTextContent());
        
        //--------------------
        
        
        
        System.out.println("\ninserisci nome elemento: ");
        input=scanner.nextLine();
        System.out.println("\ninserisci nuovo contenuto: ");
        String content=scanner.nextLine();
        
        NList=ERoot.getElementsByTagName(input);
        
        
        NList.item(0).setTextContent(content);
        
        System.out.println("\nnuovo contenuto:"+NList.item(0).getTextContent());
        
        //--------------
        System.out.println("\nricerca ricorsiva: ");
        input=scanner.nextLine();
        
        find(ERoot,input);
        
        //---------------
        
        
        NList = doc.getChildNodes();
        System.out.println("commenti root:");
        for(int i=0;i<NList.getLength();i++){
            if(NList.item(i).getNodeType()==Node.COMMENT_NODE){
                System.out.println(NList.item(i).getTextContent());
            }
        }
        
        System.out.println("\ncommenti:");
        findComment(ERoot);
        
    }
    
    static boolean find(Node root,String nome){
        if(root.getNodeName().equals(nome)){
            System.out.println("\ncontenuto trovato:"+root.getTextContent());
        }else{
            NodeList NList = root.getChildNodes();
            for(int i=0;i<NList.getLength();i++){
                if(NList.item(i).getNodeType()==Node.ELEMENT_NODE){
                    find(NList.item(i),nome);
                }
            }
        }
        return true;
    }
    
    static boolean findComment(Node root){
            NodeList NList = root.getChildNodes();
            for(int i=0;i<NList.getLength();i++){
                if(NList.item(i).getNodeType()==Node.COMMENT_NODE){
                    System.out.println(NList.item(i).getTextContent());
                }else if(NList.item(i).getNodeType()==Node.ELEMENT_NODE){
                    findComment(NList.item(i));
                }
            }
        return true;
    }
    
}

