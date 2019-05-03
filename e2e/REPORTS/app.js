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
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected [ Entry({ level: WARNING, message: 'deprecation - HTML Imports is deprecated and will be removed in M73, around March 2019. Please use ES modules instead. See https://www.chromestatus.com/features/5144752345317376 for more details.', timestamp: 1556713388452, type: '' }), Entry({ level: SEVERE, message: 'ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)', timestamp: 1556713399881, type: '' }), Entry({ level: SEVERE, message: 'ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_', timestamp: 1556713399882, type: '' }) ] not to contain <jasmine.objectContaining(Object({ level: SEVERE }))>."
        ],
        "trace": [
            "Error: Failed expectation\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\approot\\app.e2e-spec.ts:19:22)\n    at step (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\tslib\\tslib.js:133:27)\n    at Object.next (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\tslib\\tslib.js:114:57)\n    at fulfilled (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\tslib\\tslib.js:104:62)\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "Screenshots\\00fa00c8-005f-00cc-00a6-002700c200e8.png",
        "timestamp": 1556713392356,
        "duration": 8291
    },
    {
        "description": "Rout to books page and check the book image|BookShelves tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Failed: protractor_1.by.class is not a function",
            "Failed: protractor_2.by.class is not a function"
        ],
        "trace": [
            "TypeError: protractor_1.by.class is not a function\n    at BookShelves.getBook (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.po.ts:9:32)\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:19:21)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\nFrom: Task: Run beforeEach in control flow\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:16:5)\n    at addSpecsToSuite (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:8:1)\n    at Module._compile (module.js:652:30)\n    at Module.m._compile (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:439:23)\n    at Module._extensions..js (module.js:663:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:442:12)",
            "TypeError: protractor_2.by.class is not a function\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:33:36)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:95:18)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2974:25)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\nFrom: Task: Run it(\"Rout to books page and check the book image\") in control flow\n    at UserContext.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at Function.next.fail (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4274:9)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:27:5)\n    at addSpecsToSuite (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\jasmine\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)\n    at Object.<anonymous> (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\books\\bookShelves.e2e-spec.ts:8:1)\n    at Module._compile (module.js:652:30)\n    at Module.m._compile (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:439:23)\n    at Module._extensions..js (module.js:663:10)\n    at Object.require.extensions.(anonymous function) [as .ts] (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\ts-node\\src\\index.ts:442:12)"
        ],
        "browserLogs": [],
        "screenShotFile": "Screenshots\\00c300c0-0080-00ed-00b8-0069007c0027.png",
        "timestamp": 1556713401908,
        "duration": 12
    },
    {
        "description": "Should Redirect to Edit Profile when he clicks edit button|Profile tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713408231,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713408234,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00e40008-002d-00ae-0033-00a0002f002d.png",
        "timestamp": 1556713402388,
        "duration": 9557
    },
    {
        "description": "Should Redirect to homepage when he clicks GeeksReads LOGO |NavBar tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713415000,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713415003,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713417878,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713417881,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713420929,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713420931,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00d6000c-0044-0003-00bf-0006006a0078.png",
        "timestamp": 1556713412293,
        "duration": 8993
    },
    {
        "description": "Should Redirect to newsfeed page when he clicks Home button|NavBar tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713425632,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713425634,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713426936,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a300a7-0048-002d-0070-002200fe0028.png",
        "timestamp": 1556713421734,
        "duration": 5536
    },
    {
        "description": "Should Redirect to Profile when he clicks profile button|Profile tests",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713431498,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713431501,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://localhost:4200/null - Failed to load resource: the server responded with a status of 404 (Not Found)",
                "timestamp": 1556713431630,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/GetUserReadDetails - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1556713432891,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/GetUserWantToReadDetails - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1556713432895,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713432898,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713432900,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/GetUserReadingDetails - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1556713432903,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713432907,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/me - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1556713433047,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713433049,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://geeksreads.herokuapp.com/api/users/GetUserReadingDetails - Failed to load resource: the server responded with a status of 401 (Unauthorized)",
                "timestamp": 1556713433051,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "http://geeksreads.herokuapp.com/main.0ded764c33cc2aaf3285.js 0:59649 \"ERROR\" e",
                "timestamp": 1556713433154,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00450061-00d5-00dd-00ac-001f00e50036.png",
        "timestamp": 1556713427688,
        "duration": 5481
    },
    {
        "description": "Should Redirect to Profile when he clicks profile button|Profile tests",
        "passed": false,
        "pending": false,
        "os": "Windows NT",
        "instanceId": 17200,
        "browser": {
            "name": "chrome",
            "version": "73.0.3683.103"
        },
        "message": [
            "Expected 'http://localhost:4200/sign-in' to be 'http://geeksreads.herokuapp.com/sign-in'."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\e2e\\src\\sign-in-routing\\siginingrouting.e2e-spec.ts:29:21\n    at ManagedPromise.invokeCallback_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Aya .. me\\SOFTWARE PROJECT FINAL\\Project 3rd Phase\\Geeksreads-Frontend\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at <anonymous>\n    at process._tickCallback (internal/process/next_tick.js:188:7)"
        ],
        "browserLogs": [
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR\" Error: MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.\n    at throwToolbarMixedModesError (http://localhost:4200/vendor.js:134738:11)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar._checkToolbarMixedModes (http://localhost:4200/vendor.js:134703:13)\n    at MatToolbar.push../node_modules/@angular/material/esm5/toolbar.es5.js.MatToolbar.ngAfterViewInit (http://localhost:4200/vendor.js:134674:14)\n    at callProviderLifecycles (http://localhost:4200/vendor.js:87435:18)\n    at callElementProvidersLifecycles (http://localhost:4200/vendor.js:87409:13)\n    at callLifecycleHooksChildrenFirst (http://localhost:4200/vendor.js:87399:29)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88335:5)\n    at callViewAction (http://localhost:4200/vendor.js:88567:21)\n    at execComponentViewsAction (http://localhost:4200/vendor.js:88509:13)\n    at checkAndUpdateView (http://localhost:4200/vendor.js:88332:5)",
                "timestamp": 1556713437455,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "ng:///AppModule/NavBarComponent.ngfactory.js 190:33 \"ERROR CONTEXT\" DebugContext_",
                "timestamp": 1556713437456,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "http://localhost:4200/sign-in - [DOM] Found 2 elements with non-unique id #nav-search-bar: (More info: https://goo.gl/9p2vKq) %o %o",
                "timestamp": 1556713437515,
                "type": ""
            }
        ],
        "screenShotFile": "Screenshots\\00a300ba-0097-0048-008a-00ff00f500dd.png",
        "timestamp": 1556713433536,
        "duration": 4253
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

