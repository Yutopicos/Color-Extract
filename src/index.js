"use strict";

(function () {
    var namespace = "image_color_app";
    var urlImg = "assets/images";
    var browser = "mobile";
    var lang = "en";
    var dateUpload = "?";
    var maxFileSize = 10;
    var maxFileGallery = 20;
    var userInfos = [];
    var images = [];
    var menuItems = [];
    var acceptableExtensions = ["jpg", "gif", "png", "tata"];
    var menu = window.document.querySelector("#menu");
    var gallery = window.document.querySelector("#gallery");
    var divCollection = window.document.getElementsByTagName("div");
    var main = window.document.querySelector("#upload");
    var welcome = window.document.querySelector("#welcome");
    var color = window.document.querySelector("#color");
    var inputFile = window.document.querySelector("#file");
    var imagesInCache = JSON.parse(localStorage.getItem(namespace));

    //fonctions
    /**
     * Define element and put a text in
     * @param {String} tagName 
     * @param {String} text 
     * @param {String} target 
     */
    function textInElement(tagName, text, target) {
        var element = window.document.createElement(tagName);
        if (typeof text !== "undefined") {
            var myText = window.document.createTextNode(text);
            element.appendChild(myText);
            if (target instanceof HTMLElement) {
                target.appendChild(element);
            }
        }
        return element;
    }

    /**
     * Permet d'insérer une image dans la gallery
     * @param {Object} colorImage 
     * @param {String} nameImage 
     * @param {String} srcImage 
     * @param {Number} sizeImage 
     * @param {String} extensionImage 
     * @param {String} altImage 
     */
    function pushImage(colorImage, nameImage, srcImage, sizeImage, extensionImage, altImage) {
        images.push({
            color: colorImage,
            nom: nameImage,
            src: srcImage,
            size: sizeImage,
            extension: extensionImage,
            alt: altImage,

        });
    }
    /**
     * Permet d'insérer un nouvel item dans le menu
     * @param {String} nameItem 
     * @param {String} urlItem 
     */
    function pushItem(nameItem, urlItem) {
        menuItems.push({
            nom: nameItem,
            url: urlItem,
        })
    }

    /**
     * valider extension
     * @param {Object} image
     * @return {Boolean}
     */
    function isExtensionValid(image) {
        for (var key in acceptableExtensions) {
            if (image.extension === acceptableExtensions[key]) {
                return true;
            }
        }
        return false;
    }

    /**
     *  Valider taille galerie
     */
    function isGalleryFull() {
        if (images.length > maxFileGallery) {
            return true;
        }
        return false;
    }

    /**
     * append links in menu
     */
    function displayMenuItems() {
        for (var key in menuItems) {
            var myText = document.createTextNode(menuItems[key].nom);
            var itemElementa = document.createElement("a");
            var itemElementli = document.createElement("li");
            itemElementli.setAttribute("class", "nav-item text-center");
            itemElementa.setAttribute("class", "nav-link");
            itemElementa.setAttribute("href", menuItems[key].url);
            itemElementa.appendChild(myText);
            itemElementli.appendChild(itemElementa);
            menu.appendChild(itemElementli);
        }
    }

    /**
     * IMAGES
     * Append imgs in images
     */
    function displayImages() {
        gallery.innerHTML = "";
        for (var key in images) {
            if (null === images[key].extension || isExtensionValid(images[key])) {
                var imageElementDiv = document.createElement("div");
                var imageElement = document.createElement("img");
                imageElementDiv.appendChild(imageElement);
                gallery.appendChild(imageElementDiv);
                imageElement.setAttribute("alt", images[key].alt);
                imageElement.setAttribute("src", images[key].src);
                imageElement.setAttribute("class", "img-fluid");
                imageElement.setAttribute("style", "width:140px");
                imageElement.setAttribute("style", "height: 200px");
                imageElementDiv.setAttribute("class", "text-center bg-light col-6 col-lg-4 col-xl-2 border");
                registerEvent(imageElement);
            }
            else {
                console.log("format non accepté");
            }
        }
    }
    function registerEvent(imageElement) {
        imageElement.onclick = function (event) {
            onClickImage(event, imageElement);

        }
    }

    function displayColor(colorElement) {
        for (var key in colorElement) {
            var div = textInElement("div", colorElement[key].html_code, color);
            div.style.backgroundColor = colorElement[key].html_code;
        }
    }

    function onClickImage(event, imageElement) {
        color.innerHTML = "";
        var preview = window.document.querySelector("#preview");
        preview.style.backgroundImage = "url(" + imageElement.getAttribute("src") + ")";

        var btn = window.document.createElement("button");
        var text = window.document.createTextNode("Delete");
        btn.appendChild(text);
        color.appendChild(btn);
        btn.setAttribute("class", "btn btn-light btn-lg border");
        var imageFound = images.find(function (elem) {
            return elem.src === imageElement.getAttribute("src");
        })
        displayColor(imageFound.color.background_colors);
        displayColor(imageFound.color.foreground_colors);
        displayColor(imageFound.color.image_colors);

        btn.addEventListener('click', function (event) {
            onClickDelete(event, imageElement);
        });
    }

    function onClickDelete(event, imageElement) {
        var imageFound = images.find(function (elem) {
            return elem.src === imageElement.getAttribute("src");
        })
        var imageFoundKey = images.indexOf(imageFound);
        images.splice(imageFoundKey, 1);
        window.localStorage.setItem(namespace, JSON.stringify(images));
        displayImages();
        preview.style.backgroundImage = "url(assets/images/default.png)";
        color.innerHTML = "";
    }

    /**
     * TITRE: Message de bienvenue en javascript
     */
    function displayWelcome() {
        var welcomeMessage = "Bienvenue";
        if (lang !== "fr") {
            welcomeMessage = "Welcome"
        }
        textInElement("h1", welcomeMessage, welcome);
    }

    /**
     * 
     * @param {*} event 
     * @param {*} uploadedFile 
     */
    function onChangeFile(event, uploadedFile) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imagga.com/v2/colors");
        xhr.onload = function (event) {
            if (200 === xhr.status) {
                var reader = new FileReader;
                reader.onload = function (event) {
                    var colorObject = JSON.parse(xhr.responseText);
                    pushImage(
                        colorObject.result.colors,
                        null,
                        reader.result,
                        null,
                        null
                    );
                    displayImages();
                    gallery.lastChild.firstChild.onclick();
                    window.localStorage.setItem(namespace, JSON.stringify(images));
                };
                reader.readAsDataURL(uploadedFile);
                return;
            }
            alert("format non pris en charge");
        }
        xhr.setRequestHeader(
            "Authorization",
            "Basic YWNjXzUyM2FlZWI0MDM5NjUxNzpiOTk5YjcwM2VmMTU4OTFiYTFkZmU5ZTkxNGI1NDkxMw==");
        var body = new FormData;
        body.append("image", uploadedFile);
        xhr.send(body);
    }

    /**
     * Ajouter un bouton upload
     */
    function displayUploadBtn() {
        var sendUrl = textInElement("form", "", main);
        var inputUrl = textInElement("input", null, sendUrl);
        var inputSubmit = textInElement("input", "submit", sendUrl);
        sendUrl.setAttribute("action", "");
        sendUrl.setAttribute("method", "GET");
        inputUrl.setAttribute("type", "url");
        inputUrl.setAttribute("required", "required");
        inputSubmit.setAttribute("type", "submit");
        inputSubmit.setAttribute("value", "send");
        inputSubmit.setAttribute("class", "btn btn-light btn-lg border");
        onSubmitForm(sendUrl);

        if (!isGalleryFull()) {
            var btn = textInElement("button", "upload", main);
            btn.setAttribute("class", "btn btn-light btn-lg border");
            btn.addEventListener("click", function (event) {
                inputFile.click();
            });
            inputFile.addEventListener("change", function (event) {
                onChangeFile(event, inputFile.files[0]);
            });
            return;
        }
        textInElement("b", "Gallery is full", main);
    }

    /**
     * 
     * @param {*} event 
     * @param {*} form 
     */
    function onSubmitForm(sendUrl) {
        sendUrl.addEventListener("submit", function (event) {
            event.preventDefault();
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.imagga.com/v2/colors?image_url=" + sendUrl.elements[0].value);
            xhr.setRequestHeader(
                "Authorization",
                "Basic YWNjXzUyM2FlZWI0MDM5NjUxNzpiOTk5YjcwM2VmMTU4OTFiYTFkZmU5ZTkxNGI1NDkxMw==");
            xhr.onload = function () {
                var colorObject = JSON.parse(xhr.responseText);
                if (200 === xhr.status) {
                    pushImage(colorObject.result.colors,
                        sendUrl.elements[0].value,
                        sendUrl.elements[0].value,
                        null,
                        null
                    );
                    displayImages();
                    gallery.lastChild.firstChild.onclick();
                    window.localStorage.setItem(namespace, JSON.stringify(images));
                    return;
                }
                alert("format non pris en charge");
            }
            xhr.send();
        });
    }

    /**
     * Ajouter liste extension dans footer après un titre h6
     */
    function displayFooter() {
        var footer = window.document.querySelector("footer.bottom");
        var footerTitle = window.document.createElement("h6");
        var footerTilteText = window.document.createTextNode("extensions acceptées");
        var footerList = window.document.createElement("ul");
        footerList.setAttribute("class", "list-inline");
        footer.appendChild(footerTitle);
        footer.appendChild(footerList);
        footerTitle.appendChild(footerTilteText);

        for (var key in acceptableExtensions) {
            var footerListItem = window.document.createElement("li");
            footerList.appendChild(footerListItem)
            var footerListItemText = window.document.createTextNode(acceptableExtensions[key]);
            footerListItem.appendChild(footerListItemText);
            footerListItem.setAttribute("class", "list-inline-item")
        }
    }

    if (null !== imagesInCache) {
        images = imagesInCache;
    }

    pushItem("Accueil", "accueil.html");
    pushItem("Gallery", "gallery.html");
    pushItem("Contact", "contact.html");
    displayMenuItems();
    displayImages();
    displayWelcome();
    displayUploadBtn();
    displayFooter();
})();













































