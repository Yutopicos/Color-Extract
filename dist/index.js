/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function () {\n  var namespace = \"image_color_app\";\n  var urlImg = \"assets/images\";\n  var browser = \"mobile\";\n  var lang = \"en\";\n  var dateUpload = \"?\";\n  var maxFileSize = 10;\n  var maxFileGallery = 20;\n  var userInfos = [];\n  var images = [];\n  var menuItems = [];\n  var acceptableExtensions = [\"jpg\", \"gif\", \"png\", \"tata\"];\n  var menu = window.document.querySelector(\"#menu\");\n  var gallery = window.document.querySelector(\"#gallery\");\n  var divCollection = window.document.getElementsByTagName(\"div\");\n  var main = window.document.querySelector(\"#upload\");\n  var welcome = window.document.querySelector(\"#welcome\");\n  var color = window.document.querySelector(\"#color\");\n  var inputFile = window.document.querySelector(\"#file\");\n  var imagesInCache = JSON.parse(localStorage.getItem(namespace)); //fonctions\n\n  /**\r\n   * Define element and put a text in\r\n   * @param {String} tagName \r\n   * @param {String} text \r\n   * @param {String} target \r\n   */\n\n  function textInElement(tagName, text, target) {\n    var element = window.document.createElement(tagName);\n\n    if (typeof text !== \"undefined\") {\n      var myText = window.document.createTextNode(text);\n      element.appendChild(myText);\n\n      if (target instanceof HTMLElement) {\n        target.appendChild(element);\n      }\n    }\n\n    return element;\n  }\n  /**\r\n   * Permet d'insérer une image dans la gallery\r\n   * @param {Object} colorImage \r\n   * @param {String} nameImage \r\n   * @param {String} srcImage \r\n   * @param {Number} sizeImage \r\n   * @param {String} extensionImage \r\n   * @param {String} altImage \r\n   */\n\n\n  function pushImage(colorImage, nameImage, srcImage, sizeImage, extensionImage, altImage) {\n    images.push({\n      color: colorImage,\n      nom: nameImage,\n      src: srcImage,\n      size: sizeImage,\n      extension: extensionImage,\n      alt: altImage\n    });\n  }\n  /**\r\n   * Permet d'insérer un nouvel item dans le menu\r\n   * @param {String} nameItem \r\n   * @param {String} urlItem \r\n   */\n\n\n  function pushItem(nameItem, urlItem) {\n    menuItems.push({\n      nom: nameItem,\n      url: urlItem\n    });\n  }\n  /**\r\n   * valider extension\r\n   * @param {Object} image\r\n   * @return {Boolean}\r\n   */\n\n\n  function isExtensionValid(image) {\n    for (var key in acceptableExtensions) {\n      if (image.extension === acceptableExtensions[key]) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n  /**\r\n   *  Valider taille galerie\r\n   */\n\n\n  function isGalleryFull() {\n    if (images.length > maxFileGallery) {\n      return true;\n    }\n\n    return false;\n  }\n  /**\r\n   * append links in menu\r\n   */\n\n\n  function displayMenuItems() {\n    for (var key in menuItems) {\n      var myText = document.createTextNode(menuItems[key].nom);\n      var itemElementa = document.createElement(\"a\");\n      var itemElementli = document.createElement(\"li\");\n      itemElementli.setAttribute(\"class\", \"nav-item text-center\");\n      itemElementa.setAttribute(\"class\", \"nav-link\");\n      itemElementa.setAttribute(\"href\", menuItems[key].url);\n      itemElementa.appendChild(myText);\n      itemElementli.appendChild(itemElementa);\n      menu.appendChild(itemElementli);\n    }\n  }\n  /**\r\n   * IMAGES\r\n   * Append imgs in images\r\n   */\n\n\n  function displayImages() {\n    gallery.innerHTML = \"\";\n\n    for (var key in images) {\n      if (null === images[key].extension || isExtensionValid(images[key])) {\n        var imageElementDiv = document.createElement(\"div\");\n        var imageElement = document.createElement(\"img\");\n        imageElementDiv.appendChild(imageElement);\n        gallery.appendChild(imageElementDiv);\n        imageElement.setAttribute(\"alt\", images[key].alt);\n        imageElement.setAttribute(\"src\", images[key].src);\n        imageElement.setAttribute(\"class\", \"img-fluid\");\n        imageElement.setAttribute(\"style\", \"width:100%\");\n        imageElementDiv.setAttribute(\"class\", \"text-center bg-light col-6 col-lg-4 col-xl-2 border\");\n        registerEvent(imageElement);\n      } else {\n        console.log(\"format non accepté\");\n      }\n    }\n  }\n\n  function registerEvent(imageElement) {\n    imageElement.onclick = function (event) {\n      onClickImage(event, imageElement);\n    };\n  }\n\n  function displayColor(colorElement) {\n    for (var key in colorElement) {\n      var div = textInElement(\"div\", colorElement[key].html_code, color);\n      div.style.backgroundColor = colorElement[key].html_code;\n    }\n  }\n\n  function onClickImage(event, imageElement) {\n    color.innerHTML = \"\";\n    var preview = window.document.querySelector(\"#preview\");\n    preview.style.backgroundImage = \"url(\" + imageElement.getAttribute(\"src\") + \")\";\n    var btn = window.document.createElement(\"button\");\n    var text = window.document.createTextNode(\"Delete\");\n    btn.appendChild(text);\n    color.appendChild(btn);\n    btn.setAttribute(\"class\", \"btn btn-light btn-lg border\");\n    var imageFound = images.find(function (elem) {\n      return elem.src === imageElement.getAttribute(\"src\");\n    });\n    displayColor(imageFound.color.background_colors);\n    displayColor(imageFound.color.foreground_colors);\n    displayColor(imageFound.color.image_colors);\n    btn.addEventListener('click', function (event) {\n      onClickDelete(event, imageElement);\n    });\n  }\n\n  function onClickDelete(event, imageElement) {\n    var imageFound = images.find(function (elem) {\n      return elem.src === imageElement.getAttribute(\"src\");\n    });\n    var imageFoundKey = images.indexOf(imageFound);\n    images.splice(imageFoundKey, 1);\n    window.localStorage.setItem(namespace, JSON.stringify(images));\n    displayImages();\n    preview.style.backgroundImage = \"url(assets/images/default.png)\";\n    color.innerHTML = \"\";\n  }\n  /**\r\n   * TITRE: Message de bienvenue en javascript\r\n   */\n\n\n  function displayWelcome() {\n    var welcomeMessage = \"Bienvenue\";\n\n    if (lang !== \"fr\") {\n      welcomeMessage = \"Welcome\";\n    }\n\n    textInElement(\"h1\", welcomeMessage, welcome);\n  }\n  /**\r\n   * \r\n   * @param {*} event \r\n   * @param {*} uploadedFile \r\n   */\n\n\n  function onChangeFile(event, uploadedFile) {\n    var xhr = new XMLHttpRequest();\n    xhr.open(\"POST\", \"https://api.imagga.com/v2/colors\");\n\n    xhr.onload = function (event) {\n      if (200 === xhr.status) {\n        var reader = new FileReader();\n\n        reader.onload = function (event) {\n          var colorObject = JSON.parse(xhr.responseText);\n          pushImage(colorObject.result.colors, null, reader.result, null, null);\n          displayImages();\n          gallery.lastChild.firstChild.onclick();\n          window.localStorage.setItem(namespace, JSON.stringify(images));\n        };\n\n        reader.readAsDataURL(uploadedFile);\n        return;\n      }\n\n      alert(\"format non pris en charge\");\n    };\n\n    xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzUyM2FlZWI0MDM5NjUxNzpiOTk5YjcwM2VmMTU4OTFiYTFkZmU5ZTkxNGI1NDkxMw==\");\n    var body = new FormData();\n    body.append(\"image\", uploadedFile);\n    xhr.send(body);\n  }\n  /**\r\n   * Ajouter un bouton upload\r\n   */\n\n\n  function displayUploadBtn() {\n    var sendUrl = textInElement(\"form\", \"\", main);\n    var inputUrl = textInElement(\"input\", null, sendUrl);\n    var inputSubmit = textInElement(\"input\", \"submit\", sendUrl);\n    sendUrl.setAttribute(\"action\", \"\");\n    sendUrl.setAttribute(\"method\", \"GET\");\n    inputUrl.setAttribute(\"type\", \"url\");\n    inputUrl.setAttribute(\"required\", \"required\");\n    inputSubmit.setAttribute(\"type\", \"submit\");\n    inputSubmit.setAttribute(\"value\", \"send\");\n    inputSubmit.setAttribute(\"class\", \"btn btn-light btn-lg border\");\n    onSubmitForm(sendUrl);\n\n    if (!isGalleryFull()) {\n      var btn = textInElement(\"button\", \"upload\", main);\n      btn.setAttribute(\"class\", \"btn btn-light btn-lg border\");\n      btn.addEventListener(\"click\", function (event) {\n        inputFile.click();\n      });\n      inputFile.addEventListener(\"change\", function (event) {\n        onChangeFile(event, inputFile.files[0]);\n      });\n      return;\n    }\n\n    textInElement(\"b\", \"Gallery is full\", main);\n  }\n  /**\r\n   * \r\n   * @param {*} event \r\n   * @param {*} form \r\n   */\n\n\n  function onSubmitForm(sendUrl) {\n    sendUrl.addEventListener(\"submit\", function (event) {\n      event.preventDefault();\n      var xhr = new XMLHttpRequest();\n      xhr.open(\"GET\", \"https://api.imagga.com/v2/colors?image_url=\" + sendUrl.elements[0].value);\n      xhr.setRequestHeader(\"Authorization\", \"Basic YWNjXzUyM2FlZWI0MDM5NjUxNzpiOTk5YjcwM2VmMTU4OTFiYTFkZmU5ZTkxNGI1NDkxMw==\");\n\n      xhr.onload = function () {\n        var colorObject = JSON.parse(xhr.responseText);\n\n        if (200 === xhr.status) {\n          pushImage(colorObject.result.colors, sendUrl.elements[0].value, sendUrl.elements[0].value, null, null);\n          displayImages();\n          gallery.lastChild.firstChild.onclick();\n          window.localStorage.setItem(namespace, JSON.stringify(images));\n          return;\n        }\n\n        alert(\"format non pris en charge\");\n      };\n\n      xhr.send();\n    });\n  }\n  /**\r\n   * Ajouter liste extension dans footer après un titre h6\r\n   */\n\n\n  function displayFooter() {\n    var footer = window.document.querySelector(\"footer.bottom\");\n    var footerTitle = window.document.createElement(\"h6\");\n    var footerTilteText = window.document.createTextNode(\"extensions acceptées\");\n    var footerList = window.document.createElement(\"ul\");\n    footerList.setAttribute(\"class\", \"list-inline\");\n    footer.appendChild(footerTitle);\n    footer.appendChild(footerList);\n    footerTitle.appendChild(footerTilteText);\n\n    for (var key in acceptableExtensions) {\n      var footerListItem = window.document.createElement(\"li\");\n      footerList.appendChild(footerListItem);\n      var footerListItemText = window.document.createTextNode(acceptableExtensions[key]);\n      footerListItem.appendChild(footerListItemText);\n      footerListItem.setAttribute(\"class\", \"list-inline-item\");\n    }\n  }\n\n  if (null !== imagesInCache) {\n    images = imagesInCache;\n  }\n\n  pushItem(\"Accueil\", \"accueil.html\");\n  pushItem(\"Gallery\", \"gallery.html\");\n  pushItem(\"Contact\", \"contact.html\");\n  displayMenuItems();\n  displayImages();\n  displayWelcome();\n  displayUploadBtn();\n  displayFooter();\n})(); // Créer un élément-----------------------------------------------------------\n// var itemLink = document.createElement(\"a\");\n// AJOUTER DU CONTENU A ELEMENT----------------------------------------\n// très mauvaise façon très pratique---------------------------\n// Insecure injection\n// myElement.innerHTML= \"<a>efieufiefugifug</a>\"\n// Ajouter du texte (à un élément)\n// myElement.innerText -> pb de compatibilité\n// var myText= document.createTextNode(txt)\n// Element.appendChild(myText)\n// AFFICHER LA LANGUE (dans header)\n// var lang2 = document.createElement(\"p\");\n//     lang.appendChild(lang2);\n// var langTxt= document.createTextNode(lang);\n// itemElement.appendChild(myTextlangTxt);\n// if(\"fr\"===lang){\n//     console.log(\"Bonjour\");\n// }else if(\"en\"===lang){\n//     console.log(\"Hello\")\n// }else{\n// pushImage(\"sw1\", \"assets/images/sw1.png\", 22, \"png\", \"napoleon\");\n// pushImage(\"sw2\", \"assets/images/sw2.png\", 22, \"png\", \"napoleon\");\n// pushImage(\"sw3\", \"assets/images/sw3.png\", 22, \"jpg\", \"napoleon\");\n// pushImage(\"sw4\", \"assets/images/sw4.png\", 22, \"jpg\", \"napoleon\");\n// pushImage(\"sw5\", \"assets/images/sw5.png\", 22, \"jpg\", \"napoleon\");\n// pushImage(\"sw6\", \"assets/images/sw6.jpg\", 22, \"jpg\", \"napoleo\");\n// pushImage(\"sw7\", \"assets/images/sw7.png\", 22, \"jpg\", \"napoleon\");\n// // avoir le client\n// var xhr = new XMLHttpRequest();\n// // ouvrir une connexion\n// xhr.open(\"GET\", \"https://packagist.org/packages/symfony/symfony.json\");\n// // enregistrer des event handlers\n// xhr.onload = function(){\n// };\n// // custom headers\n// xhr.setRequestHeader(\"accept\", \"application/json\");\n// // envoyer la requete\n// xhr.send();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/index.scss?");

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/index.js ./src/index.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/index.js */\"./src/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/index.scss */\"./src/index.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js_./src/index.scss?");

/***/ })

/******/ });