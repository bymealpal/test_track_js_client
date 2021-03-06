var TestTrackConfig = (function() { // jshint ignore:line
    var DEFAULT_VISITOR_COOKIE_NAME = 'tt_visitor_id',
        config,
        assignments,
        getConfig = function() {
            if (!config) {
                var parser = new ConfigParser();
                config = parser.getConfig();
            }
            return config;
        };

    return {
        _clear: function() {
            config = null;
        },

        getUrl: function() {
            return getConfig().url;
        },

        getCookieDomain: function() {
            return getConfig().cookieDomain;
        },

        getCookieName: function() {
            return getConfig().cookieName || DEFAULT_VISITOR_COOKIE_NAME;
        },

        getSplitRegistry: function() {
            return getConfig().registry;
        },

        getAssignments: function() {
            var rawAssignments = getConfig().assignments;

            if (!rawAssignments) {
                return null;
            }

            if (!assignments) {
                assignments = [];
                for (var splitName in rawAssignments) {
                    assignments.push(new Assignment({
                        splitName: splitName,
                        variant: rawAssignments[splitName],
                        isUnsynced: false
                    }));
                }
            }

            return assignments;
        }
    };
})();
