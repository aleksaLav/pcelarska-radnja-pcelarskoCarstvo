$(document).ready(function () {
    let products = JSON.parse(localStorage.getItem("products"));
    if(products==null){
        products=0;
    }
    let nizProizvodaULocalstorage=products.length;
    if(nizProizvodaULocalstorage){
        prikaziProizvodeIzKorpe()
    }
    else{
        PrikazZaPraznuKorpu();
    }

    $(".quantity").on("change",updateKolicinaIUkupnaCenaPoProizvodu)
});

function prikaziProizvodeIzKorpe() {
   
    let products = PROIZVODIuKORPI();
    $.ajax({
        url : "data/proizvodi.json",
        success : function(data) {
            data = data.filter(p => {
                for(let prod of products)
                {
                    if(p.id == prod.id) {
                        p.kolicina = prod.kolicina;
                        return true;
                    }
                        
                }
                return false;
            });
            ispisiTabelu(data)
        }
    });
}

function ispisiTabelu(products) {
    //header
    let ispis = `
            <table class="timetable_sub">
				<thead>
					<tr>
					
						<th>SLIKA</th>
						<th>NAZIV PROIZVODA</th>
                        <th>CENA PO KOMADU</th>
                        <th>KOLIČINA</th>
						<th>UKUPNA CENA ZA OVAJ PROIZVOD</th>
						<th>IZBACI IZ KORPE</th>
					</tr>
				</thead>
                <tbody>`;
    //body
    products.forEach(p => {
                    ispis +=
                    `<tr>
        
        <td >
            <a href="single.html">
                <img src="${p.slika.src}" style='height:100px' alt="${p.slika.alt}" class="img-responsive">
            </a>
        </td>
        <td >${p.naziv}</td>
        <td >$${p.cena.nova}</td>
        <td >
        <input type="number" data-id="${p.id}" class="quantity" name="quantity" min="1" max="7" value="${p.kolicina}"> 
        </td>
        <td id="cena">${cenaPoProizvodu(p)} rsd</td>
        <td >
            <div>
                <div><button type="submit" onclick='obrisiIzKorpe(${p.id})'>Obriši</button> </div>
            </div>
        </td>
    </tr>`
                });
    //footer
    ispis +=`<tr>
    <th colspan="4">UKUPNO IMATE DA PLATITE:</th>
    <th>${ukupnaCena()} din</th> 
    <th><button class="p-2" onclick="obavestenje()">NARUČI</ button></th> 
    </tr> </tbody>
            </table>`;

    $("#content").html(ispis);
   
    $(".quantity").on("change",updateKolicinaIUkupnaCenaPoProizvodu)

    function ukupnaCena(){
        let ukupno=0;
        for(let p of products) {
            ukupno += (p.cena.nova * p.kolicina);
        }
        return ukupno;
    }
    function cenaPoProizvodu(x){
        let y;
         y=x.kolicina*x.cena.nova
        return y;
    }
}

function updateKolicinaIUkupnaCenaPoProizvodu(){
    console.log($(this).val());

    let products = PROIZVODIuKORPI();
    let kolicina = Number($(this).val());
    let x = $(this).data("id");

    for(let prod in products){
        if(products[prod].id==x){
        products[prod].kolicina = kolicina;    
            break;
        }
    }
    localStorage.setItem("products", JSON.stringify(products))

    prikaziProizvodeIzKorpe()
}


function PrikazZaPraznuKorpu() {
    $("#content").html("<h1>TVOJA KORPA JE PRAZNA!</h1>")
}

function PROIZVODIuKORPI() {
    return JSON.parse(localStorage.getItem("products"));
}

function obrisiIzKorpe(id) {
    let products = PROIZVODIuKORPI();
    let filtrirano = products.filter(p => p.id != id);

    localStorage.setItem("products", JSON.stringify(filtrirano));
    prikaziProizvodeIzKorpe()
}


function upisiUlocalStorage(x){
    let products = PROIZVODIuKORPI();
    let kolicina = this.value;
    console.log(kolicina)
    for(let prod in products){
        if(products[prod].id==x){
         products[prod].kolicina;    
            break;
         }
    }
    localStorage.setItem("products", JSON.stringify(products))
}

function obavestenje(){
    let products = PROIZVODIuKORPI();
    products=null
    localStorage.setItem("products", JSON.stringify(products))
    PrikazZaPraznuKorpu()
    alert("USPEŠNO STE NARUČILI!!!")
}