// Créer un élément-----------------------------------------------------------
// var itemLink = document.createElement("a");

// AJOUTER DU CONTENU A ELEMENT----------------------------------------
// très mauvaise façon très pratique---------------------------
// Insecure injection
// myElement.innerHTML= "<a>efieufiefugifug</a>"

// Ajouter du texte (à un élément)
        // myElement.innerText -> pb de compatibilité

// var myText= document.createTextNode(txt)
// Element.appendChild(myText)

// AFFICHER LA LANGUE (dans header)

// var lang2 = document.createElement("p");
//     lang.appendChild(lang2);
// var langTxt= document.createTextNode(lang);
// itemElement.appendChild(myTextlangTxt);

// if("fr"===lang){
//     console.log("Bonjour");
// }else if("en"===lang){
//     console.log("Hello")
// }else{

    // pushImage("sw1", "assets/images/sw1.png", 22, "png", "napoleon");
    // pushImage("sw2", "assets/images/sw2.png", 22, "png", "napoleon");
    // pushImage("sw3", "assets/images/sw3.png", 22, "jpg", "napoleon");
    // pushImage("sw4", "assets/images/sw4.png", 22, "jpg", "napoleon");
    // pushImage("sw5", "assets/images/sw5.png", 22, "jpg", "napoleon");
    // pushImage("sw6", "assets/images/sw6.jpg", 22, "jpg", "napoleo");
    // pushImage("sw7", "assets/images/sw7.png", 22, "jpg", "napoleon");


    // // avoir le client
    // var xhr = new XMLHttpRequest();
    // // ouvrir une connexion
    // xhr.open("GET", "https://packagist.org/packages/symfony/symfony.json");
    // // enregistrer des event handlers
    // xhr.onload = function(){

    // };
    // // custom headers
    // xhr.setRequestHeader("accept", "application/json");
    // // envoyer la requete
    // xhr.send();