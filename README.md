# Scrapper


Scrapper je narjen z node.js

## Scrapper
ce rabi kdo pomoc (in jo rabite s parsersom ziher)
pisi na 
rene.vrbnjak@student.um.si  
pa se lahko zmenimo, jaz sm to samo za robija nardil hehehehe



## Install node.js
dol potegnes tole:

https://nodejs.org/en/download/package-manager

v terminalski mapi npr /scrapper/

```
npm install
```


## Installras tud vse package, zaj nevem kere tocno, ce bos dobo error pac tiste instaliras
v terminal 

```
npm install <package>
```

ce bo kj jebalo pa das zravn sudo 
```
sudo npm install <package>
```

## 1. Zagon-> Dodaj si kaki try{}catch(), ce so kaki linki izbrisani alpa kaj faila 

prvo zazenes na stran scrapper da dobis vse linke vun v (link.txt), not v 8. liniji popravis kere avte hoces,trenutno je renault megane
```
node scrape.cjs
```

## 2. Zagon  
Zazenes to da lahko vse linnke (linki.txt) obdelas pa fuknes v datoteko(data.txt). Zaj ce bos veckrat pognal se ti bo dodalo v datoteko in ne prepisalo.

```
node scrapeiter.cjs
```
## 3. Parsanje  
Iz data.txt -> csv.csv
Zaj tu je en problemcic ker mors malo datoteko editat da gre parsat, tu ti lah pomagam alpa ce sam spises parser oz ga popravis
```
node parser.cjs
```

## malo sm zakompliciro a jebiga
