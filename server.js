const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
// Middleware za omogućavanje CORS-a
app.use(express.json());
app.use((req, res, next) => {
  console.log(`Dolazni zahtjev: ${req.method} ${req.url}`);
  next();
});
const port = 4000;
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://callisto:mongo@cluster0.s85nncy.mongodb.net/eDnevnik', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Greška pri spajanju na bazu:', error);
});
db.once('open', function () {
  console.log('Spojeni smo na MongoDB bazu ');
});

app.get('/', (req, res) => {
  res.send('Dobrodošli na e-Dnevnik!!');
});

//Sheme
//za ucenike-u bazi osobni_podaci
const { Schema } = mongoose;
const ucenikShema = new Schema({
  redni_broj: Number,
  ime_i_prezime: String,
  datum_rodenja: String,
  mjesto_rodenja: String,
  maticni_broj: String,
  adresa: String,
  program: String,
  podaci_o_roditeljima: {
    majka: String,
    otac: String,
    adresa: String,
    telefon: Number
  },
  oib:String
});

// Specificiranje kolekcije u modelu
const Ucenik = mongoose.model("Ucenik", ucenikShema, 'osobni_podaci');

app.get('/osobni_podaci/:storedEmail', async (req, res) => {
  try {
    const sviUcenici = await Ucenik.find();
    res.json(sviUcenici);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//za ucenike- u bazi studenti
const studentiShema=new Schema({
    ime:String,
    prezime:String,
    razred:String,
    korisnicko_ime:String,
    lozinka:String,
    skola:{
        naziv:String,
        mjesto:String
    },
    ime_prezime_razrednika:String

})
const Studenti = mongoose.model("Studenti", studentiShema, 'studenti');

// Zahtjev za provjeru prijave
app.post('/studenti', async (req, res) => {
  const { korisnicko_ime, lozinka } = req.body;

  try {
    const student = await Studenti.findOne({ korisnicko_ime, lozinka });

    if (student) {
      res.json({ success: true, student });
    } else {
      res.json({ success: false, message: 'Pogrešno korisničko ime ili lozinka' });
    }
  } catch (error) {
    console.error('Greška pri provjeri prijave:', error);
    res.status(500).json({ success: false, message: 'Greška pri provjeri prijave' });
  }
});

app.get('/studenti/:storedEmail', async (req, res) => {
  try {
    const sviStudenti = await Studenti.find();
    res.json(sviStudenti);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//za predmete
const predmetiShema=new Schema({
  naziv:String,
  ocjene_proizlaze_iz:String,
  ocjene_po_mjesecima:{
    mjesec:String,
    ocjena:String

  },
  zakljuceno:String,
  studentiIds:Number


});

const Predmeti = mongoose.model("Predmeti", predmetiShema, 'predmeti');

app.get('/predmeti/:storedEmail', async (req, res) => {
  try {
    const sviPredmeti = await Predmeti.find();
    res.json(sviPredmeti);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//za biljeske nastavnika
const biljeskeShema=new Schema({
  biljeska:String,
  predmet:String,
  datum:String,
  ocjena:String,
  studentIds:Number
})

const Biljeske=mongoose.model('Biljeske', biljeskeShema,'biljeske');

app.get('/biljeske/:storedEmail', async (req, res) => {
  try {
    const sveBiljeske = await Biljeske.find();
    res.json(sveBiljeske);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//za podatke o profesorima
const profesoriShema=new Schema({

  ime:String,
  prezime:String,
  mail:String,
  predmet_koji_predaje:Array
});

const Profesori=mongoose.model('Profesori', profesoriShema,'profesori');

app.get('/profesori', async (req, res) => {
  try {
    const sviProfesori = await Profesori.find();
    res.json(sviProfesori);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Za biljeske razrednika
const biljShema =new Schema ({
  biljeska_razrednika: String,
  izvanskolske_aktivnosti: String
});

const Biljeska=mongoose.model("Biljeska", biljShema, 'biljeske_na_izbornoj_traci');

app.get('/biljeske_na_izbornoj_traci/', async (req, res) => {
  try{
    const sve=await Biljeska.find();
    res.json(sve);
  }catch(error) {
    res.status(500).send(error.message);
  }
})

//Za izostanke
const izostanciShema=new Schema ({
  datum: String,
  sat: Number,
  predmet: String,
  status: String,
  razlog: String
});

const Izostanci=mongoose.model("Izostanci", izostanciShema, 'izostanci');

app.get('/izostanci/', async (req, res) => {
  try{
    const sviIzostanci=await Izostanci.find();
    res.json(sviIzostanci);
  }catch(error) {
    res.status(500).send(error.message);
  }
})

//Za ispite
const ispitiShema =new Schema ({
  mjesec: String,
  predmet: String,
  biljeska: String,
  datum: String
});

const Ispiti=mongoose.model("Ispiti", ispitiShema, 'ispiti');

app.get('/ispiti/', async (req, res) => {
  try{
    const sviIspiti=await Ispiti.find();
    res.json(sviIspiti);
  }catch(error) {
    res.status(500).send(error.message);
  }
})

app.get('/ispiti/:month', async (req, res) => {
  const selectedMonth = req.params.month;
  try {
      // Fetch data from MongoDB based on the selected month
      const sviIspiti = await Ispiti.find({ mjesec: selectedMonth });
      res.json(sviIspiti);
  } catch (error) {
      res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server je pokrenut na http://localhost:${port}`);
});

//za provjeru prijave 
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/provjeri-prijavu', async (req, res) => {
  const korisnicko_ime = req.body.email;  // korisnicko_ime se koristi za e-mail
  const lozinka = req.body.password;

  try {
    const student = await Studenti.findOne({ korisnicko_ime, lozinka });

    if (student) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Greška pri provjeri prijave:', error);
    res.status(500).json({ success: false, message: 'Greška pri provjeri prijave' });
  }
});

