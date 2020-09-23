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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/assets/js/idb.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/assets/js/idb.js":
/*!*********************************!*\
  !*** ./public/assets/js/idb.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//Database Connection Variable\r\nlet db;\r\n\r\n//Establish Connection to IndexedDB database called 'budget_tracker', version 1\r\nconst request = indexedDB.open('budget_tracker', 1);\r\n\r\n// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)\r\nrequest.onupgradeneeded = function (event) {\r\n    // save a reference to the database \r\n    const db = event.target.result;\r\n    // create an object store (table) called `new_transaction`, set it to have an auto incrementing primary key of sorts \r\n    db.createObjectStore('new_transaction', { autoIncrement: true });\r\n};\r\n\r\n// upon a successful \r\nrequest.onsuccess = function (event) {\r\n    // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable\r\n    db = event.target.result;\r\n\r\n    // check if app is online, if yes run uploadTransaction() function to send all local db data to api\r\n    if (navigator.onLine) {\r\n        // we haven't created this yet, but we will soon, so let's comment it out for now\r\n        // uploadTransaction();\r\n    }\r\n};\r\n\r\nrequest.onerror = function (event) {\r\n    // log error here\r\n    console.log(event.target.errorCode);\r\n};\r\n\r\n// This function will be executed if we attempt to submit a new transaction and there's no internet connection\r\nfunction saveRecord(record) {\r\n    // open a new transaction with the database with read and write permissions \r\n    const transaction = db.transaction(['new_transaction'], 'readwrite');\r\n\r\n    // access the object store for `new_transaction`\r\n    const transactionObjectStore = transaction.objectStore('new_transaction');\r\n\r\n    // add record to your store with add method\r\n    transactionObjectStore.add(record);\r\n}\r\n\r\nfunction uploadTransaction() {\r\n    // open a transaction on your db\r\n    const transaction = db.transaction(['new_transaction'], 'readwrite');\r\n\r\n    // access your object store\r\n    const transactionObjectStore = transaction.objectStore('new_transaction');\r\n\r\n    // get all records from store and set to a variable\r\n    const getAll = transactionObjectStore.getAll();\r\n\r\n    // upon a successful .getAll() execution, run this function\r\n    getAll.onsuccess = function () {\r\n        // if there was data in indexedDb's store, let's send it to the api server\r\n        if (getAll.result.length > 0) {\r\n            fetch('/api/transaction', {\r\n                method: 'POST',\r\n                body: JSON.stringify(getAll.result),\r\n                headers: {\r\n                    Accept: 'application/json, text/plain, */*',\r\n                    'Content-Type': 'application/json'\r\n                }\r\n            })\r\n                .then(response => response.json())\r\n                .then(serverResponse => {\r\n                    if (serverResponse.message) {\r\n                        throw new Error(serverResponse);\r\n                    }\r\n                    // open one more transaction\r\n                    const transaction = db.transaction(['new_transaction'], 'readwrite');\r\n                    // access the new_transaction object store\r\n                    const transactionObjectStore = transaction.objectStore('new_transaction');\r\n                    // clear all items in your store\r\n                    transactionObjectStore.clear();\r\n\r\n                    alert('All saved transactions have been submitted!');\r\n                })\r\n                .catch(err => {\r\n                    console.log(err);\r\n                });\r\n        }\r\n    };\r\n}\r\n\r\n// listen for app coming back online\r\nwindow.addEventListener('online', uploadTransaction);\n\n//# sourceURL=webpack:///./public/assets/js/idb.js?");

/***/ })

/******/ });