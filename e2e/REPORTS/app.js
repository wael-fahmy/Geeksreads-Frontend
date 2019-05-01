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
        "instanceId": 14876,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\00380033-0091-009d-00d6-00d300fd0061.png",
        "timestamp": 1555476746280,
        "duration": 7165
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"aya.karmo95@gmail.com\" and \"a1@aya\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14876,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555476758098,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009b00cd-0028-00f3-00d9-00d5003f00c7.png",
        "timestamp": 1555476754176,
        "duration": 4567
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14876,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555476762729,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003100b9-006d-0090-001c-00c9007f0058.png",
        "timestamp": 1555476759163,
        "duration": 4304
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 14876,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555476768501,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00de00e8-0080-0073-0003-0050002900bb.png",
        "timestamp": 1555476763806,
        "duration": 5453
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5716,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\004b006d-00e3-00d1-00ca-0036003e00a9.png",
        "timestamp": 1555477665529,
        "duration": 6898
    },
    {
        "description": "testing Navbar|Navbar",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5716,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, *[id=\"home-navbar\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, *[id=\"home-navbar\"])\n    at elementArrayFinder.getWebElements.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:831:22)\n    at checkNavbarTexts (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:18:35)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:12:7\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"testing Navbar\") in control flow\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:10:3)\n    at addSpecsToSuite (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:4:1)\n    at Module._compile (module.js:652:30)\n    at Module.m._compile (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:439:23)\n    at Module._extensions..js (module.js:663:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:442:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'home'\nError: Cannot match any routes. URL Segment: 'home'\n    at ApplyRedirects.push../node_modules/@angular/router/fesm5/router.js.ApplyRedirects.noMatchError (http://localhost:4200/vendor.js:142580:16)\n    at CatchSubscriber.selector (http://localhost:4200/vendor.js:142561:29)\n    at CatchSubscriber.push../node_modules/rxjs/_esm5/internal/operators/catchError.js.CatchSubscriber.error (http://localhost:4200/vendor.js:154632:31)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber._error (http://localhost:4200/vendor.js:151371:26)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber.error (http://localhost:4200/vendor.js:151351:18)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber._error (http://localhost:4200/vendor.js:151371:26)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber.error (http://localhost:4200/vendor.js:151351:18)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber._error (http://localhost:4200/vendor.js:151371:26)\n    at MapSubscriber.push../node_modules/rxjs/_esm5/internal/Subscriber.js.Subscriber.error (http://localhost:4200/vendor.js:151351:18)\n    at TapSubscriber.push../node_modules/rxjs/_esm5/internal/operators/tap.js.TapSubscriber._error (http://localhost:4200/vendor.js:159365:26)\n    at resolvePromise (http://localhost:4200/polyfills.js:3189:31)\n    at resolvePromise (http://localhost:4200/polyfills.js:3146:17)\n    at http://localhost:4200/polyfills.js:3250:17\n    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:2781:31)\n    at Object.onInvokeTask (http://localhost:4200/vendor.js:82309:33)\n    at ZoneDelegate.push../node_modules/zone.js/dist/zone.js.ZoneDelegate.invokeTask (http://localhost:4200/polyfills.js:2780:60)\n    at Zone.push../node_modules/zone.js/dist/zone.js.Zone.runTask (http://localhost:4200/polyfills.js:2553:47)\n    at drainMicroTaskQueue (http://localhost:4200/polyfills.js:2959:35)",
                "timestamp": 1555477675711,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\007b0048-006a-0056-006c-00ab00d100d5.png",
        "timestamp": 1555477673243,
        "duration": 4669
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"aya.karmo95@gmail.com\" and \"a1@aya\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5716,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555477682564,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00eb006f-00c5-00be-000a-0071002500fe.png",
        "timestamp": 1555477678365,
        "duration": 4879
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5716,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555477689281,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006c00fa-00c7-0035-00c9-001100f20019.png",
        "timestamp": 1555477683647,
        "duration": 6619
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 5716,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555477695849,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00ed00aa-0020-0067-0092-00d90026001a.png",
        "timestamp": 1555477690686,
        "duration": 5836
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17144,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\003900d6-00d6-00c5-0067-00e6003700b9.png",
        "timestamp": 1555478866560,
        "duration": 7435
    },
    {
        "description": "testing Navbar|Navbar",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17144,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, nav-link)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, nav-link)\n    at elementArrayFinder.getWebElements.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getText] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getText] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:831:22)\n    at checkNavbarTexts (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:23:33)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:18:7\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run it(\"testing Navbar\") in control flow\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:16:3)\n    at addSpecsToSuite (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\navbar.e2e-spec.ts:4:1)\n    at Module._compile (module.js:652:30)\n    at Module.m._compile (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:439:23)\n    at Module._extensions..js (module.js:663:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:442:12)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1555478881961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" HttpErrorResponse",
                "timestamp": 1555478881961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1555478881961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" HttpErrorResponse",
                "timestamp": 1555478881961,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1555478882997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1555478882997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" HttpErrorResponse",
                "timestamp": 1555478882997,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/vendor.js 80742:18 \"ERROR\" HttpErrorResponse",
                "timestamp": 1555478882997,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009d0023-009f-0076-00c2-009700d20039.png",
        "timestamp": 1555478874802,
        "duration": 8218
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"aya.karmo95@gmail.com\" and \"a1@aya\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17144,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555478887380,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00860082-00fb-00dd-0005-0012006f00fe.png",
        "timestamp": 1555478883327,
        "duration": 5251
    },
    {
        "description": "Sign-in form with EMAIL and PAsswrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17144,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555478893059,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00cb006a-00d2-006c-0025-000300830005.png",
        "timestamp": 1555478888937,
        "duration": 4994
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17144,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555478899351,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\001c0093-00b3-0010-0062-00e1007c00e8.png",
        "timestamp": 1555478894281,
        "duration": 5936
    },
    {
        "description": "should display welcome message|workspace-project App",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Failed: page.getTitleText is not a function"
        ],
        "trace": [
            "TypeError: page.getTitleText is not a function\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\app.e2e-spec.ts:13:17)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"should display welcome message\") in control flow\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\app.e2e-spec.ts:11:3)\n    at addSpecsToSuite (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\app.e2e-spec.ts:4:1)\n    at Module._compile (module.js:652:30)\n    at Module.m._compile (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:439:23)\n    at Module._extensions..js (module.js:663:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:442:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "Screenshots\\003700b3-00cd-0072-001b-004400940030.png",
        "timestamp": 1555492494250,
        "duration": 16
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\00a700cf-00a8-002a-006c-0060005200ed.png",
        "timestamp": 1555492496201,
        "duration": 8360
    },
    {
        "description": "Signin form: EMAIL INPUT : aya.karmo95@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492510782,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\004800e1-0078-00c3-00c2-00ac00570045.png",
        "timestamp": 1555492505252,
        "duration": 6169
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492517148,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\001700ea-00f1-0081-00f0-00e900a40039.png",
        "timestamp": 1555492511749,
        "duration": 5993
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:82:60\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492523371,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009800e1-00bc-0022-009c-004b00d100ed.png",
        "timestamp": 1555492518070,
        "duration": 5854
    },
    {
        "description": "Signin form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492529744,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00c0008e-0029-00c8-00f1-000b00ff001e.png",
        "timestamp": 1555492524277,
        "duration": 5870
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492536056,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00d6004c-008a-007f-00c4-00df0011006c.png",
        "timestamp": 1555492530577,
        "duration": 6000
    },
    {
        "description": "Signin form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492542350,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a5009b-0033-006b-0050-002000a300de.png",
        "timestamp": 1555492536945,
        "duration": 5878
    },
    {
        "description": "Signin form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492548155,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\005500b7-00a4-001d-0063-00d400020094.png",
        "timestamp": 1555492543170,
        "duration": 5419
    },
    {
        "description": "Signin form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492554328,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00420009-009d-0090-006e-003f0062004a.png",
        "timestamp": 1555492548945,
        "duration": 5821
    },
    {
        "description": "Signin form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492560543,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00eb0092-00d2-0034-0060-00e1009d0051.png",
        "timestamp": 1555492555141,
        "duration": 5929
    },
    {
        "description": "Signin form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492568142,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006d00c3-00c3-007c-009d-006600da00db.png",
        "timestamp": 1555492561530,
        "duration": 7038
    },
    {
        "description": "Signin form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492574633,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\002300e3-00c1-0072-0027-00eb00040003.png",
        "timestamp": 1555492569481,
        "duration": 5817
    },
    {
        "description": "Signin form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492580774,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\001a0040-00e2-0018-00cd-007a001400fc.png",
        "timestamp": 1555492575653,
        "duration": 5487
    },
    {
        "description": "Signin form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492586585,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\001e002d-0005-006a-00a9-00d1003800ed.png",
        "timestamp": 1555492581535,
        "duration": 5500
    },
    {
        "description": "Signin form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492592557,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003e0069-00ee-005c-00a1-00cd00b100b5.png",
        "timestamp": 1555492587365,
        "duration": 5571
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492600275,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00d0000a-0029-004f-0008-00d4009d008d.png",
        "timestamp": 1555492593303,
        "duration": 7734
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492608708,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b90004-00f1-00a4-00d7-008f001500f8.png",
        "timestamp": 1555492601406,
        "duration": 7777
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492617315,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\005100f8-0040-00d4-002c-00ba00ce0061.png",
        "timestamp": 1555492609513,
        "duration": 8278
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492625529,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00710029-00fc-005e-0004-00cd002d0062.png",
        "timestamp": 1555492618096,
        "duration": 7898
    },
    {
        "description": "Sign-up form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492632969,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00960019-0023-0041-00a4-002c009f0080.png",
        "timestamp": 1555492626320,
        "duration": 7150
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492640988,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0029005f-00d4-0095-004a-006400240025.png",
        "timestamp": 1555492633819,
        "duration": 7566
    },
    {
        "description": "Sign-up form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492648712,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0078000b-0056-004a-00da-00f7005d0012.png",
        "timestamp": 1555492641711,
        "duration": 7432
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492657035,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00090066-00ac-0015-001f-003600d70058.png",
        "timestamp": 1555492649569,
        "duration": 7934
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492664463,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\005e0005-006e-0013-00fe-005300e60068.png",
        "timestamp": 1555492657843,
        "duration": 7011
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492672787,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\007e000a-003c-0019-00fb-00af00c600b5.png",
        "timestamp": 1555492665187,
        "duration": 8002
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492680632,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009a0026-00aa-0054-009b-001f000c00e2.png",
        "timestamp": 1555492673549,
        "duration": 7567
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492698061,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00f100c2-00bf-0067-0063-001800a900db.png",
        "timestamp": 1555492681457,
        "duration": 17035
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492706978,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00310000-00c2-0054-0051-000200c10084.png",
        "timestamp": 1555492698859,
        "duration": 8510
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492714467,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00ff008e-00c0-00fa-0054-00aa00f300b1.png",
        "timestamp": 1555492707738,
        "duration": 7198
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492721976,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00520009-0025-00eb-0006-006200ba00a5.png",
        "timestamp": 1555492715289,
        "duration": 7064
    },
    {
        "description": "Sign-up form: NAME INPUT : aya   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492730504,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00730040-00d0-0096-0096-0072000900f6.png",
        "timestamp": 1555492722715,
        "duration": 8256
    },
    {
        "description": "Sign-up form: NAME INPUT : aya hossam   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492737692,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\005200d3-00c4-00d6-0062-005200bb0086.png",
        "timestamp": 1555492731306,
        "duration": 6911
    },
    {
        "description": "Sign-up form: NAME INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492745547,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00d3000c-0072-0027-00ae-000400da00c2.png",
        "timestamp": 1555492738593,
        "duration": 7420
    },
    {
        "description": "Sign-up form: NAME INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492753211,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00830065-0013-002c-00ad-0059007a0063.png",
        "timestamp": 1555492746478,
        "duration": 7109
    },
    {
        "description": "Sign-up form: NAME INPUT : 1%s   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 15208,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1555492760685,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0044001e-0057-00ba-00a9-00c200ec00d6.png",
        "timestamp": 1555492753905,
        "duration": 7185
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21212,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\000e009e-0035-00d2-00ad-000a000f005d.png",
        "timestamp": 1556545314136,
        "duration": 8349
    },
    {
        "description": "Should Redirect to Edit Profile|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21212,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1556545328403,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\000b003e-00ef-00da-00f5-006400220013.png",
        "timestamp": 1556545324396,
        "duration": 5707
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21344,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\0025009c-0068-00b7-003d-00ee00da00a9.png",
        "timestamp": 1556545407524,
        "duration": 7106
    },
    {
        "description": "Should Redirect to Edit Profile|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 21344,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1556545420718,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00890016-00be-006d-005b-00bf004e00c2.png",
        "timestamp": 1556545416497,
        "duration": 6882
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\001b0035-0050-00e4-006f-00c1001700a6.png",
        "timestamp": 1556546183218,
        "duration": 10902
    },
    {
        "description": "Should Redirect to Edit Profile|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1556546200155,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00690049-00dd-0030-001b-006700240025.png",
        "timestamp": 1556546194855,
        "duration": 8861
    },
    {
        "description": "Signin form: EMAIL INPUT : aya.karmo95@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546207903,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00e4003c-0062-00a2-0022-00e3008000c7.png",
        "timestamp": 1556546203998,
        "duration": 4666
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546213750,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0096009b-0070-004d-006f-00510096005f.png",
        "timestamp": 1556546208962,
        "duration": 5322
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:82:60\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546221863,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00fe00a5-0035-00af-0028-00c80098008b.png",
        "timestamp": 1556546214583,
        "duration": 7757
    },
    {
        "description": "Signin form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546226968,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b3007e-007c-00c2-0001-000700ee0049.png",
        "timestamp": 1556546222673,
        "duration": 4779
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546231550,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\000a00d7-00e1-004d-006a-00ad009f001f.png",
        "timestamp": 1556546227771,
        "duration": 4139
    },
    {
        "description": "Signin form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546236477,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0015009d-0021-0063-005c-006f005a00de.png",
        "timestamp": 1556546232209,
        "duration": 4632
    },
    {
        "description": "Signin form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546240817,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009300be-0024-0000-0033-0086006600d2.png",
        "timestamp": 1556546237183,
        "duration": 4161
    },
    {
        "description": "Signin form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546245582,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00fe0047-002a-00b8-008b-00e5009c00ac.png",
        "timestamp": 1556546241680,
        "duration": 4331
    },
    {
        "description": "Signin form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546251505,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009e0071-0098-0022-0022-008700db0085.png",
        "timestamp": 1556546246410,
        "duration": 5592
    },
    {
        "description": "Signin form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546256872,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\002200b7-00db-005a-00a4-00f3003300bc.png",
        "timestamp": 1556546252379,
        "duration": 4991
    },
    {
        "description": "Signin form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546262258,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\000800d7-004d-00cb-0013-00a3009b0063.png",
        "timestamp": 1556546257707,
        "duration": 5108
    },
    {
        "description": "Signin form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546269277,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\002800c5-008c-009d-00b7-004a005100a1.png",
        "timestamp": 1556546263200,
        "duration": 6487
    },
    {
        "description": "Signin form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546275867,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008c002c-00e9-00d0-00af-00ff00530000.png",
        "timestamp": 1556546270092,
        "duration": 6150
    },
    {
        "description": "Signin form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 22044,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:106:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556546280199,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0054000e-00c0-00fa-0080-007800fd003f.png",
        "timestamp": 1556546276536,
        "duration": 4097
    },
    {
        "description": "should have a Title|workspace-project App",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "Screenshots\\000a005e-00a2-0094-00eb-001e004f0036.png",
        "timestamp": 1556599706008,
        "duration": 10080
    },
    {
        "description": "Should Redirect to newsfeed page when he clicks Home button|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1556599725518,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.2697994f5f5327a5e6bf.js 0:59649 \"ERROR\" e",
                "timestamp": 1556599725519,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1556599725722,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.2697994f5f5327a5e6bf.js 0:59649 \"ERROR\" e",
                "timestamp": 1556599725723,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1556599727455,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:3000/api/newsfeed - Failed to load resource: net::ERR_CONNECTION_REFUSED",
                "timestamp": 1556599727455,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.2697994f5f5327a5e6bf.js 0:59649 \"ERROR\" e",
                "timestamp": 1556599727455,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.2697994f5f5327a5e6bf.js 0:59649 \"ERROR\" e",
                "timestamp": 1556599727456,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008e0011-001c-00bc-003a-00eb00ef00fe.png",
        "timestamp": 1556599718287,
        "duration": 9184
    },
    {
        "description": "Should Redirect to Edit Profile when he clicks edit button|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1556599731793,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008d0059-0079-00a2-00fa-002e00810043.png",
        "timestamp": 1556599727758,
        "duration": 5523
    },
    {
        "description": "Signin form: EMAIL INPUT : aya.karmo95@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599737496,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b9009e-0016-007f-00f3-007800ab007b.png",
        "timestamp": 1556599733617,
        "duration": 4345
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599742092,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003f00bd-00e4-001f-002d-005e002d00df.png",
        "timestamp": 1556599738322,
        "duration": 4275
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599746892,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\008d00bf-00ec-006e-0040-000a00a1008a.png",
        "timestamp": 1556599743016,
        "duration": 4349
    },
    {
        "description": "Signin form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599751404,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00c400d3-009d-0085-00ff-001400b60045.png",
        "timestamp": 1556599747695,
        "duration": 4128
    },
    {
        "description": "Signin form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599756150,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\007200a6-0053-0025-0087-00f7008000ac.png",
        "timestamp": 1556599752312,
        "duration": 4269
    },
    {
        "description": "Signin form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599760799,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00bb0085-00a4-00bf-00f9-007300d5002a.png",
        "timestamp": 1556599756888,
        "duration": 4347
    },
    {
        "description": "Signin form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599765452,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00e700a3-0066-0026-0005-001500530001.png",
        "timestamp": 1556599761753,
        "duration": 4095
    },
    {
        "description": "Signin form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599769987,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00450030-00d0-00e9-00c7-008c00eb009b.png",
        "timestamp": 1556599766157,
        "duration": 4246
    },
    {
        "description": "Signin form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599775096,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a50027-0032-0077-0095-00ba005b0060.png",
        "timestamp": 1556599770763,
        "duration": 4782
    },
    {
        "description": "Signin form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599780106,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00780046-0018-00bf-00b3-0041006d0023.png",
        "timestamp": 1556599775865,
        "duration": 4773
    },
    {
        "description": "Signin form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:69:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599785116,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0050008f-00b6-0041-004f-00230086001b.png",
        "timestamp": 1556599780957,
        "duration": 4478
    },
    {
        "description": "Signin form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:69:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599791047,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003c00c7-00ab-00ac-001e-00ba00670082.png",
        "timestamp": 1556599785755,
        "duration": 5811
    },
    {
        "description": "Signin form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:69:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599796258,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00c00061-0057-0092-0048-00a0009d000b.png",
        "timestamp": 1556599791935,
        "duration": 4730
    },
    {
        "description": "Signin form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored ng-untouched ng-dirty ng-valid' to contain 'ng-invalid'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\signin\\login.e2e-spec.ts:69:58\n    at elementArrayFinder_.then (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\protractor\\built\\element.js:804:32)\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599800726,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00dc0033-0026-00d7-0021-00ac00f900fb.png",
        "timestamp": 1556599797035,
        "duration": 4004
    },
    {
        "description": "Sign-up form with USername, EMAIL and Passwrod : \"ayahossam_95@hotmail.com\" and \"tmam123\"   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599807217,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b800e9-007c-00ee-003a-00c700ef001b.png",
        "timestamp": 1556599801394,
        "duration": 6622
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail.com   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599813726,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a0006f-00f0-0036-00d7-00670047001e.png",
        "timestamp": 1556599808342,
        "duration": 5871
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@asd.com.eg   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599819533,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0082007d-00d3-00e4-0037-009c00d50072.png",
        "timestamp": 1556599814543,
        "duration": 5528
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@gmail   SHOULD BE : INVALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599825892,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00220073-00a9-0040-005d-00bc0095008c.png",
        "timestamp": 1556599820410,
        "duration": 5957
    },
    {
        "description": "Sign-up form: EMAIL INPUT : ayagmail   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599831903,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009700fb-0080-0030-0097-008000cd0010.png",
        "timestamp": 1556599826700,
        "duration": 5649
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya@   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599838306,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b8009f-006a-00c3-009d-0001001100e0.png",
        "timestamp": 1556599832660,
        "duration": 6120
    },
    {
        "description": "Sign-up form: EMAIL INPUT : @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599844082,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009a00cd-00df-0098-0050-00ed0004008f.png",
        "timestamp": 1556599839162,
        "duration": 5374
    },
    {
        "description": "Sign-up form: EMAIL INPUT : aya @gmail.com   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599850129,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00b6008b-006f-001a-0040-00c2003c0094.png",
        "timestamp": 1556599844844,
        "duration": 5821
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : A123   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599856475,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\005200a1-002d-009a-0087-004f00ee00e8.png",
        "timestamp": 1556599851005,
        "duration": 5819
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : Aya123   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599862221,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00d100f1-00b5-00bb-002d-0050009a00c3.png",
        "timestamp": 1556599857176,
        "duration": 5466
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a1@aya   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599868633,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00e2005e-00e1-00ab-0085-0069001400b6.png",
        "timestamp": 1556599863129,
        "duration": 5983
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599874478,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00f500be-0006-007a-003d-003000ca00e8.png",
        "timestamp": 1556599869441,
        "duration": 5432
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : aya   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599880410,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0038000c-0005-0097-00d7-007c001d0004.png",
        "timestamp": 1556599875205,
        "duration": 5627
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599886650,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\003700ab-008e-0094-00c1-00ed00e800f2.png",
        "timestamp": 1556599881313,
        "duration": 5654
    },
    {
        "description": "Sign-up form: PASSWORD INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599892406,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006b0049-0080-00a8-002a-0000000700b3.png",
        "timestamp": 1556599887303,
        "duration": 5518
    },
    {
        "description": "Sign-up form: NAME INPUT : aya   SHOULD BE : VALID|Login tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
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
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599898785,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\009e00dc-00b6-0050-0033-00d0004e007a.png",
        "timestamp": 1556599893231,
        "duration": 6007
    },
    {
        "description": "Sign-up form: NAME INPUT : aya hossam   SHOULD BE : VALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599904522,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00580099-009d-00c9-0049-00af001a0014.png",
        "timestamp": 1556599899611,
        "duration": 5376
    },
    {
        "description": "Sign-up form: NAME INPUT : 123   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599910697,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00f00039-007a-00ad-004f-00d7000d00b0.png",
        "timestamp": 1556599905324,
        "duration": 5774
    },
    {
        "description": "Sign-up form: NAME INPUT : a@a   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599916807,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\0056003b-00f8-00de-00f3-004a003c008d.png",
        "timestamp": 1556599911431,
        "duration": 5738
    },
    {
        "description": "Sign-up form: NAME INPUT : 1%s   SHOULD BE : INVALID|Login tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 13764,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "http://localhost:4200/vendor.js 91052:16 \"\\n    It looks like you're using ngModel on the same form field as formControl. \\n    Support for using the ngModel input property and ngModelChange event with \\n    reactive form directives has been deprecated in Angular v6 and will be removed \\n    in Angular v7.\\n    \\n    For more information on this, see our API docs here:\\n    https://angular.io/api/forms/FormControlDirective#use-with-ngmodel\\n    \"",
                "timestamp": 1556599922454,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\006f00ff-00a1-00e8-009a-0054002a0021.png",
        "timestamp": 1556599917503,
        "duration": 5303
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

