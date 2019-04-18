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

