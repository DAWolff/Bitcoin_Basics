## Bitcoin Basics

Screen Shot:  https://www.flickr.com/photos/156091700@N03/36979630772/in/dateposted-public/

## Synopsis

An easy-peasy Bitcoin basics website.
Get the current Bitcoin exchange rate versus the highest-volume traded currencies.
Website starts with 1 Bitcoin versus the US Dollar.
Links to beginners' videos and to websites with additional information on Bitcoin.

## Notes

Responsive from 320px to 1600px.  (Note that I did not style for mobile landscape).
A landing page was not included, since:
* It isn't necessary
* It would make the site boring
* The entire site is one page

## Technology

HTML, CSS, JavaScript, jQuery

## Code Example

Gets the "secondary currency" from the user, and does a JSONP API call to
	https://www.coinhills.com/api/BTC/[secondary_currency]/?callback=extractResults

This is done by dynamically adding the <script> tag to the HTML for each call (and then remove tag).

## Motivation

To make it simple to get started with Bitcoin-- to understand how it works, and get the current price using the top world-wide currencies that are used to buy Bitcoin.  

## Installation

Project is at GitHub Pages:
		 https://dawolff.github.io/Bitcoin_Basics/

Code is at GitHub:
		 https://github.com/DAWolff/Bitcoin_Basics.git


## API Reference


## Tests


## Contributors

Created by Dennis Wolff
