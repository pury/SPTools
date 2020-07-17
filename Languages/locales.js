/**
 * @File: locales.js
 * @Description: handle locale strings.
 *
 * @Author: Pury <szwzjx@gmail.com>
 * @Version: 0.0.1
 * @Date: 2016-10-24
 *
 * Copyright © 2015 - 2016 pury.org.   
 * All rights reserved.
 */

(function (window) {
	/**
	 * Locales
	 *
	 * @class
	 */
	function Locales ()
	{
	
	}

	Locales.GetLang = function () 
	{
		var lang = navigator.language || navigator.userLanguage;
		return lang;
	};

	Locales.IsEN = function ()
	{
		return !Locales.ZH;
	};

	Locales.IsZH = function ()
	{
		return Locales.ZH;	
	};

	Locales.SetConstString = function (v)
	{
		var value = v || Locales.GetLang();
		Locales.ZH = value.indexOf("zh") >= 0;
		window.ConstString = Locales.ZH ? ConstStringZH : ConstStringEN;	
	};

	Locales.SetConstString();
	window.Locales = Locales;

})(window);

