/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Category = function (categorie) {
    this.id = ko.observable(categorie.id);
    this.nom = ko.observable(categorie.nom);
    this.description = ko.observable(categorie.description);
};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 */
var ViewModel = function (categories) {
    var self = this;
    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));
};

var getData = function () {
    var categories;
    var myHeader = new Headers();
    myHeader.append("Accept", "application/json")
    fetch("http://localhost:8080/biblio/webresources/com.miage.biblio.categorie", {
        method: 'get',
        headers: myHeader


    }).then(function (response) {
        return response.json();
    }).then(function (toto) {
        ko.applyBindings(new ViewModel(toto));
        //document.body.innerHTML = JSON.stringify(toto);

        //categories=response.json();
    }).catch(function (err) {

        $(".error").text(JSON.stringify(status + " " + error));
    });


}; 