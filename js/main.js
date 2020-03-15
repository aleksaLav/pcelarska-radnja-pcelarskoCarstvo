$(document).ready(function(){
    $.ajax({
        url:"data/proizvodi.json",
        method:"get",
        type:"json",
        success:function(data){
            ispisProizvoda(data)
            document.querySelector("#search").addEventListener("input",function(){
                pretragaProizvoda(data)
            });
            $("#sortiraj").click(function(){
                sortiranje(data)
            })
            // $(".korpa").click(DODAJuKORPU);
        },
        error:function(xhr,error,status){
            console.log(status)
        }
    })
    ispisKategorija()
    $("#prioritet a").click(prioritet);
    range()
    $("[type=range]").change(range);
     upisiUkorpu()
})
function ispisProizvoda(data){    
    let ispis='';
    function stanje(x){
        if(x)
        {
            return "<span class='zelena border border-dark p-2'>na stanju</span>"
        }
        else{
            return "<span class='crvena border border-dark p-2 text-center'>trenutno nije na stanju</span>"
        }
    }
    function postojiCena(stara,nova){
        if(stara==nova){
            return "";
        }
        else return stara+" rsd"
    }
    data.forEach(element => {
        if(element.prioritet==1){
            ispis+=`
            <div class="col-xl-2 col-lg-3 col-md-5 col-sm-11 text-break border mb-1 m-2">
                <img src="${element.slika.src}" class="w-100" />
                <p class="pt-2">${element.naziv}</p>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-2 d-flex justify-content-centar">
                ${stanje(element.naStanju)}
            </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-2 pb-3 d-flex justify-content-around flex-wrap">
                    <span class="novaCena"><b>${element.cena.nova} rsd</b></span><del>
                    ${postojiCena(element.cena.stara,element.cena.nova)}
                    </del>
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 pt-2 pb-3">
                         <button id="korpa" class="korpa btn border border-dark" data-id="${element.id}"  data-stanje="${element.naStanju}">dodaj u korpu</button>
                    </div>
                </div>
            </div>
            `
        }
    });
    
    document.getElementById("proizvodi").innerHTML=ispis;
    $(".korpa").click(DODAJuKORPU);
}
function ispis(data){
    let ispis='';
    function stanje(x){
        if(x)
        {
            return "<span class='zelena border border-dark p-2'>na stanju</span>"
        }
        else{
            return "<span class='crvena border border-dark p-2 text-center'>trenutno nije na stanju</span>"
        }
    }
    function postojiCena(stara,nova){
        if(stara==nova){
            return "";
        }
        else return stara+" rsd"
    }
    data.forEach(element => {
        ispis+=`
        <div class="col-xl-2 col-lg-3 col-md-5 col-sm-11 text-break border mb-1 m-2">
              <img src="${element.slika.src}" class="w-100" />
              <p>${element.naziv}</p>
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-centar">
              ${stanje(element.naStanju)}
        </div>
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex justify-content-around flex-wrap">
                <span class="novaCena">${element.cena.nova} rsd</span><del> ${postojiCena(element.cena.stara,element.cena.nova)}</del>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                         <button id="korpa" class="korpa btn border border-dark" data-id="${element.id}" data-stanje="${element.naStanju}">dodaj u korpu</button>
                    </div>
            </div>
          </div>
        `
    });
   // console.log(ispis)
    document.getElementById("proizvodi").innerHTML=ispis;
    $(".korpa").click(DODAJuKORPU);

}
function prioritet(e){
    e.preventDefault();
    let vrednostDataAttr=this.dataset.prioritet;
    let niz=[];
  $.ajax({
    url:"data/proizvodi.json",
    method:"get",
    type:"json",
    success:function(data){
      niz=data.filter(x=> x.prioritet==vrednostDataAttr);
      ispis(niz)
     // $(".korpa").click(DODAJuKORPU);
    },
    error:function(xhr,error,status){
      console.log(status);
    }
  })
}
function ispisKategorija(){
    $.ajax({
        url:"data/kategorije.json",
        method:"get",
        type:"json",
        success:function(data){
            let ispis='<select id="kategorija"><option value="0">KATEGORIJE (sve)</option>';
            data.forEach(element => {
                ispis+=`
                <option value="${element.id}">
                ${element.naziv}
                </option>
                `
            });
            ispis+='</select>'  
            $("#sortFilter").html(ispis);
            document.getElementById("kategorija").addEventListener("change",function(){
                filtriranjePoKategoriji(this.value)
            })
        },
        error:function(xhr,error,status){
            console.log(status)
        }
    })
}
function filtriranjePoKategoriji(vrednostSElect){
    $.ajax({
        url:"data/proizvodi.json",
        method:"get",
        type:"json",
        success:function(data){
            if(vrednostSElect!=0){
                niz=data.filter(function(x){
                    return x.kategorija.id==vrednostSElect;
                });
            }else{
                niz=data.filter(element=>element.prioritet==1)
            }
            ispis(niz)
           // $(".korpa").click(DODAJuKORPU);
        },
        error:function(xhr,error,status){
            console.log(status)
        }
    })
}
function pretragaProizvoda(data){
    let rezPretrage=document.querySelector("#search").value;
    let niz=data.filter(function(x){
        if(x.kategorija.naziv.toLowerCase().indexOf(rezPretrage.toLowerCase())!==-1)
            return true;
        if(x.naziv.toLowerCase().indexOf(rezPretrage.toLowerCase())!==-1)
            return true;
    })
    if(!niz.length){
        document.getElementById("proizvodi").innerHTML="<h1 class='w-100 text-center'>NEMA TAKVIH PROIZVODA!</h1><h5 class='w-100 text-center'>(probajte ponovo da upišete naziv proizvoda) </h5>"
      
    }else {
        niz.sort((a,b)=> a.cena.nova-b.cena.nova);
        ispis(niz);
    }
}

