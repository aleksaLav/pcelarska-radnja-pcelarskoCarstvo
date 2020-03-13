$( document ).ready(function() {

    document.getElementById('posalji').addEventListener('click',provera);
    document.getElementById("ime").addEventListener('blur',imePrezime);
    document.getElementById('email').addEventListener('blur',email);
    document.getElementById('telefon').addEventListener('blur',telefon);
    document.getElementById('poruka').addEventListener('blur',poruka);

    document.getElementById('posalji').addEventListener('click',obecestenje);

    obecestenje()

});

function validno(regIzr, vrednost){
    if(regIzr.test(vrednost)){
    return true;
    }
    else return false;
    }
   
    function obecestenje(){
    if(validnoProvera()){
    alert("Poruka je uspešno poslata!!!")
    }
    }
   
    function validnoProvera(){
    var imePrezime=document.getElementById('ime').value.trim();
    var REGimePrezime=/^[A-ZŽĐŠČĆ][a-zžđščć]{2,14}(\s[A-ZŽĐŠČĆ][a-zžđščć]{2,14}){1,2}$/;
    var email = document.getElementById('email').value.trim();
    var REGemail =/^[A-zžđščć][A-zžđščć\d\_\.\-]+\@[a-z]{3,10}(\.[a-z]{2,4})+$/;
    var telefon= document.getElementById('telefon').value.trim();
    var REGtelefon = /^(06[0-9]|\+3816[0-9])\-[\d]{3}\-[\d]{3,4}$/;
    var poruka = document.getElementById('poruka').value.trim();
    var REGporuka = /^[A-zžđščć\s\/\-\_\+\@\,\.\'\"\%\d]{15,60}$/;
    if( validno(REGimePrezime, imePrezime)&&
    validno(REGemail, email)&&
    validno(REGtelefon, telefon)&&
    validno(REGporuka, poruka)&&
   // gradProvera()&&
    saglasnostProvera()){return true;}
    else{ return false;}
    }

function saglasnostProvera(){
    var saglasnost = document.querySelector('#saglasnost');
    if(!(saglasnost.checked)){
    return false;
    }
    return true;
    }
    function imePrezime(){
    var imePrezime=document.getElementById('ime').value.trim();
    var REGimePrezime=/^[A-ZŽĐŠČĆ][a-zžđščć]{2,14}(\s[A-ZŽĐŠČĆ][a-zžđščć]{2,14}){1,2}$/;
    if( validno(REGimePrezime, imePrezime)){
    document.getElementById('greskaImePrezime').innerHTML='';
    document.getElementById('greskaImePrezime').classList.remove('dodaj');
    document.getElementById('ime').style.borderBottom ='3px solid gray';
    }
    else {
    document.getElementById('greskaImePrezime').innerHTML='Polje za ime i prezime nije u dobrom formatu!';
    document.getElementById('greskaImePrezime').classList.add('dodaj');
    document.getElementById('ime').style.borderBottom ='3px solid red';
    }
    }
    function email(){
    var email = document.getElementById('email').value.trim();
    var REGemail =/^[A-zžđščć][A-zžđščć\d\_\.\-]+\@[a-z]{3,10}(\.[a-z]{2,4})+$/;
    if(!validno(REGemail, email)){
   
    document.getElementById('greskaEmail').innerHTML='Polje za email nije u dobrom formatu!';
    document.getElementById('greskaEmail').classList.add('dodaj');
    document.getElementById('email').style.borderBottom ='3px solid red';
    }
    else {
    document.getElementById('greskaEmail').innerHTML='';
    document.getElementById('greskaEmail').classList.remove('dodaj');
    document.getElementById('email').style.borderBottom ='3px solid gray';

}
}
function telefon(){
var telefon= document.getElementById('telefon').value.trim();
var REGtelefon = /^(06[0-9]|\+3816[0-9])\-[\d]{3}\-[\d]{3,4}$/;
if(!validno(REGtelefon, telefon)){
document.getElementById('greskaBroj').innerHTML='Polje za telefon nije u dobrom formatu!';
document.getElementById('greskaBroj').classList.add('dodaj');
document.getElementById('telefon').style.borderBottom ='3px solid red';
}
else {
document.getElementById('greskaBroj').innerHTML='';
document.getElementById('greskaBroj').classList.remove('dodaj');
document.getElementById('telefon').style.borderBottom ='3px solid gray';
}
}
function poruka(){
var poruka = document.getElementById('poruka').value.trim();
var REGporuka = /^[A-zžđščć\s\/\-\_\+\@\,\.\'\"\%\d]{15,60}$/;
if(!validno(REGporuka, poruka)){
document.getElementById('greskaPoruke').innerHTML='Poruka je ograničena,mora sadržati min 15,a max 50 karaktera!';
document.getElementById('greskaPoruke').classList.add('dodaj');
document.getElementById('poruka').style.borderBottom ='3px solid red';
}
else {
document.getElementById('greskaPoruke').innerHTML='';
document.getElementById('greskaPoruke').classList.remove('dodaj');
document.getElementById('poruka').style.borderBottom ='3px solid gray';
}
}
function saglasnost(){
var saglasnost = document.querySelector('#saglasnost');
if(!(saglasnost.checked)){
document.getElementById('agree').innerHTML='Niste dali saglasnost!';
document.getElementById('agree').classList.add('dodaj');
}
else {
document.getElementById('agree').innerHTML='';
document.getElementById('agree').classList.remove('dodaj');
}
}
function provera(e){
e.preventDefault()
saglasnost()
poruka()
telefon()
email()
imePrezime()
}