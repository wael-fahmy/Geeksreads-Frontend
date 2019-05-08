var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    }
    else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    }
    else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};


//</editor-fold>

app.controller('ScreenshotReportController', function ($scope, $http) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
    }

    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };

    var results = [
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\005300a2-0095-00c5-005c-005e004a00b2.png",
        "timestamp": 1557271205326,
        "duration": 11512
    },
    {
        "description": "Editing username to be (Monaliza) and Routing to profile page to check it|Editing profile",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/793/xrjisiyo/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271224275,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/638/zftqmiyy/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271227994,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/849/ou5ywdy3/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271232772,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/461/3mh5vxeo/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271237033,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/664/34yku55n/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271239632,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271242941,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271243159,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/074/eaaofue3/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271243159,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271255307,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\004700f1-006e-00cd-0018-004800aa004a.png",
        "timestamp": 1557271217405,
        "duration": 39368
    },
    {
        "description": "Should Redirect to Edit Profile when he clicks edit button|Profile tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271257249,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/375/h4amu1zi/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271261178,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006e00e1-0074-0036-0094-00270014001d.png",
        "timestamp": 1557271257069,
        "duration": 7604
    },
    {
        "description": "Should Redirect to newsfeed page when he clicks Home button|NavBar tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/446/u3j31ads/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271269808,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00e50012-0065-0066-004a-00fb007d0076.png",
        "timestamp": 1557271264969,
        "duration": 8346
    },
    {
        "description": "Should Redirect to Profile when he clicks profile button|Profile tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/174/atgrgve3/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271277972,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271281150,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00de00a7-006b-007a-0057-00ab00fb005b.png",
        "timestamp": 1557271273623,
        "duration": 8795
    },
    {
        "description": "Should Redirect to sign in page when he clicks sign in button|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1557271282890,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/677/zp1zua3c/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271288340,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00bd0098-0047-00d2-009f-00ca00b00087.png",
        "timestamp": 1557271282708,
        "duration": 9760
    },
    {
        "description": "Should Sign out Checks to see the join in button if exist now|Logout tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/305/4pcigl5q/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271297555,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/418/ituvw5jx/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271301628,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/431/kgxspqsk/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271306023,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/876/ong3tfdt/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271309334,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/user_status/show - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1557271315659,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" HttpErrorResponse",
                "timestamp": 1557271315659,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/SignOut - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1557271315761,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b70081-0011-0020-0037-00e700cc0017.png",
        "timestamp": 1557271292775,
        "duration": 23008
    },
    {
        "description": "Signin form: EMAIL INPUT : aya.karmo95@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/user_status/show - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1557271316302,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/SignOut - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1557271316302,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00db002e-00b5-0082-0084-00c9001600d0.png",
        "timestamp": 1557271316129,
        "duration": 9474
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/164/th21gl0k/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271330172,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00220052-005d-0017-0056-003800d9006f.png",
        "timestamp": 1557271325991,
        "duration": 7792
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:45:60\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/888/hlpdqqyu/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271338167,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009200fb-0088-0024-002d-001900370079.png",
        "timestamp": 1557271334109,
        "duration": 7569
    },
    {
        "description": "Signin form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/320/r01yuqla/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271346462,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0074008f-00ec-00ee-006d-002800510077.png",
        "timestamp": 1557271341988,
        "duration": 8360
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/841/3ofdfcdh/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271355195,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0069000d-0080-009a-00db-005a005e0017.png",
        "timestamp": 1557271350771,
        "duration": 8311
    },
    {
        "description": "Signin form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:45:60\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/942/evkad4ek/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271363320,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003f005b-00f8-009f-0027-00dc009c0001.png",
        "timestamp": 1557271359453,
        "duration": 7189
    },
    {
        "description": "Signin form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/949/iixfg5ep/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271371156,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00de00b3-00b9-003c-00bc-00f3001700d9.png",
        "timestamp": 1557271367065,
        "duration": 7658
    },
    {
        "description": "Signin form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-invalid ng-dirty' to contain 'ng-valid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:58:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/707/rmzplkiv/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271379124,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00be003e-007f-00a8-0066-0096000500a1.png",
        "timestamp": 1557271375044,
        "duration": 7323
    },
    {
        "description": "Signin form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/343/ip3lvjzq/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271387723,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0083003e-00f6-0045-006f-00ff006b00d9.png",
        "timestamp": 1557271382715,
        "duration": 8745
    },
    {
        "description": "Signin form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/841/1nvjtsfn/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271399021,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003600ed-00b4-002b-00b5-00c2000600fb.png",
        "timestamp": 1557271391777,
        "duration": 12759
    },
    {
        "description": "Signin form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/271/rn2ujfsm/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271409619,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00fd004b-00f3-0098-00e2-005d002e00b6.png",
        "timestamp": 1557271404854,
        "duration": 9564
    },
    {
        "description": "Signin form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/653/0ltr3kue/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271419317,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009600da-0007-0081-00a1-005800ea004c.png",
        "timestamp": 1557271414886,
        "duration": 7556
    },
    {
        "description": "Signin form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/491/012yvxhw/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271426980,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008500c2-00a8-003a-0090-006900a600e9.png",
        "timestamp": 1557271422745,
        "duration": 7869
    },
    {
        "description": "Signin form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/892/iw2sz0tk/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271435308,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00db0039-0069-0064-0028-00fe005400d0.png",
        "timestamp": 1557271430965,
        "duration": 10093
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271463644,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0012000d-004b-004d-0030-00e100510093.png",
        "timestamp": 1557271441483,
        "duration": 22967
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/452/fvy05pd4/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271472390,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271475814,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00bd000b-004c-0008-007f-006400860008.png",
        "timestamp": 1557271464795,
        "duration": 11686
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/640/q5ojeobk/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271483756,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271487238,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b200e3-00e1-0069-0086-0004006e0002.png",
        "timestamp": 1557271476783,
        "duration": 10832
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signup\\signup.e2e-spec.ts:63:60\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/121/kjvdy5gd/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271495665,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271498770,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006a0064-00fe-0077-00c4-006300db0032.png",
        "timestamp": 1557271487942,
        "duration": 11187
    },
    {
        "description": "Sign-up form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271510927,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b00021-00af-0059-007d-00be00e70051.png",
        "timestamp": 1557271499435,
        "duration": 11897
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/618/rq013inn/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271518187,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271521585,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003c00c0-00f4-002a-001e-002d00fb0005.png",
        "timestamp": 1557271511682,
        "duration": 10308
    },
    {
        "description": "Sign-up form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/325/cmq4xirb/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271528975,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271532237,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00c3006b-00c9-00d2-008d-001600ae0017.png",
        "timestamp": 1557271522383,
        "duration": 10257
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/764/hwvtohtk/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271541386,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271545398,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a60050-00cb-00f3-0017-009a00bc0017.png",
        "timestamp": 1557271533029,
        "duration": 13055
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-invalid ng-dirty' to contain 'ng-valid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signup\\signup.e2e-spec.ts:76:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/764/xcln1zr4/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271556256,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271559889,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008500ec-00b5-00fd-00c0-0011002a0033.png",
        "timestamp": 1557271546451,
        "duration": 13752
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/043/ozogryty/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271568490,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271573010,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00880083-006e-00c4-0054-000a00b700f1.png",
        "timestamp": 1557271560581,
        "duration": 12705
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/286/qyinakrh/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271580147,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271584446,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006d0005-004d-005f-0034-002f00b70082.png",
        "timestamp": 1557271573638,
        "duration": 11264
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/927/v1hp0eui/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271594697,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271599187,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003b0099-001f-0037-009a-009800f900de.png",
        "timestamp": 1557271585296,
        "duration": 14356
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/992/2opq0zns/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271610070,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271614038,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00f300e9-008e-00a7-0002-0097004000e2.png",
        "timestamp": 1557271600021,
        "duration": 14283
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/671/or2enw5z/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271621880,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271625282,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00fb004b-00ea-00f7-0090-00890022003d.png",
        "timestamp": 1557271614602,
        "duration": 10938
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/362/fuqz2r5w/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271631813,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271635417,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003a00b6-00f4-0027-00f0-00d9008600ac.png",
        "timestamp": 1557271625872,
        "duration": 9942
    },
    {
        "description": "Sign-up form: NAME INPUT : aya   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-invalid ng-dirty' to contain 'ng-valid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signup\\signup.e2e-spec.ts:100:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/051/u4qn4azw/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271642433,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271645773,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006000f7-007c-00b4-0047-000d004400a0.png",
        "timestamp": 1557271636166,
        "duration": 10187
    },
    {
        "description": "Sign-up form: NAME INPUT : aya hossam   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/152/rsroumgq/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271658615,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271664031,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0023001c-0026-004a-00d1-008300d600f7.png",
        "timestamp": 1557271646684,
        "duration": 18133
    },
    {
        "description": "Sign-up form: NAME INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/288/zg31jj0b/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271674723,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271678165,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00430051-00aa-0031-0077-00e0004a0043.png",
        "timestamp": 1557271665230,
        "duration": 13292
    },
    {
        "description": "Sign-up form: NAME INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/668/oy2lpzp2/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271684740,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271688108,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00c10075-00b5-006c-001b-00f6008600ea.png",
        "timestamp": 1557271678840,
        "duration": 9530
    },
    {
        "description": "Sign-up form: NAME INPUT : 1%s   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 9312,
        "browser": {
            "name": "chrome",
            "version": "74.0.3729.131"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 165635 WebSocket connection to 'ws://localhost:4200/sockjs-node/394/pq15ei5b/websocket' failed: WebSocket is closed before the connection is established.",
                "timestamp": 1557271694700,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1557271697894,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008e000c-00fc-00d3-00e7-0076000300ba.png",
        "timestamp": 1557271688739,
        "duration": 9443
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    }
                    else
                    {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.sortSpecs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.sortSpecs();
    }


});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