function sortiranje(data){
    let cenaOd=document.getElementById("range1").value;
    let cenaDo=document.getElementById("range2").value;
    let kategorija=$("#kategorija").val();
    let niz=[]
        if(kategorija!=0){
            niz=data.filter(function(x){
                return x.kategorija.id==kategorija;
            });
        }else{
            niz=data;
        }
        niz=niz.filter(function(x){
            if(x.cena.nova>=cenaOd && x.cena.nova<=cenaDo)
            return true
        })

   
        if(!niz.length){
            document.getElementById("proizvodi").innerHTML="<h1 class='w-100 text-center'>NEMA TAKVIH PROIZVODA!</h1><h5 class='w-100 text-center'>(probajte ponovo da podesite cene i izaberete kategoriju) </h5>"
          
        }else {
            niz.sort((a,b)=> a.cena.nova-b.cena.nova);
            ispis(niz);
        }
}

function range(){
    let vrednost1=document.getElementById("range1").value;
    let vrednost2=document.getElementById("range2").value;
    
    document.getElementById("OfValeuPrice").innerHTML=vrednost1;
    document.getElementById("toValuePrice").innerHTML=vrednost2;
}
// local storage
function upisiUkorpu(){
    var proizvodi=PROIZVODIuKORPI();
    if(proizvodi==null){
        proizvodi=1;
    }
    var brojPorudz=proizvodi.length;
    $("#brojPorudz").html(brojPorudz);
}



function PROIZVODIuKORPI(){
    return JSON.parse(localStorage.getItem("products"));
}

function DODAJuKORPU(){ 
    let id=$(this).data("id");
    let naStanju=$(this).data("stanje");
    var proizvodi=PROIZVODIuKORPI();
    if(naStanju){
        if(proizvodi){
            
            if(DaLiVecPostojiUKorpi()){
                let proizvodi=PROIZVODIuKORPI();
                for(let i of proizvodi)
                {               
                    if(i.id == id) {
                        i.kolicina++;
                        break;
                    }      
                 }
                localStorage.setItem("products", JSON.stringify(proizvodi))
            }
            else{
                let proizvodi=PROIZVODIuKORPI();
                proizvodi.push({
                    id:id,
                    kolicina:1
                });
             localStorage.setItem("products", JSON.stringify(proizvodi))
            }
        }
        else {
            let products = [];
        products[0] = {
            id : id,
            kolicina:1 
        };
        localStorage.setItem("products", JSON.stringify(products));
        }
    }
     else {
         alert("Proizvod trenutno nije na stanju!")
    }

    upisiUkorpu()
  
    function DaLiVecPostojiUKorpi(){
        return proizvodi.filter(p=> p.id==id).length;
    }  
}



   
