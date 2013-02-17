(function( $ ) {
	//a group of helper functions
		methods = {

			/**
			* options
			*
			* Default options for browsers Default will be called if there is no mention
			* of that browsers.
			*
			* @value Defalut function Provide a defalut function for non supported browsers.
			* @value Chrome function Have this function execute the default function.
			*/
			options : {
				
						Default : function (){}, // Other browsers
						Chrome : function () {methods.options.Default()} //!!important, have this execute Defalut (overwrite in implementation)
			},
			/**
			 * constructor
			 *
			 * This method should be called to make everything happen.
			 * Pass options to set navigator actions.
			 *
			 * @param options object Provide actions per browser (see methods.options for example)
			 */
			constructor : function (options){
				//if not undefined, merge with defalut options
				if(options != undefined)
			methods.options = $.extend(methods.options, options);
			// Fetch regluar expressions (see methods.build_regex())
			methods.build_regex();
			// What browser is being used? Store in name (see methods.whatBrowser())
			var name =  methods.whatBrowser();
			// execute method in options that user has provided.
			methods.options[name]();
			},
			/**
			 * whatBrowser
			 *
			 * This browser checks the userAgent and looks for any matching keys (see methods.options keys)
			 * and compares it to the string, then returns a string of the browser name (key)
			 *
			 * @return string The key that was matched in the userAgent info.
			 */
			whatBrowser : function () {
				//fetch user agent info
				var nav =  navigator.userAgent;
				// store a match in browser based on the build_regex() results
				var browser = nav.match(methods.options.regex_browsers);
				// if there is no match, then the browser is not supported
				if(browser == null || browser == "")
					return "Default"; //return string 'Default'
					//else return the matched browser
					return browser;
			},
			/**
			 * build_regex
			 * 
			 * This method builds a regex based on the keys provided in option. (will ignore)
			 * Default.
			 */
			build_regex : function () {
				//set reg_ex variable
				var reg_ex =""; //keep ""
				//loop through the keys in methods.options
				$.each(methods.options, function (key) {
					//if the key is not "Defalut"
					if(key != "Default")
					reg_ex += key + "|"; //Add to list along with '|'
				})
			
					//remove extra '|' from right
					reg_ex = reg_ex.replace(/\|+$/, "");
					reg_ex = new RegExp(reg_ex);//create a global search expression
					//store our regex in reg_browser
				methods.options.regex_browsers = reg_ex;
			}
		}

/**
 * browserSwitch
 *
 * Call this function to execute some code based on what browser lands on your page.
 */
  $.browserSwitch = function(options) {
    	methods.constructor(options);
  };
})( jQuery );