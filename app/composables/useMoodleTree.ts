import type { TreeNode, YearMeta } from '~/types/moodle'

const years: Record<string, YearMeta> = {
  '4CIIN': {
    label: 'Quarto Anno',
    period: '2022 / 2023',
    zip: '/Moodle/4CIIN_MOODLE.zip',
    intro: 'Materiali Moodle del quarto anno: Informatica (Java), Sistemi e Reti, TDP.',
    tree: [
      {
        type: 'folder', name: 'Info', children: [
          {
            type: 'folder', name: 'mc_JAVA', children: [
              { type: 'file', name: '00_PASSWORD.txt', ext: 'txt' },
              { type: 'file', name: '230417_B-tree.pdf', ext: 'pdf' },
              { type: 'file', name: '4CIIN_es.txt', ext: 'txt' },
              { type: 'file', name: 'B-tree-Delete.png', ext: 'png' },
              { type: 'file', name: 'B-tree.png', ext: 'png' },
              { type: 'file', name: 'EsercizioInput.java', ext: 'java' },
              { type: 'file', name: 'FI.jpg', ext: 'jpg' },
              { type: 'file', name: 'JavaRules.txt', ext: 'txt' },
              { type: 'file', name: 'mcJava00_TEORIA.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava01_PRG.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava02_ARRAY.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava03_STRING.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava04_CLASS.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava05_COSTRUTTORE.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava06_METODI.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava07_ARRAYOGGETTI.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava08_PACKAGES.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava09_EREDITA.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava10_POLIMORFISMO.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava11_ABSTRACT_INTERFACE.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava12_EREDITA_multipla.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava13_LetturaFileNumeri.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava14_ADT.pdf', ext: 'pdf' },
              { type: 'file', name: 'mcJava15_B-tree.pdf', ext: 'pdf' },
              { type: 'file', name: 'NetBeans_SetUp-6-20.pdf', ext: 'pdf' },
              { type: 'file', name: 'numeri.txt', ext: 'txt' },
              { type: 'file', name: 'Person.png', ext: 'png' },
              { type: 'file', name: 'Queue (Java Platform SE 8).pdf', ext: 'pdf' },
              { type: 'file', name: 'Stack (Java Platform SE 8).pdf', ext: 'pdf' },
              { type: 'file', name: 'UML_Conto.png', ext: 'png' },
            ],
          },
          { type: 'file', name: 'PPT_JavaScript.pdf', ext: 'pdf' },
        ],
      },
      {
        type: 'folder', name: 'Sistemi', children: [
          {
            type: 'folder', name: 'arduino', children: [
              { type: 'file', name: 'Laboratorio Arduino.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'assembly', children: [
              { type: 'file', name: 'ASSEMBLY.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'livello 2 LAN', children: [
              { type: 'file', name: '02 - Lv 2 e reti LAN - Simulazione.pdf', ext: 'pdf' },
              { type: 'file', name: '7 - Enti normatori.pdf', ext: 'pdf' },
              { type: 'file', name: '8 - Bit-stuffing and piggybacking.pdf', ext: 'pdf' },
              { type: 'file', name: '9 - Lv 2.pdf', ext: 'pdf' },
              { type: 'file', name: '10 - LAN.pdf', ext: 'pdf' },
              { type: 'file', name: '10 GigaBit Ethernet.pdf', ext: 'pdf' },
              { type: 'file', name: 'concetti fondamentali della comunicazione di rete.pdf', ext: 'pdf' },
              { type: 'file', name: 'Ethernet.pdf', ext: 'pdf' },
              { type: 'file', name: 'Standard ethernet IEEE802.3 (Documentazione).pdf', ext: 'pdf' },
              { type: 'file', name: 'Standard Ethernet IEEE802.3 (Presentazione).pdf', ext: 'pdf' },
              { type: 'file', name: 'switch.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'livello 3 IP', children: [
              { type: 'file', name: '11 - Lv 3.pdf', ext: 'pdf' },
              { type: 'file', name: '12 - Lv 3 - ARP.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'livello 4 TCP UDP', children: [
              { type: 'file', name: '03 - Lv 3 e 4 - Simulazione.pdf', ext: 'pdf' },
              { type: 'file', name: '13 - Lv 4.pdf', ext: 'pdf' },
              { type: 'file', name: '14 - Lv 4 UDP.pdf', ext: 'pdf' },
              { type: 'file', name: '15 - Lv 4 TCP.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'packet tracer', children: [
              { type: 'file', name: '01 hub bridge switch.pdf', ext: 'pdf' },
              { type: 'file', name: '02c INDIRIZZI IP.pdf', ext: 'pdf' },
              { type: 'file', name: 'DHCP RIP ACCESS POINT.pdf', ext: 'pdf' },
            ],
          },
        ],
      },
      {
        type: 'folder', name: 'TDP', children: [
          {
            type: 'folder', name: 'c', children: [
              { type: 'file', name: 'I FILE PER RIPASSO.pdf', ext: 'pdf' },
              { type: 'file', name: 'Le librerie.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'cpp', children: [
              { type: 'file', name: 'OOP (1).pdf', ext: 'pdf' },
              { type: 'file', name: 'Ripasso - I file in C++.pdf', ext: 'pdf' },
              { type: 'file', name: 'TDP 4 Overloading di operatori ed ereditarietà in C++ (3).pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'ingegneria sw', children: [
              { type: 'file', name: 'Ciclo di vita del software - TDP 23.pdf', ext: 'pdf' },
              { type: 'file', name: 'TDP 4 UML - Casi Duso v23.pdf', ext: 'pdf' },
              { type: 'file', name: 'TDP 4 UML - Diagramma classi v23.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'swing', children: [
              { type: 'file', name: '01 Java Swing.pdf', ext: 'pdf' },
              { type: 'file', name: 'PREVERIFICA QUARTA TDP.pdf', ext: 'pdf' },
              { type: 'file', name: 'TDP 4 - Interfacce grafiche Swing.pdf', ext: 'pdf' },
              { type: 'file', name: 'verifica 4CIIN JAVASWING.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'threads', children: [
              { type: 'file', name: '1-Difference between User Level thread and Kernel Level thread.pdf', ext: 'pdf' },
              { type: 'file', name: '2-Kernel Threads and User Threads - IBM Documentation.pdf', ext: 'pdf' },
              { type: 'file', name: '3-Difference between User Level and Kernel Level Thread (Tabular Form).pdf', ext: 'pdf' },
              { type: 'file', name: 'Programmazione Concorrente e multithread P1.pdf', ext: 'pdf' },
              { type: 'file', name: 'Programmazione Concorrente e multithread P2.pdf', ext: 'pdf' },
              { type: 'file', name: 'VERIFICA TDP MAGGIO 23 4CIIN.pdf', ext: 'pdf' },
            ],
          },
        ],
      },
    ],
  },

  '5CIIN': {
    label: 'Quinto Anno',
    period: '2023 / 2024',
    zip: 'Moodle/5CIIN_MOODLE.zip',
    intro: 'Materiali Moodle del quinto anno: Sistemi e Reti avanzati, Android, Socket, Web Services.',
    tree: [
      {
        type: 'folder', name: 'Sistemi', children: [
          { type: 'file', name: '01 - Simulazione Firewall Proxy - DNS FTP HTTP SMTP POP IMAP.pdf', ext: 'pdf' },
          { type: 'file', name: 'DNS.pdf', ext: 'pdf' },
          { type: 'file', name: 'firewall.pdf', ext: 'pdf' },
          { type: 'file', name: 'IPv6.pdf', ext: 'pdf' },
          { type: 'file', name: 'nat_pat_dmz.pdf', ext: 'pdf' },
          { type: 'file', name: 'RIPASSO PER SECONDA PROVA.pdf', ext: 'pdf' },
          { type: 'file', name: 'stp_vlan.pdf', ext: 'pdf' },
          { type: 'file', name: 'TCP_IP.pdf', ext: 'pdf' },
          { type: 'file', name: 'Turing per 5ciin.pdf', ext: 'pdf' },
          {
            type: 'folder', name: 'crittografia', children: [
              { type: 'file', name: '01 - Crypto.pdf', ext: 'pdf' },
              { type: 'file', name: '02 - Diffie Hellman.pdf', ext: 'pdf' },
              { type: 'file', name: '03 - Public key encryption.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'esame', children: [
              { type: 'file', name: '1_simulazione_seconda_prova_sistemi_e_reti_ITIA_24.pdf', ext: 'pdf' },
              { type: 'file', name: '1_soluzione_seconda_prova_sistemi_e_reti_ITIA_24.docx', ext: 'docx' },
              { type: 'file', name: '2018-ITIA_ORD18.pdf', ext: 'pdf' },
              { type: 'file', name: 'ManualePerSecondaProva.odt', ext: 'odt' },
              { type: 'file', name: 'Prove sistemi e reti.pdf', ext: 'pdf' },
              { type: 'file', name: 'Simulazione 22 maggio 24 5ciin.pdf', ext: 'pdf' },
              { type: 'file', name: 'Simulazione #2.pdf', ext: 'pdf' },
              { type: 'file', name: 'soluzioni_ITIA_ORD18.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'microcontrollori', children: [
              { type: 'file', name: 'Microcontrollori e SoC (2).pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'packet tracer', children: [
              { type: 'file', name: 'Access Point.pdf', ext: 'pdf' },
              { type: 'file', name: 'COLLEGAMENTI LAN.pdf', ext: 'pdf' },
              { type: 'file', name: 'DNS HTTP.pdf', ext: 'pdf' },
              { type: 'file', name: 'NAT PAT.pdf', ext: 'pdf' },
              { type: 'file', name: 'Progettare la struttura fisica delle LAN.pdf', ext: 'pdf' },
              { type: 'file', name: 'Slide SMTP.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'slide programma quarta', children: [
              { type: 'file', name: '01 hub bridge switch.pdf', ext: 'pdf' },
              { type: 'file', name: '02b IOS E CLI.pdf', ext: 'pdf' },
              { type: 'file', name: '02c INDIRIZZI IP.pdf', ext: 'pdf' },
              { type: 'file', name: '02 LAN SWITCH ROUTER.pdf', ext: 'pdf' },
              { type: 'file', name: '02 ROUTER E INDIRIZZI IP PACKET TRACER parte1.pdf', ext: 'pdf' },
              { type: 'file', name: '02 ROUTER E INDIRIZZI IP PACKET TRACER.pdf', ext: 'pdf' },
              { type: 'file', name: '03 DHCP RIP ACCESS POINT.pdf', ext: 'pdf' },
              { type: 'file', name: 'TUTTI GLI APPUNTI.pdf', ext: 'pdf' },
            ],
          },
        ],
      },
      {
        type: 'folder', name: 'TDP', children: [
          {
            type: 'folder', name: 'android', children: [
              { type: 'file', name: '01_Introduzione Android.pdf', ext: 'pdf' },
              { type: 'file', name: '02_Toast e prima app.pdf', ext: 'pdf' },
              { type: 'file', name: '03 Aggiungere immagini.pdf', ext: 'pdf' },
              { type: 'file', name: '03b Components logcat e distribuzione.pdf', ext: 'pdf' },
              { type: 'file', name: '03c Esercizi preverifica.pdf', ext: 'pdf' },
              { type: 'file', name: '04_Tutorial_App_Blocco_Note.pdf', ext: 'pdf' },
              { type: 'file', name: 'Contaclick.pdf', ext: 'pdf' },
              { type: 'file', name: 'Verifica.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'socket', children: [
              { type: 'file', name: 'Introduzione Socket.pdf', ext: 'pdf' },
              { type: 'file', name: 'Modello ClientServer e protocollo applicativo HTTP (2).pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'thread', children: [
              { type: 'file', name: '01 I thread.pdf', ext: 'pdf' },
              { type: 'file', name: '02 Concorrenza Thread.pdf', ext: 'pdf' },
              { type: 'file', name: 'File binari.pdf', ext: 'pdf' },
              { type: 'file', name: 'File di testo in Java.pdf', ext: 'pdf' },
              { type: 'file', name: 'Programmazione Concorrente e multithread P3 - Problemi Classici.pdf', ext: 'pdf' },
              { type: 'file', name: 'Programmazione concorrente e multithread.docx', ext: 'docx' },
            ],
          },
          {
            type: 'folder', name: 'webservice', children: [
              { type: 'file', name: 'IMG_20240508_092406.jpg', ext: 'jpg' },
              { type: 'file', name: 'RestVSSoap.pdf', ext: 'pdf' },
              { type: 'file', name: 'Web Services.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'xml', children: [
              { type: 'file', name: '02 XML Schema.pdf', ext: 'pdf' },
              { type: 'file', name: '03_DOM.pdf', ext: 'pdf' },
            ],
          },
          {
            type: 'folder', name: 'xml - dom - socket - multiclient', children: [
              { type: 'file', name: 'Consegna Progetto.pdf', ext: 'pdf' },
              { type: 'file', name: 'Nuova documentazione.pdf', ext: 'pdf' },
            ],
          },
        ],
      },
    ],
  },
}

export function useMoodleTree() {
  function getMeta(year: string): YearMeta | undefined {
    return years[year]
  }

  function getAtPath(year: string, pathSegments: string[]): TreeNode | undefined {
    const meta = years[year]
    if (!meta) return undefined
    if (!pathSegments.length) return undefined
    return traverse(meta.tree, pathSegments)
  }

  function traverse(nodes: TreeNode[], segments: string[]): TreeNode | undefined {
    const [head, ...rest] = segments
    const node = nodes.find(n => n.name === head)
    if (!node) return undefined
    if (!rest.length) return node
    if (node.type === 'folder' && node.children) {
      return traverse(node.children, rest)
    }
    return undefined
  }

  return { getMeta, getAtPath, years: Object.keys(years) }
}
