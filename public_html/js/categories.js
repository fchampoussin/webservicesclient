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

    //self.nom = ko.observable("default name");
    //self.description = ko.observable("default description");


    self.categories = ko.observableArray(ko.utils.arrayMap(categories, function (categorie) {
        return new Category(categorie);
    }));
    self.deleteData = function (cat) {
        console.log("coucou " + cat.id());
        self.categories.remove(cat);
        deleteData(cat.id());
    };
    self.updateData = function (cat) {
        //self.categories.
        self.categories.replace(self.categories()[cat.id], cat);
        updateData(cat);
    };
    self.sendData = function () {

        //console.log(self.categories.peek());
        //console.log(self.nom() + self.description());
        createData("", "");
        //createData(self.nom(), self.description());
        getData();

        /* self.nom = ko.observable("default name");
         self.description = ko.observable("default description");*/

    };
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
        if (ko.$bindings != null) {
            ko.cleanNode();
        }
        ko.applyBindings(new ViewModel(toto));
        //document.body.innerHTML = JSON.stringify(toto);

        //categories=response.json();
    }).catch(function (err) {

        $(".error").text(JSON.stringify(" " + err));
    });


};
var deleteData = function (id) {
    var myHeader = new Headers();
    myHeader.append("Accept", "application/json")
    fetch("http://localhost:8080/biblio/webresources/com.miage.biblio.categorie/" + id, {
        method: 'delete',
        headers: myHeader


    }).then(function (response) {
        return response.json();
    }).then(function (toto) {

        ko.cleanNode();
        ko.applyBindings(new ViewModel(toto));
        //document.body.innerHTML = JSON.stringify(toto);

        //categories=response.json();
    }).catch(function (err) {

        $(".error").text(JSON.stringify(" " + err));
    });


};
var updateData = function (cat) {
    console.log("importatAEFAEFAFC   " + cat.nom());
    var myHeader = new Headers();
    myHeader.append("Accept", "application/json");
    myHeader.append("Content-Type", "application/json");
    var nom = cat.nom();
    var id = cat.id();
    var description = cat.description();
    var data = JSON.stringify({
        "nom": nom,
        "description": description
    });
    console.log(data);

    fetch("http://localhost:8080/biblio/webresources/com.miage.biblio.categorie/" + cat.id(), {
        method: 'put',
        headers: myHeader,
        body: data


    }).then(function (response) {
        return response.json();
    }).then(function (toto) {

        ko.cleanNode();
        ko.applyBindings(new ViewModel(toto));
        //document.body.innerHTML = JSON.stringify(toto);

        //categories=response.json();
    }).catch(function (err) {

        $(".error").text(JSON.stringify(" " + err));
    });


};


var createData = function (nom, desc) {

    var myHeader = new Headers();
    myHeader.append("Accept", "application/json");
    myHeader.append("Content-Type", "application/json");

    var data = JSON.stringify({
        nom: nom,
        description: desc
    });
    console.log(data);

    fetch("http://localhost:8080/biblio/webresources/com.miage.biblio.categorie", {
        method: 'post',
        headers: myHeader,
        body: data


    }).then(function (response) {
        console.log("ouiiii" +JSON.stringify(response.json()));
       // return response.json();
    //}).then(function () {
        //ko.cleanNode();
       // ko.applyBindings(new ViewModel(toto));
        //document.body.innerHTML = JSON.stringify(toto);

        //categories=response.json();
    }).catch(function (err) {

        $(".error").text(JSON.stringify(" " + err));
    });


};